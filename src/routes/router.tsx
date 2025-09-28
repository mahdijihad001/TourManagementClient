import App from "@/App";
import About from "@/pages/About";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "about",
                Component: About
            }
        ]
    }
]);


export default router