import { useEffect, useRef, useState } from "react";
import "./product-scene.css";

type SceneController = {
  rotate: (direction: number) => void;
  reset: () => void;
};

/** An illustrative product display. All geometry and textures are created locally. */
export default function ProductScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SceneController | null>(null);
  const [renderer, setRenderer] = useState<"fallback" | "webgl">("fallback");
  const [motionMode, setMotionMode] = useState<"reduced" | "enabled">(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "reduced"
      : "enabled",
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateMotionMode = () =>
      setMotionMode(motionPreference.matches ? "reduced" : "enabled");
    motionPreference.addEventListener("change", updateMotionMode);

    async function initialize() {
      // Probe before constructing Three's renderer: unsupported devices get the artwork.
      const canvas = document.createElement("canvas");
      let context: WebGL2RenderingContext | null = null;
      try {
        context = canvas.getContext("webgl2", {
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: true,
        });
      } catch {
        return;
      }
      if (!context) return;

      try {
        const [THREE, { RoomEnvironment }] = await Promise.all([
          import("three"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
        ]);
        if (disposed || !stage) {
          context.getExtension("WEBGL_lose_context")?.loseContext();
          return;
        }

        const webgl = new THREE.WebGLRenderer({
          canvas,
          context,
          alpha: true,
          antialias: true,
        });
        webgl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        webgl.setClearColor(0x000000, 0);
        webgl.outputColorSpace = THREE.SRGBColorSpace;
        webgl.toneMapping = THREE.ACESFilmicToneMapping;
        webgl.toneMappingExposure = 1.05;
        canvas.setAttribute("aria-hidden", "true");
        canvas.className = "product-scene__canvas";

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 50);
        camera.position.set(0, 0.15, 10.8);
        camera.lookAt(0, 0.05, 0);
        const studio = new RoomEnvironment();
        const pmrem = new THREE.PMREMGenerator(webgl);
        const environment = pmrem.fromScene(studio, 0.04);
        scene.environment = environment.texture;
        scene.environmentIntensity = 1.1;
        studio.dispose();
        pmrem.dispose();

        const key = new THREE.DirectionalLight(0xffffff, 3.2);
        key.position.set(-3, 5, 5);
        scene.add(key);
        const edge = new THREE.DirectionalLight(0xd6caff, 2.4);
        edge.position.set(4, 2, -3);
        scene.add(edge);
        const fill = new THREE.DirectionalLight(0xc6fff4, 1.2);
        fill.position.set(-3, -1, 2);
        scene.add(fill);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x29235f, 1.4));

        const display = new THREE.Group();
        scene.add(display);
        const silver = new THREE.MeshPhysicalMaterial({
          color: 0xcac5d5,
          metalness: 0.94,
          roughness: 0.27,
          clearcoat: 0.8,
        });
        const brightMetal = new THREE.MeshPhysicalMaterial({
          color: 0xdddbe5,
          metalness: 0.98,
          roughness: 0.23,
        });
        const lilac = new THREE.MeshPhysicalMaterial({
          color: 0xb4a5df,
          metalness: 0.72,
          roughness: 0.25,
          clearcoat: 1,
        });
        const black = new THREE.MeshPhysicalMaterial({
          color: 0x14121c,
          roughness: 0.25,
          metalness: 0.35,
        });
        const cushion = new THREE.MeshStandardMaterial({
          color: 0xd4d2d8,
          roughness: 0.92,
        });
        const darkCushion = new THREE.MeshStandardMaterial({
          color: 0x8f8a9c,
          roughness: 0.97,
        });
        const glass = new THREE.MeshPhysicalMaterial({
          color: 0x16111f,
          metalness: 0.05,
          roughness: 0.12,
          clearcoat: 1,
        });
        const weaveCanvas = document.createElement("canvas");
        weaveCanvas.width = weaveCanvas.height = 64;
        const weaveContext = weaveCanvas.getContext("2d")!;
        weaveContext.fillStyle = "#999";
        weaveContext.fillRect(0, 0, 64, 64);
        for (let y = 0; y < 64; y += 2) {
          for (let x = 0; x < 64; x += 2) {
            weaveContext.fillStyle = (x + y) % 4 === 0 ? "#bbb" : "#777";
            weaveContext.fillRect(x, y, 1, 2);
          }
        }
        const weaveTexture = new THREE.CanvasTexture(weaveCanvas);
        weaveTexture.wrapS = weaveTexture.wrapT = THREE.RepeatWrapping;
        weaveTexture.repeat.set(10, 10);
        cushion.bumpMap = weaveTexture;
        cushion.bumpScale = 0.012;
        const earCushion = cushion.clone();
        earCushion.color.setHex(0xaca7b5);
        const shellMaterial = silver.clone();
        shellMaterial.roughness = 0.38;
        shellMaterial.clearcoat = 0.35;

        function roundedBox(
          w: number,
          h: number,
          d: number,
          radius: number,
          material: import("three").Material,
        ) {
          // Extrude a true rounded silhouette: a thin box primitive clamps its
          // corner radius to its depth, producing the wrong phone/headphone shape.
          const bevel = Math.min(d * 0.18, radius * 0.32);
          const x = -w / 2 + bevel;
          const y = -h / 2 + bevel;
          const width = w - bevel * 2;
          const height = h - bevel * 2;
          const r = Math.max(
            0.001,
            Math.min(radius - bevel, width / 2, height / 2),
          );
          const shape = new THREE.Shape();
          shape.moveTo(x + r, y);
          shape.lineTo(x + width - r, y);
          shape.quadraticCurveTo(x + width, y, x + width, y + r);
          shape.lineTo(x + width, y + height - r);
          shape.quadraticCurveTo(
            x + width,
            y + height,
            x + width - r,
            y + height,
          );
          shape.lineTo(x + r, y + height);
          shape.quadraticCurveTo(x, y + height, x, y + height - r);
          shape.lineTo(x, y + r);
          shape.quadraticCurveTo(x, y, x + r, y);
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: Math.max(0.001, d - 2 * bevel),
            bevelEnabled: true,
            bevelSize: bevel,
            bevelThickness: bevel,
            bevelSegments: 4,
            curveSegments: 16,
            steps: 1,
          });
          geometry.translate(0, 0, -d / 2 + bevel);
          return new THREE.Mesh(geometry, material);
        }

        const phone = new THREE.Group();
        phone.position.set(0.77, 0.11, 0.3);
        phone.rotation.set(0.015, -0.31, -0.085);
        const chassis = roundedBox(2.17, 4.28, 0.22, 0.21, silver);
        phone.add(chassis);
        const rear = roundedBox(2.09, 4.19, 0.1, 0.2, lilac);
        rear.position.z = -0.095;
        phone.add(rear);
        const bezel = roundedBox(2.11, 4.21, 0.034, 0.19, black);
        bezel.position.z = 0.12;
        phone.add(bezel);

        const textureCanvas = document.createElement("canvas");
        textureCanvas.width = 768;
        textureCanvas.height = 1536;
        const textureContext = textureCanvas.getContext("2d")!;
        const screenTexture = new THREE.CanvasTexture(textureCanvas);
        screenTexture.colorSpace = THREE.SRGBColorSpace;
        screenTexture.anisotropy = Math.min(
          8,
          webgl.capabilities.getMaxAnisotropy(),
        );
        const screenMaterial = new THREE.MeshBasicMaterial({
          map: screenTexture,
          toneMapped: false,
        });

        function screenShape(w: number, h: number, radius: number) {
          const x = -w / 2,
            y = -h / 2;
          const shape = new THREE.Shape();
          shape.moveTo(x + radius, y);
          shape.lineTo(x + w - radius, y);
          shape.quadraticCurveTo(x + w, y, x + w, y + radius);
          shape.lineTo(x + w, y + h - radius);
          shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
          shape.lineTo(x + radius, y + h);
          shape.quadraticCurveTo(x, y + h, x, y + h - radius);
          shape.lineTo(x, y + radius);
          shape.quadraticCurveTo(x, y, x + radius, y);
          const geometry = new THREE.ShapeGeometry(shape, 20);
          const positions = geometry.attributes.position;
          const uv = geometry.attributes.uv;
          for (let i = 0; i < positions.count; i++) {
            uv.setXY(
              i,
              (positions.getX(i) + w / 2) / w,
              (positions.getY(i) + h / 2) / h,
            );
          }
          return geometry;
        }
        const screen = new THREE.Mesh(
          screenShape(1.99, 4.075, 0.17),
          screenMaterial,
        );
        screen.position.z = 0.141;
        phone.add(screen);
        const cameraPill = roundedBox(0.54, 0.15, 0.016, 0.07, black);
        cameraPill.position.set(0, 1.87, 0.152);
        phone.add(cameraPill);
        const lens = new THREE.Mesh(
          new THREE.CircleGeometry(0.038, 24),
          new THREE.MeshPhysicalMaterial({
            color: 0x292e47,
            roughness: 0.09,
            metalness: 0.6,
          }),
        );
        lens.position.set(0.15, 1.87, 0.164);
        phone.add(lens);
        for (const y of [0.65, 0.14]) {
          const button = roundedBox(0.035, 0.35, 0.11, 0.016, brightMetal);
          button.position.set(-1.092, y, 0.01);
          phone.add(button);
        }
        const power = roundedBox(0.035, 0.53, 0.11, 0.016, brightMetal);
        power.position.set(1.092, 0.46, 0.01);
        phone.add(power);
        const homeBar = roundedBox(0.67, 0.025, 0.005, 0.012, black);
        homeBar.position.set(0, -1.95, 0.151);
        phone.add(homeBar);
        display.add(phone);

        const headphones = new THREE.Group();
        headphones.position.set(-1.28, -0.54, 0.65);
        headphones.rotation.set(0.015, -0.33, 0.145);
        headphones.scale.setScalar(1.08);
        function bandCurve(radius: number, height: number) {
          const points = [];
          for (let i = 0; i <= 64; i++) {
            const angle = Math.PI * (0.045 + (i / 64) * 0.91);
            points.push(
              new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * height + 0.07,
                0,
              ),
            );
          }
          return new THREE.CatmullRomCurve3(points);
        }
        const metalBand = new THREE.Mesh(
          new THREE.TubeGeometry(bandCurve(1.035, 1.42), 64, 0.078, 12, false),
          brightMetal,
        );
        metalBand.scale.z = 1.7;
        headphones.add(metalBand);
        const paddedBand = new THREE.Mesh(
          new THREE.TubeGeometry(bandCurve(0.957, 1.33), 64, 0.085, 16, false),
          cushion,
        );
        paddedBand.scale.z = 2;
        headphones.add(paddedBand);

        // A softly inflated superellipse gives the aluminium shells their
        // curved industrial-design surface instead of a flat polygon face.
        function earShell() {
          const positions: number[] = [];
          const indices: number[] = [];
          const rings = 18;
          const segments = 64;
          for (let ring = 0; ring <= rings; ring++) {
            const phi = ((ring / rings) * Math.PI) / 2;
            const radial = Math.sin(phi);
            for (let point = 0; point <= segments; point++) {
              const angle = (point / segments) * Math.PI * 2;
              const x = Math.cos(angle);
              const y = Math.sin(angle);
              positions.push(
                0.36 * Math.sign(x) * Math.pow(Math.abs(x), 0.64) * radial,
                0.611 * Math.sign(y) * Math.pow(Math.abs(y), 0.64) * radial,
                Math.cos(phi) * 0.14,
              );
              if (ring < rings && point < segments) {
                const a = ring * (segments + 1) + point;
                const b = a + segments + 1;
                indices.push(a, b, a + 1, a + 1, b, b + 1);
              }
            }
          }
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions, 3),
          );
          geometry.setIndex(indices);
          geometry.computeVertexNormals();
          const normals = geometry.getAttribute("normal");
          for (let point = 0; point <= segments; point++)
            normals.setXYZ(point, 0, 0, 1);
          return new THREE.Mesh(geometry, shellMaterial);
        }
        for (const side of [-1, 1]) {
          const slider = roundedBox(0.13, 0.44, 0.13, 0.06, silver);
          slider.position.set(side * 1.012, 0.15, 0);
          slider.rotation.z = side * 0.12;
          headphones.add(slider);
          const cup = new THREE.Group();
          cup.position.set(side * 0.965, -0.55, 0.025);
          cup.rotation.set(0, side * 0.38, side * -0.095);
          const rearPad = roundedBox(0.7, 1.2, 0.31, 0.28, earCushion);
          rearPad.position.z = -0.15;
          cup.add(rearPad);
          const padOpening = roundedBox(0.43, 0.81, 0.016, 0.2, darkCushion);
          padOpening.position.z = -0.314;
          cup.add(padOpening);
          const housing = roundedBox(0.75, 1.26, 0.29, 0.32, silver);
          housing.position.z = 0.09;
          cup.add(housing);
          const outerShell = earShell();
          outerShell.position.z = 0.214;
          cup.add(outerShell);
          headphones.add(cup);
        }
        const crown = new THREE.Mesh(
          new THREE.CylinderGeometry(0.068, 0.068, 0.08, 24),
          silver,
        );
        crown.position.set(1.08, 0.1, 0.18);
        headphones.add(crown);
        const mic = new THREE.Mesh(new THREE.CircleGeometry(0.016, 12), glass);
        mic.position.set(1.06, -1.08, 0.3);
        headphones.add(mic);
        display.add(headphones);

        // Baked ambient grounding shadow, without an expensive realtime shadow pass.
        const shadowCanvas = document.createElement("canvas");
        shadowCanvas.width = shadowCanvas.height = 128;
        const shadowContext = shadowCanvas.getContext("2d")!;
        const gradient = shadowContext.createRadialGradient(
          64,
          64,
          2,
          64,
          64,
          64,
        );
        gradient.addColorStop(0, "rgba(41,35,95,0.27)");
        gradient.addColorStop(0.5, "rgba(41,35,95,0.11)");
        gradient.addColorStop(1, "rgba(41,35,95,0)");
        shadowContext.fillStyle = gradient;
        shadowContext.fillRect(0, 0, 128, 128);
        const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
        const shadow = new THREE.Mesh(
          new THREE.PlaneGeometry(6.1, 1.35),
          new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            depthWrite: false,
            toneMapped: false,
          }),
        );
        shadow.position.set(-0.1, -2.12, -0.35);
        scene.add(shadow);

        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        let visible = true;
        let targetX = 0.045;
        let targetY = -0.035;
        let currentX = targetX;
        let currentY = targetY;
        const baseline = { x: 0.045, y: -0.035 };
        let revealStarted = performance.now();
        let revealComplete = motion.matches;
        let dragging = false;
        let pressed = false;
        let lastX = 0;
        let lastY = 0;
        let downX = 0;
        let downY = 0;
        let pointerId = 0;
        let width = 1;
        let height = 1;

        function render(time = performance.now()) {
          frame = 0;
          if (disposed || !visible || document.hidden) return;
          const deltaX = targetX - currentX;
          const deltaY = targetY - currentY;
          currentX += motion.matches ? deltaX : deltaX * 0.13;
          currentY += motion.matches ? deltaY : deltaY * 0.13;
          let reveal = 1;
          if (!revealComplete) {
            const progress = Math.min((time - revealStarted) / 1350, 1);
            reveal = 1 - Math.pow(1 - progress, 4);
            if (progress >= 1) revealComplete = true;
          }
          display.rotation.set(
            currentX,
            currentY - (1 - reveal) * 0.31,
            -0.018,
          );
          display.position.y = (1 - reveal) * -0.2;
          display.scale.setScalar(0.975 + reveal * 0.025);
          stage?.setAttribute("data-rotation", currentY.toFixed(3));
          webgl.render(scene, camera);
          if (!revealComplete || Math.abs(deltaX) + Math.abs(deltaY) > 0.0004)
            requestRender();
        }
        function requestRender() {
          if (!frame && !disposed && visible && !document.hidden)
            frame = requestAnimationFrame(render);
        }

        function drawScreen(productImage?: HTMLImageElement) {
          if (disposed) return;
          const ctx = textureContext;
          ctx.fillStyle = "#FCFBF8";
          ctx.fillRect(0, 0, 768, 1536);
          ctx.fillStyle = "#29235F";
          ctx.font = '800 83px "Manrope", sans-serif';
          ctx.textAlign = "left";
          ctx.fillText("selliro", 60, 204);
          ctx.fillStyle = "#29235F";
          ctx.font = '700 89px "Manrope", sans-serif';
          ctx.fillText("Your next", 58, 365);
          ctx.fillText("great find.", 58, 472);
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(40, 542, 688, 688, 38);
          ctx.clip();
          ctx.fillStyle = "#EEEAE4";
          ctx.fillRect(40, 542, 688, 688);
          if (productImage) {
            ctx.drawImage(
              productImage,
              0,
              0,
              productImage.naturalWidth / 3,
              productImage.naturalHeight / 2,
              40,
              542,
              688,
              688,
            );
          }
          ctx.restore();
          ctx.fillStyle = "#6045F4";
          ctx.beginPath();
          ctx.roundRect(48, 1280, 672, 128, 64);
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
          ctx.font = '700 47px "DM Sans", sans-serif';
          ctx.textAlign = "center";
          ctx.fillText("Explore Selliro", 384, 1360);
          screenTexture.needsUpdate = true;
          requestRender();
        }
        drawScreen();
        const productImage = new Image();
        productImage.onload = () => drawScreen(productImage);
        productImage.src = "/images/product-editorial.webp";
        document.fonts.ready.then(() => {
          if (!disposed)
            drawScreen(
              productImage.complete && productImage.naturalWidth
                ? productImage
                : undefined,
            );
        });

        function resize() {
          if (!stage || disposed) return;
          width = Math.max(1, stage.clientWidth);
          height = Math.max(1, stage.clientHeight);
          camera.aspect = width / height;
          // Preserve the product size at every breakpoint, especially narrow phones.
          camera.position.z = Math.max(8.8, 8.9 / camera.aspect);
          camera.updateProjectionMatrix();
          webgl.setSize(width, height, false);
          requestRender();
        }
        function pointerDown(event: PointerEvent) {
          if (
            !event.isPrimary ||
            (event.pointerType === "mouse" && event.button !== 0)
          )
            return;
          pressed = true;
          dragging = event.pointerType === "mouse";
          pointerId = event.pointerId;
          downX = lastX = event.clientX;
          downY = lastY = event.clientY;
          if (dragging) stage?.setPointerCapture(event.pointerId);
        }
        function pointerMove(event: PointerEvent) {
          if (!pressed || event.pointerId !== pointerId) return;
          const horizontal = event.clientX - downX;
          const vertical = event.clientY - downY;
          if (!dragging) {
            if (
              Math.abs(vertical) > Math.abs(horizontal) &&
              Math.abs(vertical) > 8
            ) {
              pressed = false;
              return;
            }
            if (Math.abs(horizontal) < 8) return;
            dragging = true;
            stage?.setPointerCapture(event.pointerId);
          }
          targetY = Math.max(
            -0.65,
            Math.min(0.65, targetY + ((event.clientX - lastX) / width) * 2.4),
          );
          targetX = Math.max(
            -0.18,
            Math.min(0.23, targetX + ((event.clientY - lastY) / height) * 0.55),
          );
          lastX = event.clientX;
          lastY = event.clientY;
          stage?.classList.add("is-dragging");
          revealComplete = true;
          requestRender();
        }
        function pointerUp() {
          if (stage?.hasPointerCapture(pointerId))
            stage.releasePointerCapture(pointerId);
          pressed = dragging = false;
          stage?.classList.remove("is-dragging");
        }
        function preferenceChange() {
          if (motion.matches) {
            revealComplete = true;
            currentX = targetX;
            currentY = targetY;
          }
          requestRender();
        }
        function visibilityChange() {
          if (document.hidden && frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          } else requestRender();
        }
        function contextLost(event: Event) {
          event.preventDefault();
          if (frame) cancelAnimationFrame(frame);
          frame = 0;
          visible = false;
          controllerRef.current = null;
          if (!disposed) setRenderer("fallback");
        }
        controllerRef.current = {
          rotate(direction) {
            revealComplete = true;
            targetY = Math.max(
              -0.65,
              Math.min(0.65, targetY + direction * 0.24),
            );
            requestRender();
          },
          reset() {
            targetX = baseline.x;
            targetY = baseline.y;
            revealComplete = true;
            requestRender();
          },
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(stage);
        const visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible) {
              if (!revealComplete) revealStarted = performance.now();
              requestRender();
            } else if (frame) {
              cancelAnimationFrame(frame);
              frame = 0;
            }
          },
          { rootMargin: "100px" },
        );
        visibilityObserver.observe(stage);
        stage.addEventListener("pointerdown", pointerDown);
        stage.addEventListener("pointermove", pointerMove);
        stage.addEventListener("pointerup", pointerUp);
        stage.addEventListener("pointercancel", pointerUp);
        stage.addEventListener("lostpointercapture", pointerUp);
        canvas.addEventListener("webglcontextlost", contextLost);
        motion.addEventListener("change", preferenceChange);
        document.addEventListener("visibilitychange", visibilityChange);
        stage.appendChild(canvas);
        resize();
        render();
        setRenderer("webgl");

        cleanup = () => {
          if (frame) cancelAnimationFrame(frame);
          controllerRef.current = null;
          resizeObserver.disconnect();
          visibilityObserver.disconnect();
          motion.removeEventListener("change", preferenceChange);
          document.removeEventListener("visibilitychange", visibilityChange);
          stage.removeEventListener("pointerdown", pointerDown);
          stage.removeEventListener("pointermove", pointerMove);
          stage.removeEventListener("pointerup", pointerUp);
          stage.removeEventListener("pointercancel", pointerUp);
          stage.removeEventListener("lostpointercapture", pointerUp);
          canvas.removeEventListener("webglcontextlost", contextLost);
          productImage.onload = null;
          const materials = new Set<import("three").Material>();
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              const values = Array.isArray(object.material)
                ? object.material
                : [object.material];
              values.forEach((material) => materials.add(material));
            }
          });
          materials.forEach((material) => material.dispose());
          screenTexture.dispose();
          shadowTexture.dispose();
          weaveTexture.dispose();
          environment.dispose();
          webgl.dispose();
          webgl.forceContextLoss();
          canvas.remove();
        };
      } catch {
        // The complete art-directed fallback remains visible if a device cannot render 3D.
        cleanup?.();
        context?.getExtension("WEBGL_lose_context")?.loseContext();
        if (!disposed) setRenderer("fallback");
      }
    }

    void initialize();
    return () => {
      disposed = true;
      motionPreference.removeEventListener("change", updateMotionMode);
      cleanup?.();
    };
  }, []);

  return (
    <div
      className="product-scene"
      data-renderer={renderer}
      data-motion={motionMode}
    >
      <div
        className="product-scene__stage"
        ref={stageRef}
        role="img"
        aria-label="Interactive 3D illustration of a Selliro phone and silver over-ear headphones"
      >
        <div className="product-scene__fallback" aria-hidden="true">
          <div className="product-scene__fallback-phone" />
          <div className="product-scene__fallback-headphones" />
        </div>
      </div>
      {renderer === "webgl" && (
        <div
          className="product-scene__controls"
          aria-label="Product view controls"
        >
          <span>Drag to explore</span>
          <div className="product-scene__buttons">
            <button
              type="button"
              aria-label="Rotate products left"
              onClick={() => controllerRef.current?.rotate(-1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Rotate products right"
              onClick={() => controllerRef.current?.rotate(1)}
            >
              →
            </button>
            <button
              type="button"
              className="product-scene__reset"
              onClick={() => controllerRef.current?.reset()}
            >
              Reset view
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
