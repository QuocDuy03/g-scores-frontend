import { createBrowserRouter } from "react-router-dom";

import { Dashboard, Search, Report, Setting } from "@/pages";

import { DefaultLayout } from "@/layouts/DefaultLayout";

import { PATH } from "@/utils/constants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: PATH.dashboard,
        element: <Dashboard />,
      },
      {
        path: PATH.search,
        element: <Search />,
      },
      {
        path: PATH.reports,
        element: <Report />,
      },
      {
        path: PATH.settings,
        element: <Setting />,
      },
    ],
  },
]);
