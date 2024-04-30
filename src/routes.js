import Index from "views/Index.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import FAQ from "views/examples/FAQ.js";
import Discussion from "views/examples/discussions.js";
import route_lan from "./language/routes_lan.js";

let language = "eng";

if (
  localStorage.getItem("lan") !== undefined &&
  localStorage.getItem("lan") !== null
) {
  language = localStorage.getItem("lan");
}

let routes = [];
let commonRoutes = [
  {
    path: "/index",
    name: route_lan.dashboard[language],
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: route_lan.safe_location[language],
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/discussion",
    name: route_lan.discussions[language],
    icon: "fa-regular fa-comments text-red",
    component: <Discussion />,
    layout: "/admin",
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  {
    path: "/tables",
    name: route_lan.history[language],
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/faq",
    name: route_lan.faq[language],
    icon: "fa-regular fa-circle-question",
    component: <FAQ />,
    layout: "/admin",
  },
];

if (localStorage.getItem("location") !== null) {
  routes = [...commonRoutes];
} else {
  routes = [
    ...commonRoutes,
    {
      path: "/login",
      name: route_lan.login[language],
      icon: "ni ni-key-25 text-info",
      component: <Login />,
      layout: "/auth",
    },
    {
      path: "/register",
      name: route_lan.register[language],
      icon: "ni ni-circle-08 text-pink",
      component: <Register />,
      layout: "/auth",
    },
  ];
}

export default routes;
