import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TabelHeading from "../components/TabelHeading";
import { Table, Space, Button, Modal, Input, DatePicker } from "antd";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const validationSchema = Yup.object({
  name: Yup.string().required("الأسم مطلوب"),
  instrumentNumber: Yup.string().required("رقم الصك مطلوب"),
  issuer: Yup.string().required("جهة الأصدار مطلوبة"),
  issuerDate: Yup.string().required("تاريخ الصك مطلوب"),
  type: Yup.string().required("نوع المركبة مطلوب"),
  color: Yup.string().required("لون المركبة مطلوب"),
  number: Yup.string().required("رقم الشاصي مطلوب"),
  addDate: Yup.string().required("تاريخ الأضافة مطلوب"),
});

export default function DataPage() {
  const [open, setOpen] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [idOfUpdateTarget, setIdOfUpdateTarget] = useState("");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setIsUpdateModal(false);
  };

  // const onChangeForIssuerDate = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  // const onChangeForAddDate = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const handleDatePickerChangeForAddDate = (date, dateString) => {
    // Set the Formik field value for issuerDate
    formik.setFieldValue("addDate", dateString);
  };

  const handleDatePickerChangeForIssuerDate = (date, dateString) => {
    // Set the Formik field value for issuerDate
    formik.setFieldValue("issuerDate", dateString);
  };

  const [columns, setColumns] = useState([
    {
      title: "الأسم",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "رقم الصك",
      dataIndex: "instrumentNumber",
      key: "instrumentNumber",
    },
    {
      title: "جهة اصدار الصك",
      dataIndex: "issuer",
      key: "issuer",
    },
    {
      title: "تاريخ الصك",
      dataIndex: "issuerDate",
      key: "issuerDate",
    },
    {
      title: "نوع المركبة",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "لون المركبة",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "رقم الشاصي",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "تاريخ الأضافة",
      dataIndex: "addDate",
      key: "addDate",
    },
    {
      title: "الأجراء",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleClickUpdate(record)}>
            تعديل
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => handleDelete(record.key)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ]);
  const [data, setData] = useState([
    // {
    //   key: "1",
    //   name: "علي حامد",
    //   instrumentNumber: "444",
    //   issuer: "مصرف الرشيد",
    //   issuerDate: "التاريخ",
    //   type: "حمل",
    //   color: "اسود",
    //   number: "ي86576",
    //   addDate: "تاريخ",
    // },
  ]);

  const handleDelete = (key) => {
    setData((prevData) => {
      // Filter the data to remove the selected row
      const updatedData = prevData.filter((item) => item.key !== key);

      // Update localStorage with the new data
      localStorage.setItem("data", JSON.stringify(updatedData));

      return updatedData; // Return the updated data to set in state
    });
  };
  const handleClickUpdate = (record) => {
    setIsUpdateModal(true);
    setIdOfUpdateTarget(record.key);
    showModal();
    formik.setFieldValue("name", record.name);
    formik.setFieldValue("instrumentNumber", record.instrumentNumber);
    formik.setFieldValue("issuer", record.issuer);
    formik.setFieldValue("issuerDate", record.issuerDate);
    formik.setFieldValue("type", record.type);
    formik.setFieldValue("color", record.color);
    formik.setFieldValue("number", record.number);
    formik.setFieldValue("addDate", record.addDate);
  };

  const updateData = () => {
    setData((prevData) => {
      const targetForUpdate = prevData.filter(
        (item) => item.key === idOfUpdateTarget
      );

      targetForUpdate[0].name = formik.values.name;
      targetForUpdate[0].instrumentNumber = formik.values.instrumentNumber;
      targetForUpdate[0].issuer = formik.values.issuer;
      targetForUpdate[0].issuerDate = formik.values.issuerDate;
      targetForUpdate[0].type = formik.values.type;
      targetForUpdate[0].color = formik.values.color;
      targetForUpdate[0].type = formik.values.number;
      targetForUpdate[0].color = formik.values.addDate;

      const restData = prevData.filter((item) => item.key != idOfUpdateTarget);

      localStorage.setItem(
        "data",
        JSON.stringify([...targetForUpdate, ...restData])
      );

      return [...targetForUpdate, ...restData];
    });
    setIsUpdateModal(false);
    setOpen(false);
    formik.resetForm();
  };

  // useEffect(() => {}, [data]);

  const formik = useFormik({
    initialValues: {
      name: "",
      instrumentNumber: "",
      issuer: "",
      issuerDate: null,
      type: "",
      color: "",
      number: "",
      addDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const existingData = JSON.parse(localStorage.getItem("data")) || [];
      // console.log(values);
      const uniqueId = uuidv4();
      const newData = [...existingData, { ...values, key: uniqueId }];

      localStorage.setItem("data", JSON.stringify(newData));

      setData(newData);
      setOpen(false);
      formik.resetForm();
    },
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("data")) || [];
    console.log(savedData);
    setData(savedData);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  return (
    <>
      <div style={{ marginInline: "12px" }}>
        <TabelHeading addFunction={showModal} />
        <Table
          columns={columns}
          dataSource={data}
          style={{ marginTop: "1rem", direction: "rtl" }}
        />
      </div>
      <Modal
        open={open}
        title={isUpdateModal ? "تعديل البيانات" : "اضافة صك جديد"}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={() => (
          <>
            {isUpdateModal ? (
              <Button onClick={() => updateData()}>تعديل</Button>
            ) : (
              <Button onClick={formik.handleSubmit}>اضافة</Button>
            )}
          </>
        )}
      >
        <form onSubmit={formik.handleSubmit}>
          <Space size={10} direction="vertical" style={{ width: "100%" }}>
            <Input
              placeholder="الأسم"
              style={{ textAlign: "right" }}
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
            <Input
              placeholder="رقم الصك"
              style={{ textAlign: "right" }}
              name="instrumentNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.instrumentNumber}
            />
            {formik.touched.instrumentNumber &&
            formik.errors.instrumentNumber ? (
              <div className="error">{formik.errors.instrumentNumber}</div>
            ) : null}
            <Input
              placeholder="جهة الأصدار"
              style={{ textAlign: "right" }}
              name="issuer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.issuer}
            />
            {formik.touched.issuer && formik.errors.issuer ? (
              <div className="error">{formik.errors.issuer}</div>
            ) : null}
            <DatePicker
              // onChange={onChangeForIssuerDate}
              placeholder="تاريخ الصك"
              style={{ textAlign: "right", width: "100%" }}
              name="issuerDate"
              onChange={handleDatePickerChangeForIssuerDate}
              onBlur={formik.handleBlur}
              value={
                formik.values.issuerDate
                  ? moment(formik.values.issuerDate) // Convert the value to a moment object
                  : null
              }
            />
            {formik.touched.issuerDate && formik.errors.issuerDate ? (
              <div className="error">{formik.errors.issuerDate}</div>
            ) : null}
            <Input
              placeholder="نوع المركبة"
              style={{ textAlign: "right" }}
              name="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            />
            {formik.touched.type && formik.errors.type ? (
              <div className="error">{formik.errors.type}</div>
            ) : null}
            <Input
              placeholder="لون المركبة"
              style={{ textAlign: "right" }}
              name="color"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.color}
            />
            {formik.touched.color && formik.errors.color ? (
              <div className="error">{formik.errors.color}</div>
            ) : null}
            <Input
              placeholder="رقم الشاصي"
              style={{ textAlign: "right" }}
              name="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number}
            />
            {formik.touched.number && formik.errors.number ? (
              <div className="error">{formik.errors.number}</div>
            ) : null}
            <DatePicker
              // onChange={onChangeForAddDate}
              placeholder="تاريخ الأضافة"
              style={{ textAlign: "right", width: "100%" }}
              name="addDate"
              onChange={handleDatePickerChangeForAddDate}
              onBlur={formik.handleBlur}
              value={
                formik.values.addDate
                  ? moment(formik.values.addDate) // Convert the value to a moment object
                  : null
              }
            />
            {formik.touched.addDate && formik.errors.addDate ? (
              <div className="error">{formik.errors.addDate}</div>
            ) : null}
          </Space>
        </form>
      </Modal>
    </>
  );
}
