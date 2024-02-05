import React from "react";
import HeaderNav from "../../molecules/header/HeaderNav";
import DrawerNav from "../../molecules/drawer/DrawerNav";
import { styled, useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const theme = useTheme();

  const { Header, Content, Sider } = Layout;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout style={{ background: "#F8F9FB" }}>
      <HeaderNav />
      <Layout style={{ minHeight: "92.25vh", background: "#F8F9FB" }} hasSider>
        {/* <DrawerNav /> */}
        <Sider
          width={200}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 60,
            bottom: 0,
            background: "white",
          }}
        >
          <DrawerNav />
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: 200, background: "#F8F9FB" }}
        >
          <Content style={{ margin: "80px 30px 0", overflow: "initial" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
