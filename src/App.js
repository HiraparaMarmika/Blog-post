import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Rootlayout from "./pages/Rootlayout";
import HomePage from "./pages/HomePage";
import Privateroutes from "./routes/Privateroutes";

import LoginPage from "./pages/LoginPage";
import PageDetails from "./pages/PageDetails";

import Post from "./components/post/Post";

import ApiPostPage, { loader } from "./pages/ApiPostPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <Privateroutes>
        <Rootlayout />
      </Privateroutes>
    ),

    children: [
      { path: "/", element: <Post /> },
      { path: "/blog", element: <HomePage /> },
      { path: "/details/:Id", element: <PageDetails /> },
      { path: "/postapi", element: <ApiPostPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
