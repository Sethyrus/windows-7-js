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

export const getEventFunctionalities = (e: any): FunctionalityObject[] => {
  const functionalities = getFunctionality(e);
  const cleanFunctionalities: FunctionalityObject[] = [];

  if (functionalities.length > 0) {
    // Funcionalidad de cerrar ventana
    const closableAppWindowFunctionalityIndex = functionalities.findIndex(
      (functionalityObject) =>
        functionalityObject.functionalities.includes("APP_WINDOW_CLOSABLE")
    );

    if (closableAppWindowFunctionalityIndex !== -1) {
      cleanFunctionalities.push(functionalities[closableAppWindowFunctionalityIndex]);

      return cleanFunctionalities;
    }

    // Funcionalidad de maximizar ventana
    const maximizableAppWindowFunctionalityIndex = functionalities.findIndex(
      (functionalityObject) =>
        functionalityObject.functionalities.includes("APP_WINDOW_MAXIMIZABLE")
    );

    if (maximizableAppWindowFunctionalityIndex !== -1) {
      cleanFunctionalities.push(functionalities[maximizableAppWindowFunctionalityIndex]);

      return cleanFunctionalities;
    }

    // Funcionalidad de arrastrar ventana
    const draggableAppWindowFunctionalityIndex = functionalities.findIndex(
      (functionalityObject) =>
        functionalityObject.functionalities.includes("APP_WINDOW_DRAGGABLE")
    );

    if (draggableAppWindowFunctionalityIndex !== -1)
      cleanFunctionalities.push(functionalities[draggableAppWindowFunctionalityIndex]);

    // Funcionalidad de poner ventana al frente
    const frontableAppWindowFunctionalityIndex = functionalities.findIndex(
      (functionalityObject) =>
        functionalityObject.functionalities.includes("APP_WINDOW_FRONTABLE")
    );

    if (frontableAppWindowFunctionalityIndex !== -1)
      cleanFunctionalities.push(functionalities[frontableAppWindowFunctionalityIndex]);

    // Funcionalidad de seleccionar en el escritorio
    const desktopSelectionFunctionalityIndex = functionalities.findIndex(
      (functionalityObject) =>
        functionalityObject.functionalities.includes("DESKTOP_SELECTABLE")
    );

    if (desktopSelectionFunctionalityIndex !== -1 && cleanFunctionalities.length === 0)
      cleanFunctionalities.push(functionalities[desktopSelectionFunctionalityIndex]);
  }

  return cleanFunctionalities;
}