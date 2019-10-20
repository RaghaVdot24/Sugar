import React, {Component}from 'react';


import Dashboard from "views/Dashboard.jsx";
import Icons from "views/Icons.jsx";
import Map from "views/Map.jsx";
import Notifications from "views/Notifications.jsx";
import Rtl from "views/Rtl.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";
import FirstPagesSignUp from 'ProjectPages/pages/FirstPagesSignUp';
import FirstPagesSignIn from 'ProjectPages/pages/FirstPagesSignIn';
import DealsoftheDay from 'ProjectPages/pages/DealsoftheDay';
import Dealsoftheday from 'ProjectPages/pages/DealsoftheDay';

import { Route } from 'react-router-dom'
// import { getCurrentUser } from './pages/utils/APIUtils';
// import { ACCESS_TOKEN } from './pages/constants/index.js';

import { Layout, notification } from 'antd';
const { Content } = Layout;

var routes = [
  {
    path: "/dashboard",
    name: "Sugar",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/dealsoftheday",
    name: "deals of the day",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: DealsoftheDay,
    layout: "/admin"
  },
  {
    path: "/firstpages-signup",
    name: "Signup",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: FirstPagesSignUp,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  
];
export default routes;
