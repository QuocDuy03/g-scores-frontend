export interface IExamResult {
  registrationNumber: string;
  foreignLanguageCode: string;
  scores: IScore[];
}

export interface IScore {
  id: string;
  subject: string;
  score: number;
}
