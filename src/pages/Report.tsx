import { useBoolean } from "@/hooks";
import { IBarChartData } from "@/interfaces";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { instance as axiosClient } from "@/configs";
import { subjectResponseCase } from "@/utils/common";

export function Report() {
  const [chartData, setChartData] = useState<IBarChartData>();
  const [chartOptions, setChartOptions] = useState({});

  const {
    value: loading,
    setTrue: showLoading,
    setFalse: hideLoading,
  } = useBoolean(false);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        showLoading();
        const { data } = await axiosClient.get(`/score/statistics`);
        setChartData({
          labels: data.labels.map(
            (label: string) => subjectResponseCase[label] || label
          ),
          datasets: [
            {
              type: "bar",
              label: "Less than 4 points",
              backgroundColor: "rgb(255, 159, 64)",
              data: data.data.below4,
            },
            {
              type: "bar",
              label: "From 4 to less than 6 points",
              backgroundColor: "rgb(75, 192, 192)",
              data: data.data.between4And6,
            },
            {
              type: "bar",
              label: "From 6 to less than 8 points",
              backgroundColor: "rgb(54, 162, 235)",
              data: data.data.between6And8,
            },
            {
              type: "bar",
              label: "8 points or more",
              backgroundColor: "rgb(153, 102, 255)",
              data: data.data.above8,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        hideLoading();
      }
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.5,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "#6c757d",
          },
          grid: {
            color: "#dfe7ef",
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: "#6c757d",
          },
          grid: {
            color: "#dfe7ef",
          },
        },
      },
    };
    getStatistics();
    setChartOptions(options);
  }, []);

  return (
    <Card title="Report" className="max-w-[1200px] max-h-[800px] mx-auto mt-4">
      {loading ? (
        <Skeleton height="500px"/>
      ) : (
        <Chart type="bar" data={chartData} options={chartOptions} />
      )}
    </Card>
  );
}
