import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/article.tsx"),
  route("mentions-legales", "routes/mentions-legales.tsx"),
  route("confidentialite", "routes/confidentialite.tsx"),
  route("cgv", "routes/cgv.tsx"),
  route(":slug", "routes/metier.tsx"),
] satisfies RouteConfig;
