import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../decorators';

export function isPublic(context: ExecutionContext, reflector: Reflector) {
  return reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);
}
