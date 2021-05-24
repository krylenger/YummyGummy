// Start from here
import dataStore from './data/dataStore';
import renderApp from './framework/render';
import App from './components/App';

window.dataStore = dataStore;

if (module.hot) {
  module.hot.accept();
}

renderApp(App, document.getElementById('app-root'));
