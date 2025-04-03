import { useState } from "react";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import { instance as axiosClient } from "@/configs";

import { IExamResult, IScore, ISearch } from "@/interfaces";

import { useBoolean } from "@/hooks";

import { subjectResponseCase } from "@/utils/common";

const schema = yup.object().shape({
  searchValue: yup.string().trim().required("Registration number is required"),
});

export function Search() {
  const [examResult, setExamResult] = useState<IExamResult | null>();
  const {
    value: loading,
    setTrue: showLoading,
    setFalse: hideLoading,
  } = useBoolean(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      searchValue: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (search: ISearch) => {
    try {
      showLoading();
      const { data } = await axiosClient.get(
        `/score/search/${search.searchValue}`
      );

      setExamResult({
        ...data,
        scores: Array.isArray(data.scores)
          ? data.scores.map((scoreItem: IScore) => ({
              ...scoreItem,
              subject:
                subjectResponseCase[scoreItem.subject] || scoreItem.subject,
            }))
          : [],
      });
      reset();
    } catch (err) { 
      console.error("Search error:", err);
      setExamResult(null);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="max-w-[1200px] max-h-[800px] mx-auto mt-4">
      <Card title="User Registration" className="my-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-field">
            <label htmlFor="searchValue">Registration Number: </label>
            <Controller
              name="searchValue"
              control={control}
              render={({ field }) => (
                <InputText
                  id="searchValue"
                  {...field}
                  className={`w-full ${errors.searchValue ? "p-invalid" : ""}`}
                  placeholder="Enter registration number:"
                />
              )}
            />
            {errors.searchValue && (
              <small className="p-error">{errors.searchValue.message}</small>
            )}
          </div>
          <div className="mt-3">
            <Button type="submit" label="Search" className="p-button-primary" />
          </div>
        </form>
      </Card>
      <Card title="Detail Scores" className="my-2">
        {loading ? (
          <ProgressSpinner className="w-full text-center !block" />
        ) : examResult ? (
          examResult.scores?.length > 0 ? (
            <div className="flex flex-col gap-2">
              <div>Registration Number: {examResult.registrationNumber}</div>
              {examResult.scores.map((score) => (
                <div key={score.id}>{`${score.subject}: ${score.score}`}</div>
              ))}
              <div>Foreign Language Code: {examResult.foreignLanguageCode}</div>
            </div>
          ) : (
            <div>This student is not in the system.</div>
          )
        ) : (
          <div>Detailed view of search scores here!</div>
        )}
      </Card>
    </div>
  );
}
