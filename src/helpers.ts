export const getFunctionality = (e: any): FunctionalityObject[] =>
{
  let currEvent = e.target;
  let functionalityObject: FunctionalityObject[] = [];

  const findCurrEventFunctionality = () =>
  {
    try
    {
      functionalityObject.push(JSON.parse(currEvent.dataset.functionality));
    }
    catch
    {

    }

    if (currEvent.parentNode)
    {
      currEvent = currEvent.parentNode;

      findCurrEventFunctionality();
    }
  }

  findCurrEventFunctionality();

  return functionalityObject;
}

export const setFunctionality = (id: string, component: AppComponent, functionalities: Functionality[]): string =>
{
  return JSON.stringify({ id, functionalities });
}