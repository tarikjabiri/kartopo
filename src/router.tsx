import { createBrowserRouter, RouteObject } from "react-router-dom";
import KPHome from "@pages/KPHome.tsx";

const routes: RouteObject[] = [];

const HOME_ROUTE: RouteObject = { path: "/", element: <KPHome /> };
routes.push(HOME_ROUTE);

const router = createBrowserRouter(routes);

export default router;
