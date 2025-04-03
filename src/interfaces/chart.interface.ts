export interface IBarChartData {
  labels: string[];
  datasets: {
    type: string;
    label: string;
    backgroundColor: string;
    // borderColor: string[];
    data: number[];
  }[];
}
