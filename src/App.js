import { Provider } from 'react-redux';
import store from './store';
import Contacto from './Components/Contacto';


function App() {
  return (
    <Provider store={store}>
        <Contacto/>
    </Provider>

  );
}

export default App;
