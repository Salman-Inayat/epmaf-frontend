import { useRoutes } from "react-router-dom";
import Settings from "../pages/settings";
import ProcessMaintenance from "../pages/processMaintenance";
import NotFound from "../pages/page404";
import Layout from "../layout";
import SingleProcess from "../pages/singleProcess";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProcessMaintenance />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/process/:processTitle",
          element: <SingleProcess />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return routes;
}
