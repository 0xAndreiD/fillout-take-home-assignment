import { Question } from "./question.type";

export type Submission = {
  questions: Question[];
} & {
  [k in string]: any;
};
