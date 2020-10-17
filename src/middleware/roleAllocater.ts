import { Permission } from '../database/model/User';
import { RoleRequest } from 'app-request';
import { Response, NextFunction } from 'express';

export default (roleCode: Permission) => (
  req: RoleRequest,
  res: Response,
  next: NextFunction,
) => {
  req.currentRoleCode = roleCode;
  next();
};
