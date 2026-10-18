export const MAP_WIDTH = 1300;
export const MAP_HEIGHT = 570;
export const INITIAL_VIEWPORT = Object.freeze({k:1,x:0,y:0});
export function constrainViewport({k,x,y}) {
  k=Math.max(1,Math.min(4,Number.isFinite(k)?k:1));
  return {k,x:Math.max(MAP_WIDTH*(1-k),Math.min(0,Number.isFinite(x)?x:0)),y:Math.max(MAP_HEIGHT*(1-k),Math.min(0,Number.isFinite(y)?y:0))};
}
export function zoomViewport(viewport,factor,anchor={x:MAP_WIDTH/2,y:MAP_HEIGHT/2}) {
  const k=Math.max(1,Math.min(4,viewport.k*factor));
  const ratio=k/viewport.k;
  return constrainViewport({k,x:anchor.x-(anchor.x-viewport.x)*ratio,y:anchor.y-(anchor.y-viewport.y)*ratio});
}
export function panViewport(viewport,dx,dy) {
  return constrainViewport({...viewport,x:viewport.x+dx,y:viewport.y+dy});
}
export function assetUsd(quantity,price) {
  return Number.isFinite(quantity)&&quantity>=0&&Number.isFinite(price)&&price>0?quantity*price:null;
}
