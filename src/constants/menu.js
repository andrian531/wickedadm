import {
  Home,
  Box,
  DollarSign,
  Tag,
  Clipboard,
  Camera,
  AlignLeft,
  UserPlus,
  Users,
  Chrome,
  BarChart,
  Settings,
  Archive,
  LogIn,
} from "react-feather";

import * as ROUTES from "../constants/routes";

export const MENUITEMS = [
  {
    path: ROUTES.LANDING,
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        title: "Physical",
        type: "sub",
        active: false,
        children: [
          {
            path: "/products/physical/category",
            title: "Category",
            type: "link",
          },
          {
            path: "/products/physical/sub-category",
            title: "Sub Category",
            type: "link",
          },
          {
            path: "/products/physical/product-list",
            title: "Product List",
            type: "link",
          },
          {
            path: "/products/physical/product-detail",
            title: "Product Detail",
            type: "link",
          },
          {
            path: "/products/physical/add-product",
            title: "Add Product",
            type: "link",
          },
        ],
      },
      {
        title: "digital",
        type: "sub",
        active: false,
        children: [
          {
            path: "/products/digital/digital-category",
            title: "Category",
            type: "link",
          },
          {
            path: "/products/digital/digital-sub-category",
            title: "Sub Category",
            type: "link",
          },
          {
            path: "/products/digital/digital-product-list",
            title: "Product List",
            type: "link",
          },
          {
            path: "/products/digital/digital-add-product",
            title: "Add Product",
            type: "link",
          },
        ],
      },
    ],
  },
  {
    title: "Sales",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/sales/orders", title: "Orders", type: "link" },
      { path: "/sales/transactions", title: "Transactions", type: "link" },
    ],
  },
  {
    title: "Coupons",
    icon: Tag,
    type: "sub",
    active: false,
    children: [
      { path: "/coupons/list-coupons", title: "List Coupons", type: "link" },
      {
        path: "/coupons/create-coupons",
        title: "Create Coupons",
        type: "link",
      },
    ],
  },
  {
    title: "Pages",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      { path: ROUTES.LIST_PAGES, title: "List Page", type: "link" },
      { path: ROUTES.CREATE_PAGE, title: "Create Page", type: "link" },
    ],
  },
  {
    title: "Media",
    path: "/media",
    icon: Camera,
    type: "link",
    active: false,
  },
  {
    title: "Menus",
    icon: AlignLeft,
    type: "sub",
    active: false,
    children: [
      { path: ROUTES.LIST_MENUS, title: "List Menu", type: "link" },
      { path: ROUTES.CREATE_MENU, title: "Create Menu", type: "link" },
    ],
  },
  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: ROUTES.LIST_USERS, title: "User List", type: "link" },
      { path: ROUTES.CREATE_USER, title: "Create User", type: "link" },
    ],
  },
  {
    title: "Vendors",
    icon: Users,
    type: "sub",
    active: false,
    children: [
      { path: "/vendors/list_vendors", title: "Vendor List", type: "link" },
      { path: "/vendors/create-vendors", title: "Create Vendor", type: "link" },
    ],
  },
  {
    title: "Localization",
    icon: Chrome,
    type: "sub",
    children: [
      {
        path: "/localization/transactions",
        title: "Translations",
        type: "link",
      },
      {
        path: "/localization/currency-rates",
        title: "Currency Rates",
        type: "link",
      },
      { path: "/localization/taxes", title: "Taxes", type: "link" },
    ],
  },
  {
    title: "Reports",
    path: "/reports/report",
    icon: BarChart,
    type: "link",
    active: false,
  },
  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    children: [{ path: "/settings/profile", title: "Profile", type: "link" }],
  },
  {
    title: "Invoice",
    path: "/invoice",
    icon: Archive,
    type: "link",
    active: false,
  },
  {
    title: "Login",
    path: "/auth/login",
    icon: LogIn,
    type: "link",
    active: false,
  },
];
