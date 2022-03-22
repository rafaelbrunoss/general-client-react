import { ProjectPermissions } from '@core/models';

export type PermissionsType = string | ProjectPermissions;

export const Permissions = {
  ...ProjectPermissions,
};
