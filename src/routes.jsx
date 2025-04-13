import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import Details from "./pages/Details";


export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
          <Route index element={<Home />} />
          <Route path="/details/:type/:uid" element={<Details />} />
      </Route>
  )
);