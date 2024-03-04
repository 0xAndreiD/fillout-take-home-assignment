import { Submission } from "./submission.type";

export type PaginatedResponse = {
  responses: Submission[];
  totalResponses: number;
  pageCount: number;
};
