import { Action, Input, Onerror, Output, SAMAOutput } from "./types.js";


type PerformAcionInput = {
  getAction: Function;
  actionCount: number;
  getInput: Function;
  setOutput: Function;
  getOutput: Function;
	onerror: Onerror;
};

type PerformActions = (options: PerformAcionInput) => SAMAOutput;
type Promisify = (action: Action, input: Input, actionIndex: number) => SAMAOutput;

const performActions: PerformActions = (options) => {
  const {
    getAction,
    actionCount,
    getInput,
    setOutput,
    getOutput,
    onerror = "throw"
  } = options;

	return new Promise((resolve: Function, reject: Function) => {
		let resolveCount: number = actionCount;
		
		for (let actionIndex = actionCount; actionIndex--; ) {
			promisify(getAction(actionIndex), getInput(actionIndex), actionIndex)
			.then((output: any) => {
				setOutput(output, actionIndex,);
				--resolveCount || resolve(getOutput());
			})
      .catch((reason) => {
        if (onerror === "throw") reject(new Error(`Action at ${actionIndex} was not performed successfully.`));
        else if (onerror === "return") resolve();
        else if (onerror === "break") resolve(getOutput());
        else return;
      });
		};
	});
};

const promisify: Promisify = async (action, input, actionIndex) => action(input, actionIndex);


export default performActions;