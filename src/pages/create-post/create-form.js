import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import React from "react";

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    React.createElement("form", { onSubmit: handleSubmit(onCreatePost) },
      React.createElement("input", { placeholder: "Title...", ...register("title") }),
      React.createElement("p", { style: { color: "red" } }, errors.title?.message),
      React.createElement("textarea", { placeholder: "Description...", ...register("description") }),
      React.createElement("p", { style: { color: "red" } }, errors.description?.message),
      React.createElement("input", { type: "submit", className: "submitForm" })
    )
  );
};

export { CreateForm };
