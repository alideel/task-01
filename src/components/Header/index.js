import React from "react";
import { Layout, Typography, Divider } from "antd";

import Image1 from "../../assets/pic-1.png";
import Image2 from "../../assets/pic-2.jpg";

const { Header } = Layout;
const { Title } = Typography;

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#fff",
  height: 200,
  lineHeight: "64px",
  backgroundColor: "white",
};

export default function header() {
  return (
    <div className="header">
      <Header style={headerStyle}>
        <img src={Image1} alt="heading" />
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Title level={2}>مديرية المرور العامة</Title>
          <Title level={4} style={{ margin: 0 }}>
            نظام تدقيق الصكوك
          </Title>
        </div>
        <img src={Image2} alt="heading 2" />
      </Header>
      <Divider />
    </div>
  );
}
