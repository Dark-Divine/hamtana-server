import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { QueryParams, SingleQueryParams } from '../interfaces';
import { PaginateResult, ParseBooleanValues } from '../utils';
import { NotFoundException } from '@nestjs/common';

export abstract class CrudService<T> {
  protected constructor(private repository: Repository<T | any>) {}

  private queryInitializer = {
    order: {},
    relations: {},
    select: {},
    where: {},
  };

  async findAll(
    query: QueryParams<T>,
    withDeleted?: boolean,
    withPagination?: boolean,
  ) {
    const { where, sort } = query;
    if (query.page && !query.limit) query.limit = 10;

    query.relations = ParseBooleanValues(query?.relations);
    query.select = ParseBooleanValues(query.select);

    if (!withPagination) {
      return await this.repository.find({ where: query.where, ...query });
    }

    const entities = await this.repository.find({
      take: query.limit,
      withDeleted,
      skip: query?.page && this.getSkip(query.page, query.limit || 1),
      where: where,
      order: sort,
      relations: query.relations,
      select: query.select,
    });

    const count = await this.repository.count({ where: where });

    return await PaginateResult(entities, count, query);
  }

  async findOne(
    options: FindOneOptions<T>,
    exception = true,
    query: SingleQueryParams<T> = this.queryInitializer,
  ): Promise<T> {
    if (query.relations) query.relations = ParseBooleanValues(query?.relations);
    if (query.select) query.select = ParseBooleanValues(query?.select);

    const res = await this.repository.findOne({
      ...options,
      relations: query?.relations,
      select: query?.select,
    });

    if (!res && exception) throw new NotFoundException();
    return res;
  }

  async create(body: Partial<T>): Promise<T> {
    const entity = await this.repository.create(body);
    return this.repository.save(entity);
  }

  async update(id: number, body: DeepPartial<T>) {
    const entity = await this.findOne({ where: { id } } as any);
    const preload = await this.repository.preload({ ...entity, ...body });
    return this.repository.save(preload);
  }

  async softDelete(id: number) {
    const entity = await this.findOne({ where: { id } } as any);
    await this.repository.softDelete(id);
    return entity;
  }

  async softRemove(entity: T | T[]) {
    return this.repository.softRemove(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne({ where: { id } } as any);
    return await this.repository.remove(entity);
  }

  private getSkip(page = 0, limit: number) {
    return (page - 1) * limit;
  }
}
