"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from 'next/image';

//metadata
const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  categoryId: Yup.number().required("Required"),
  file: Yup.mixed() .test("fileSize", "File too large", (value) => {
    console.log("value", value);
    if (!value) {
      return true;
    }
    return value.size <= FILE_SIZE;
  }).test("fileFormat", "Unsupported Format", (value) => {
    if (!value) {
      return true;
    }
    return SUPPORTED_FORMATS.includes(value.type);
  }).required("Required")
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const ImageURL = "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5fGVufDB8fDB8fHww&w=1000&q=80"

  const sendToServer = async (values) => {
    setIsLoading(true);
    let {title,price,description,categoryId,images} = values;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      title,
      price,
      description,
      categoryId,
      images:[images],
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://api.escuelajs.co/api/v1/products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        alert("Product created successfully");
        console.log(result);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.message);
      });
  };

  const uploadImage = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/files/upload",
        values.file
      );
      console.log(response);
      setIsLoading(false);
      return response.data.location;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // flex min-h-screen flex-col items-center justify-between p-24
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          categoryId: "",
          images:[""],
          file: undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const formData = new FormData();
            formData.append("file", values.file);

         const images = await uploadImage({file: formData});
          console.log("images", images);

          values.images = images;
          setTimeout(() => {            
            sendToServer(values);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="bg-black-100 max-w-md border border-zinc-400 rounded-lg shadow-2xl hover:shadow-black md:p-10 dark:bg-black-900 dark:border-gray-900 w-full ">
            <h1 style={{color:"black"}} className="text-3xl font-bold mb-4 " >Add new product</h1>
            <div className="flex flex-col mb-4">
              <label htmlFor="title" className="mb-1">
                Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your title here"
                />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="price" className="mb-1">
                Price
              </label>
              <Field
                type="text"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter price"

              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="description" className="mb-1">
              Description
              </label>
              <Field
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter description"

              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="categoryId" className="mb-1">
                CategoryId
              </label>
              <Field
                type="text"
                name="categoryId"
                id="categoryId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter categoryId"

              />
              <ErrorMessage
                name="categoryId"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="file" className="mb-1">
                Images
              </label>
              <Field
                type="file"
                name="file"
                id="file"
                setFieldValue={setFieldValue}
                component={FileUpload}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="file"
                component="div"
                className="text-red-500"
              />            
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className={`${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-black-500"
              } text-white font-bold py-2 px-4 rounded`}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>


    </main>
  );
}

function FileUpload({ field, form, setFieldValue }) {
  const [previewImage, setPreviewImage] = useState(null);
  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <input
        style={{backgroundColor:"green",}}
        type="file"
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {previewImage && (
        <Image unoptimized width={600} height={600} src={previewImage} alt="preview" className="mt-4 h-20 w-20" />
      )}
    </>
  );
}