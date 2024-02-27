import ReactDOM from 'react-dom/client'
import { Landing } from './App/Landing.tsx'
import './App/assets/styles/global.scss';
import { Provider } from "react-redux";
import { store } from "./App/store/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <Landing />
   </Provider>
)
