import { QueryParams } from '../interfaces';
import { IPaginatedResponse } from '../interfaces/pagination.interface';

export function PaginateResult<T>(
  entities: T[],
  count: number,
  query: QueryParams<T>,
): IPaginatedResponse<T> {
  return {
    result: entities,
    pagination: {
      currentPage: query.page || 1,
      nextPage: query.page || 1 + 1,
      prevPage: query.page || 1 - 1,
      hasNextPage: query.limit
        ? query.limit * (query.page || 1) < count
        : false,
      hasPrevPage: (query.page || 1) > 1,
      lastPage: query.limit ? Math.ceil(count / query.limit) : 0,
      currentCount: entities.length,
      count,
      limit: query.limit ?? 0,
    },
  };
}
