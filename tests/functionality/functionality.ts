import { input, inputs, action, actions } from "./utils.js";
import { nino, niso, nimo, sino, siso, simo, mino, miso, mimo } from "../../src/main.js";
import { SAInput, MAInput, Actions } from "../../src/types.js";


const run = async (module: Actions, sai: SAInput, mai: MAInput) => {
	let start = performance.now();
	const sao = await module.sa(sai);
	const sat = performance.now() - start;
	start = performance.now();
	const mao = await module.ma(mai);
	const mat = performance.now() - start;
	console.log({ sao, sat, mao, mat });
};

const test = {
	nino: async () => run(nino, { action, actionCount: 10 }, { actions }),
	niso: async () => run(niso, { action, actionCount: 10 }, { actions }),
	nimo: async () => run(nimo, { action, actionCount: 10 }, { actions }),
	sino: async () => run(sino, { input, action, actionCount: 10 }, {input, actions }),
	siso: async () => run(siso, { input, action, actionCount: 10 }, {input, actions }),
	simo: async () => run(simo, { input, action, actionCount: 10 }, {input, actions }),
	mino: async () => run(mino, { inputs, action, actionCount: 10 }, {inputs, actions }),
	miso: async () => run(miso, { inputs, action, actionCount: 10 }, {inputs, actions }),
	mimo: async () => run(mimo, { inputs, action, actionCount: 10 }, {inputs, actions })
};


export { test, run };