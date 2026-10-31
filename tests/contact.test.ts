import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { transform } from 'esbuild';

const { code } = await transform(await readFile('src/app.ts', 'utf8'), {loader:'ts'});
function harness(fetchResponse: () => Promise<unknown>) {
  let onSubmit: () => Promise<void> = async () => {};
  let resets = 0;
  const button = {disabled:false, innerHTML:'Send message', textContent:''};
  const status = {textContent:'', dataset:{} as Record<string,string>, removeAttribute() {delete this.dataset.error;}};
  const form = {
    querySelector: (selector: string) => selector === '[type="submit"]' ? button : status,
    reportValidity: () => true,
    addEventListener: (_: string, listener: (event: {preventDefault():void}) => Promise<void>) => {onSubmit = () => listener({preventDefault(){}});},
    setAttribute(){}, removeAttribute(){}, reset(){resets++;},
  };
  runInNewContext(code, {
    window:{matchMedia:() => ({matches:true,addEventListener(){}})},
    document:{querySelector:(selector: string) => selector === '[data-contact-form]' ? form : null,querySelectorAll:() => []},
    FormData:class {entries(){return Object.entries({name:'Visitor',email:'visitor@example.com',message:'A test message',_honey:''});}},
    AbortSignal, fetch:fetchResponse,
  });
  return {submit:() => onSubmit(),button,status,resets:() => resets};
}

test('contact confirms successful submissions and resets the form', async () => {
  const ui = harness(async () => ({ok:true,json:async () => ({success:'true'})}));
  await ui.submit();
  assert.match(ui.status.textContent,/Message submitted/);
  assert.equal(ui.resets(),1);
  assert.equal(ui.button.disabled,false);
});

test('contact preserves the message after a network or service failure', async () => {
  for(const response of [async () => {throw new Error('offline');},async () => ({ok:true,json:async () => ({success:false})})]) {
    const ui = harness(response);
    await ui.submit();
    assert.match(ui.status.textContent,/text is still here/);
    assert.equal(ui.resets(),0);
    assert.equal(ui.button.disabled,false);
  }
});

test('contact prevents duplicate submissions while waiting', async () => {
  let calls = 0;
  let resolveRequest!: (value: unknown) => void;
  const ui = harness(() => {calls++;return new Promise(resolve => {resolveRequest = resolve;});});
  const pending = ui.submit();
  assert.equal(ui.button.disabled,true);
  await ui.submit();
  assert.equal(calls,1);
  resolveRequest({ok:true,json:async () => ({success:true})});
  await pending;
  assert.equal(ui.button.disabled,false);
});
