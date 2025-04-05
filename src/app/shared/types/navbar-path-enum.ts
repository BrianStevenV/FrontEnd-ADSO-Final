import { TITLE_BLOG, TITLE_CART, TITLE_OFFERS, TITLE_PRODUCTS, TITLE_PROFILE } from "../../core/routing/name.routing.constants";
import { ROUTE_BLOG, ROUTE_CART, ROUTE_OFFERS, ROUTE_PRODUCTS, ROUTE_PROFILE } from "../../core/routing/routing.constants";

export const NavbarPaths = [
    {path: ROUTE_OFFERS, title: TITLE_OFFERS},
    {path: ROUTE_PRODUCTS, title: TITLE_PRODUCTS},
    {path: ROUTE_BLOG, title: TITLE_BLOG},
    {path: ROUTE_CART, title: TITLE_CART},
    {path: ROUTE_PROFILE, title: TITLE_PROFILE},
]