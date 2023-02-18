import { useRoutes } from "react-router-dom";
import Settings from "../pages/settings";
import ProcessMaintenance from "../pages/processMaintenance";
import NotFound from "../pages/page404";
import Layout from "../layout";

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
          path: "/processes/:id",
          // element: <Processes />,
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
