import "./App.css";
import { AppStateProvider } from "./state/AppStateContext";
import { Page } from "./Page/Page";
import { createPage } from "./utils/createPage";

function App() {


  const initialPage = createPage();
  return (
    <AppStateProvider initialState={initialPage}>

      <Page />
    </AppStateProvider>
   
  );
}

export default App;
