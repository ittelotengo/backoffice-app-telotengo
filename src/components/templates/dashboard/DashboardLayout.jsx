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
      <Layout style={{ minHeight: "92.25vh", background: "#F8F9FB", display: "flex", justifyContent: "space-between" }} hasSider>
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
            boxShadow: "3px 0px 16px 2px rgba(171, 171, 171, 0.1)",
            borderRight: "1px solid rgba(204, 204, 204, 0.46)"
          }}
        >
          <DrawerNav />
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft:"200px",background: "#F8F9FB" }}
        >
          <Content style={{ padding: '16px 24px', background: '#FFFFFF',overflow: "initial" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
