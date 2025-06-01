export const environment = {
    production: false,
    product_base_path: 'http://localhost:8082',
    user_base_path: 'http://localhost:8081',
    blog_base_path: 'http://localhost:8084',
    cart_base_path: 'http://localhost:8082',
    order_base_path: 'http://localhost:8083',
    promotion_base_path: 'http://localhost:8085',
    shipment_base_path: 'http://localhost:8086',
    traceability_base_path: 'http://localhost:8087',

    auth_controller: '/auth',
    auth_post_login: '/login',
    auth_post_refresh_token: '/refresh',

    order_controller: '/order',
    order_get_cart: '/cart',
    
    product_controller: '/product',
    product_get_details: '/details',
    product_get_feed: '/feedback',
    product_post_create: '/',
    product_get_all_products_by_provider: '/provider/',
    product_patch_update_stock_quantity: '/provider/add-inventory',

    product_attributes_controller: '/product-attributes',
    product_attributes_post_create: '/',

    category_controller: '/category',
    category_get_all: '/all',
    category_get_all_categories_attributes_according_to_category: '/attributes',

    payment_info_controller: '/payment-info',
    payment_info_get_payment_providers: '/providers',
    payment_info_get_payment_types: '/types',

    country_controller: '/country',
    region_controller: '/region',

    user_controller: '/user',
    user_post_create_user:'/',
    user_get_user_by_id: '/{id}',
    user_patch_update_user: '/{id}',
    user_get_dashboard_users: '/admin/users',
    user_patch_change_status_user: '/admin/users/status/',

    auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBvd2VyIFVwIEZ1bGwgU3RhY2siLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.8r-71aFvp9lUbJHbUQnkHTYzlfZsdeF5n2ZZedqgee4"
}