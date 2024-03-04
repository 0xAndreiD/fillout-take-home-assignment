import { Injectable } from "@nestjs/common";

import { Submission } from "./types/submission.type";
import { FilterClause } from "./types/filter-clause.type";

@Injectable()
export class FormService {
  constructor() {}

  filterSubmissions(submissions: Submission[], filters: FilterClause[] | null) {
    return !filters || !filters.length
      ? submissions
      : submissions.map(({ questions, ...details }) => ({
          questions: questions.filter((question) =>
            filters.some(
              ({ id, condition, value }) =>
                question.id === id &&
                ((condition === "equals" && question.value === value) ||
                  (condition === "does_not_equal" &&
                    question.value !== value) ||
                  (condition === "greater_than" && question.value > value) ||
                  (condition === "less_than" && question.value < value)),
            ),
          ),
          ...details,
        }));
  }
}
