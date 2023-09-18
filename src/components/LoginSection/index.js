import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  Col,
  Row,
  Typography,
  Divider,
  AutoComplete,
  Input,
  Space,
  Button,
  Modal,
} from "antd";
import Image1 from "../../assets/pic-1.png";

const { Text } = Typography;

const containerOfLoginStyle = {
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBlock: "2rem",
  paddingInline: "1rem",
};

const validationSchema = Yup.object({
  typeOfEmployee: Yup.string().required("نوع الموظف اساسي و مطلوب"),
  password: Yup.string()
    .min(6, "الباسورد يجب ان يكون 6 احرف على الأقل")
    .required("الباسورد اساسي و مطلوب"),
});

export default function LoginSection() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      typeOfEmployee: "",

      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (
        values.typeOfEmployee != storedType ||
        values.password != storedPassword
      )
        showModal();

      navigate("/datapage");
    },
  });

  const defaultType = "مدير النظام";
  const defaultPassword = "admin!@#";

  // Define state variables for "type" and "password"
  const [storedType, setStoredType] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  useEffect(() => {
    // Check if "type" field exists in localStorage
    const typeFromLocalStorage = localStorage.getItem("type");

    // If "type" doesn't exist, set it to the default value and update the state
    if (!typeFromLocalStorage) {
      localStorage.setItem("type", defaultType);
      setStoredType(defaultType);
    } else {
      // If "type" exists in localStorage, update the state with its value
      setStoredType(typeFromLocalStorage);
    }

    // Check if "password" field exists in localStorage
    const passwordFromLocalStorage = localStorage.getItem("password");

    // If "password" doesn't exist, set it to the default value and update the state
    if (!passwordFromLocalStorage) {
      localStorage.setItem("password", defaultPassword);
      setStoredPassword(defaultPassword);
    } else {
      // If "password" exists in localStorage, update the state with its value
      setStoredPassword(passwordFromLocalStorage);
    }
  }, []);
  const handleAutoCompleteChange = (value) => {
    formik.setFieldValue("typeOfEmployee", value);
  };

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // console.log(formik.values.typeOfEmployee);
  // console.log(formik.values.password);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Row justify="center">
          <Col xs={20} sm={12} md={8} style={{ backgroundColor: "#f8f9fa" }}>
            <div style={containerOfLoginStyle}>
              <img src={Image1} alt="alt im" />
              <Text style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                تسجيل الدخول
              </Text>
              <Divider />
              <Space style={{ width: "100%" }} size={10} direction="vertical">
                <p
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  المستخدم
                </p>
                <AutoComplete
                  popupClassName="certain-category-search-dropdown"
                  popupMatchSelectWidth={"100%"}
                  style={{
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "مدير النظام",
                      label: (
                        <div style={{ textAlign: "right" }}>مدير النظام</div>
                      ),
                    },
                    {
                      value: "موظف الأدخال",
                      label: (
                        <div style={{ textAlign: "right" }}>موظف الأدخال</div>
                      ),
                    },
                  ]}
                  value={formik.values.typeOfEmployee}
                  onChange={handleAutoCompleteChange}
                >
                  <Input
                    style={{ textAlign: "right" }}
                    name="typeOfEmployee"
                    value={formik.values.typeOfEmployee}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </AutoComplete>
                {formik.touched.typeOfEmployee &&
                formik.errors.typeOfEmployee ? (
                  <div
                    className="error"
                    style={{ textAlign: "right", marginBlockEnd: "0.8rem" }}
                  >
                    {formik.errors.typeOfEmployee}
                  </div>
                ) : null}
                {formik.touched.typeOfEmployee &&
                !formik.errors.typeOfEmployee &&
                formik.values.typeOfEmployee != "مدير النظام" &&
                formik.values.typeOfEmployee != "موظف الأدخال" ? (
                  <div
                    className="error"
                    style={{ textAlign: "right", marginBlockEnd: "0.8rem" }}
                  >
                    البيانات المدخلة غير صحيحة
                  </div>
                ) : null}
              </Space>
              <Space style={{ width: "100%" }} size={10} direction="vertical">
                <p
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  كلمة السر
                </p>

                <Input
                  style={{ textAlign: "right" }}
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div
                    className="error"
                    style={{ textAlign: "right", marginBlockEnd: "0.8rem" }}
                  >
                    {formik.errors.password}
                  </div>
                ) : null}
              </Space>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBlockEnd: "2rem",
              }}
            >
              <Button type="primary" htmlType="submit">
                تسجيل الدخول
              </Button>
            </div>
          </Col>
        </Row>
      </form>
      <Modal
        open={open}
        title="خطأ"
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={() => (
          <>
            <Button onClick={handleCancel}>OK</Button>
          </>
        )}
      >
        <p className="error" style={{ textAlign: "center" }}>
          المعلومات المدحلة غير صحيحة
        </p>
      </Modal>
    </>
  );
}
