import test from 'node:test';
import assert from 'node:assert/strict';
import {INITIAL_VIEWPORT,constrainViewport,zoomViewport,panViewport,assetUsd} from '../site/src/map-viewport.js';
test('zoom keeps the geographic point under its anchor fixed',()=>{
  const anchor={x:900,y:300};
  const before={k:2,x:-200,y:-100};
  const after=zoomViewport(before,1.5,anchor);
  assert.equal((anchor.x-before.x)/before.k,(anchor.x-after.x)/after.k);
  assert.equal((anchor.y-before.y)/before.k,(anchor.y-after.y)/after.k);
});
test('zoom caps at four and reset scale removes translation',()=>{
  assert.equal(zoomViewport(INITIAL_VIEWPORT,10).k,4);
  assert.deepEqual(zoomViewport({k:4,x:-1200,y:-600},.01),INITIAL_VIEWPORT);
  assert.deepEqual(constrainViewport({k:NaN,x:Infinity,y:NaN}),INITIAL_VIEWPORT);
});
test('pan remains bounded and is inert at the initial zoom',()=>{
  assert.deepEqual(panViewport(INITIAL_VIEWPORT,200,-200),INITIAL_VIEWPORT);
  assert.deepEqual(panViewport({k:2,x:-50,y:-50},500,-900),{k:2,x:0,y:-570});
});
test('individual asset USD preserves unknown and known zero',()=>{
  assert.equal(assetUsd(null,80000),null);
  assert.equal(assetUsd(0,80000),0);
  assert.equal(assetUsd(2,80000),160000);
  assert.equal(assetUsd(3,null),null);
  assert.equal(assetUsd(3,0),null);
});
