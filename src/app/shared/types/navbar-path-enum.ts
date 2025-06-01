import { TITLE_CART, TITLE_PRODUCTS, TITLE_PROFILE } from "../../core/routing/name.routing.constants";
import { ROUTE_CART, ROUTE_PRODUCTS, ROUTE_PROFILE } from "../../core/routing/routing.constants";

export const NavbarPaths = [
    {path: ROUTE_PRODUCTS, title: TITLE_PRODUCTS},
    {path: ROUTE_CART, title: TITLE_CART},
    {path: ROUTE_PROFILE, title: TITLE_PROFILE},
]