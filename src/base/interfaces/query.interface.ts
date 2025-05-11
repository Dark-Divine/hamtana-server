import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';

export class SingleQueryParams<T> {
  @IsOptional()
  @Type(() => Object || Array)
  relations?: FindOptionsRelations<T>;

  @IsOptional()
  @Type(() => Object || Array)
  select?: FindOptionsSelect<T>;

  @IsOptional()
  @Type(() => Object || Array)
  where?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;
}

export class QueryParams<T> extends SingleQueryParams<T> {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  limit?: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @Type(() => Object)
  sort?: object;
}

export class QueryBuilderParams<T = any> {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  limit?: number = 20;

  @IsOptional()
  @Type(() => Object || Array)
  where?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @Type(() => Object)
  sort?: { field: string; type: 'ASC' | 'DESC' };

  @IsOptional()
  @Type(() => Object)
  relations?: FindOptionsRelations<T>;

  @IsOptional()
  @Type(() => Object)
  select?: FindOptionsSelect<T>;
}
