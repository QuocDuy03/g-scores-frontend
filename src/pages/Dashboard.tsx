import { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { ITopStudent } from "@/interfaces";

import { instance as axiosClient } from "@/configs";

// import { subjectResponseCase } from "@/utils/common";

import { useBoolean } from "@/hooks";
import { ProgressSpinner } from "primereact/progressspinner";

export function Dashboard() {
  const [scoreStat, setScoreStat] = useState<ITopStudent[]>([]);

  const {
    value: loading,
    setTrue: showLoading,
    setFalse: hideLoading,
  } = useBoolean(false);

  const rankingBodyTemplate = (rowData: ITopStudent) => (
    <span className="font-normal text-slate-800">{rowData.rank}</span>
  );

  const registrationNumberBodyTemplate = (rowData: ITopStudent) => (
    <span className="font-normal text-slate-800">
      {rowData.registrationNumber}
    </span>
  );

  const mathBodyTemplate = (rowData: ITopStudent) => (
    <span className="font-normal text-slate-800 text-sm">{rowData.math}</span>
  );

  const physicsBodyTemplate = (rowData: ITopStudent) => (
    <span className="font-normal text-slate-800 text-sm">
      {rowData.physics}
    </span>
  );

  const chemistryBodyTemplate = (rowData: ITopStudent) => (
    <span className="font-normal text-slate-800 text-sm">
      {rowData.chemistry}
    </span>
  );

  const totalScoreBodyTemplate = (rowData: ITopStudent) => (
    <span className="font-normal text-slate-800">{rowData.totalScore}</span>
  );

  useEffect(() => {
    const getTop10Student = async () => {
      try {
        showLoading();
        const { data } = await axiosClient.get(`/score/top10`);
        setScoreStat(
          data.map((item: ITopStudent, index: number) => ({
            ...item,
            rank: index + 1,
          }))
        );
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        hideLoading();
      }
    };
    getTop10Student();
  }, []);

  return (
    <Card
      title="Top Scores"
      className="max-w-[1200px] mx-auto mt-4"
    >
      <DataTable
        value={scoreStat}
        rows={10}
        resizableColumns
        emptyMessage={
          loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <ProgressSpinner />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <p className="text-lg font-semibold">No data available</p>
            </div>
          )
        }
      >
        <Column
          header="Ranking"
          body={rankingBodyTemplate}
          className="w-[10%] text-center"
        />
        <Column
          header="Registration Number"
          body={registrationNumberBodyTemplate}
          className="w-[18%]"
        />
        <Column header="Math" body={mathBodyTemplate} className="w-[18%]" />
        <Column
          header="Physics"
          body={physicsBodyTemplate}
          className="w-[18%]"
        />
        <Column
          header="Chemistry"
          body={chemistryBodyTemplate}
          className="w-[18%]"
        />
        <Column
          header="Total Score"
          body={totalScoreBodyTemplate}
          className="w-[18%]"
        />
      </DataTable>
    </Card>
  );
}
