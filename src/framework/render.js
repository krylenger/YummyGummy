let Component, Target;

export default function renderApp(functionalComponent, targetElementId) {
  if (functionalComponent) Component = functionalComponent;
  if (targetElementId) Target = targetElementId;
  document.getElementById(Target).innerHTML = Component();
}
