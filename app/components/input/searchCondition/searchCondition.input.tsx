"use client";
import InputStyles from "./searchCondition.input.module.css";
import ButtonStyles from "../../button/button.module.css";
import { useState } from "react";
import { Button, FormControl, Input } from "@mui/material";

export default function SearchConditionInput() {
    const [formData, setFormData] = useState({
        keyword: "",
        location: "",
        date:"",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
        console.log(formData);
    }

  return (
    <form onSubmit={handleSubmit}>
      <Input className={`${InputStyles.input} ${InputStyles.horizontal}`} type="text" placeholder="キーワードを入力して下さい" value={formData.keyword} onChange={handleChange} name="keyword"></Input>
      <Input className={`${InputStyles.input} ${InputStyles.horizontal}`} type="text" placeholder="場所を入力して下さい" value={formData.location} onChange={handleChange} name="location"></Input>
      <Input className={`${InputStyles.input} ${InputStyles.horizontal}`} type="date" placeholder="日時を入力して下さい" value={formData.date} onChange={handleChange} name="date"></Input>
      <Button className={`${ButtonStyles.button} ${InputStyles.horizontal}`} type="submit">Search</Button>
    </form>
  );
}