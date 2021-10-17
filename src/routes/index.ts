import { Home, About, E404 } from "../pages";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export interface IRoute {
	name?: string;
	path: string;
	component: React.FunctionComponent;
	exact?: boolean;
}

const routes = [
	{
		name: "home",
		path: "/",
		component: Home,
	},
	{
		name: "about",
		path: "/about",
		component: About,
	},
	{
		path: "**",
		component: E404,
	},
] as const;

type ObtainName<T> = T extends any
	? T extends { name: infer Name }
		? Name
		: never
	: never;

type RoutesMapType = ObtainName<typeof routes[number]>;

const buildPath = (path: string): string => {
	const isDynamic = path.indexOf(":");
	return isDynamic > -1 ? path.slice(0, isDynamic) : path;
};

const routesMap = routes.reduce((map, route: IRoute) => {
	if (route.name) {
		map[route.name] = buildPath(route.path);
	}
	return map;
}, {} as Record<RoutesMapType, string>);

export { history, routes, routesMap };
