import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export async function mountHeadStudy(canvas: HTMLCanvasElement, control: HTMLButtonElement) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const ink = canvas.getContext('2d');
  if(!ink) throw new Error('Character renderer unavailable');
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:false, powerPreference:'low-power'});
  const columns = 60;
  const rows = 72;
  const target = new THREE.WebGLRenderTarget(columns,rows);
  target.texture.colorSpace = THREE.SRGBColorSpace;
  const pixels = new Uint8Array(columns * rows * 4);
  renderer.setSize(columns,rows,false);
  renderer.setClearColor(0,0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32,1,.1,30);
  camera.position.set(0,.05,5.2);
  camera.lookAt(0,0,0);
  scene.add(new THREE.HemisphereLight(0xfff4e3,0x38332e,.35));
  const key = new THREE.DirectionalLight(0xffead4,1.8);
  key.position.set(-3,4,5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe4e8ec,.2);
  fill.position.set(4,0,2);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffefd8,.8);
  rim.position.set(2,2,-3);
  scene.add(rim);
  const gltf = await new GLTFLoader().loadAsync('/models/head-study.glb');
  let head: THREE.Mesh | undefined;
  gltf.scene.traverse(object => { if(object instanceof THREE.Mesh && !head) head = object; });
  if(!head) throw new Error('Head geometry unavailable');
  const geometry = head.geometry.clone();
  geometry.center();
  geometry.computeBoundingBox();
  const size = geometry.boundingBox!.getSize(new THREE.Vector3());
  geometry.scale(2.6 / size.y,2.6 / size.y,2.6 / size.y);
  const material = new THREE.MeshStandardMaterial({color:0xcccccc,roughness:1,metalness:0});
  const sculpture = new THREE.Mesh(geometry,material);
  sculpture.rotation.y = -.35;
  scene.add(sculpture);
  let paused = false;
  let visible = true;
  let lost = false;
  let frame = 0;
  let previous = 0;
  let elapsed = 0;
  let width = 240;
  let height = 286;
  let inkColor = getComputedStyle(canvas).color;
  let lightTheme = document.documentElement.dataset.theme === 'light';
  const draw = () => {
    renderer.setRenderTarget(target);
    renderer.render(scene,camera);
    renderer.readRenderTargetPixels(target,0,0,columns,rows,pixels);
    renderer.setRenderTarget(null);
    ink.clearRect(0,0,width,height);
    ink.fillStyle = inkColor;
    const cellWidth = width / columns;
    const cellHeight = height / rows;
    ink.font = `500 ${cellHeight * 1.3}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ink.textAlign = 'center';
    ink.textBaseline = 'middle';
    for(let row = 0; row < rows; row++) {
      for(let column = 0; column < columns; column++) {
        const offset = ((rows - 1 - row) * columns + column) * 4;
        if(pixels[offset+3] < 128) continue;
        const light = (pixels[offset]*.2126 + pixels[offset+1]*.7152 + pixels[offset+2]*.0722) / 255;
        const density = lightTheme ? .22 + .78 * (1-light) : light;
        const edge = column === 0 || column === columns-1 || row === 0 || row === rows-1
          || pixels[offset-4+3] < 128 || pixels[offset+4+3] < 128
          || pixels[offset-columns*4+3] < 128 || pixels[offset+columns*4+3] < 128;
        if(density < .2 && !edge && (column + row) % 2) continue;
        ink.globalAlpha = edge ? .72 : .08 + .92 * Math.pow(density,2);
        ink.fillText('0',(column+.5)*cellWidth,(row+.5)*cellHeight);
      }
    }
    ink.globalAlpha = 1;
  };
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = Math.max(1,bounds.width);
    height = Math.max(1,bounds.height);
    const ratio = Math.min(devicePixelRatio,2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ink.setTransform(ratio,0,0,ratio,0,0);
    camera.aspect = width / Math.max(1,height);
    camera.updateProjectionMatrix();
    draw();
  };
  const theme = () => {
    lightTheme = document.documentElement.dataset.theme === 'light';
    inkColor = getComputedStyle(canvas).color;
    draw();
  };
  const tick = (now:number) => {
    if(now - previous >= 1000/24) {
      if(previous) elapsed += Math.min((now-previous)/1000,.1);
      previous = now;
      sculpture.rotation.y = -.35 + Math.sin(elapsed * .22) * .9;
      draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    previous = 0;
    control.disabled = motion.matches;
    control.setAttribute('aria-pressed',String(paused));
    control.title = motion.matches ? 'Character head · reduced motion' : paused ? 'Resume head rotation' : 'Pause head rotation';
    if(!paused && visible && !document.hidden && !motion.matches && !lost) frame = requestAnimationFrame(tick);
  };
  control.addEventListener('click',() => {paused = !paused; sync();});
  motion.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(entries => {visible = entries.some(entry=>entry.isIntersecting);sync();}).observe(canvas);
  new ResizeObserver(resize).observe(canvas);
  new MutationObserver(theme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  renderer.domElement.addEventListener('webglcontextlost',event => {event.preventDefault();lost=true;sync();});
  renderer.domElement.addEventListener('webglcontextrestored',() => {lost=false;draw();sync();});
  resize();
  theme();
  canvas.classList.add('is-ready');
  control.disabled = false;
  sync();
}
