import React from "react";
import { Typography, Button, Input } from "antd";
const { Text } = Typography;

function TabelHeading({ addFunction }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fafafa",
        direction: "rtl",
        paddingInline: "12px",
        paddingBlock: "6px",
      }}
    >
      <div className="right-side">
        <Text style={{ fontWeight: "bold", fontSize: "1.2rem" }}>الصكوك</Text>
      </div>
      <div
        className="left-side"
        style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
      >
        <Input placeholder="بحث عن طريث رقم الصك" type="number" />
        <Button style={{ backgroundColor: "green", color: "white" }}>
          تصدير الى اكسل
        </Button>
        <Button type="primary" onClick={addFunction}>
          اضافة
        </Button>
      </div>
    </div>
  );
}

export default TabelHeading;
