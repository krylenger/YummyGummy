// Start from here
import dataStore from './data/dataStore';
import { render } from './framework';
import App from './components/App';

window.dataStore = dataStore;

if (module.hot) {
  module.hot.accept();
}

render(App, document.getElementById('app-root'));
