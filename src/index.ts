import traverse from 'traverse';
import isPromise from 'is-promise';

export async function deasyncObj(obj: any) {
  const asyncValueUpdates = traverse(obj).reduce(function (asyncValueUpdatesAccumulator: Promise<any>[], curVal: any) {
    
    if (isPromise(curVal)) {
      const updateVal = this.update;
      const asyncUpdateVal = async () => updateVal(await curVal);

      asyncValueUpdatesAccumulator.push(asyncUpdateVal());

    }

    return asyncValueUpdatesAccumulator;
  }, []);

  await Promise.all(asyncValueUpdates);
}