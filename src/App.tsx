import "./App.css";
import { AppStateProvider } from "./state/AppStateContext";
import { Page } from "./Page/Page";
import { createPage } from "./utils/createPage";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./Auth/Auth";
import { Private } from "./Auth/Private";

function App() {
  const initialPage = createPage();
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider initialState={initialPage}>
                <Page />
              </AppStateProvider>
            }
          ></Private>
        }
      />

      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider initialState={initialPage}>
                <Page />
              </AppStateProvider>
            }
          ></Private>
        }
      />
    </Routes>
  );
}

export default App;
