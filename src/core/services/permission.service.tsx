import { replaceallText } from '@core/utils';
import { Permissions, DropDownData, PermissionsType } from '@core/models';
import { BaseService } from '@core/services';

class PermissionService extends BaseService {
  private static _permissions: DropDownData<PermissionsType>[] = Object.entries(
    Permissions,
  ).map(([text, value]) => {
    return { text, value };
  });

  public static permissions: DropDownData<PermissionsType>[] =
    PermissionService._permissions.slice(
      PermissionService._permissions.length / 2,
      PermissionService._permissions.length,
    );

  private static getTextFromPermission = (
    permissions: DropDownData<PermissionsType>[],
    filter?: (value: DropDownData<PermissionsType>) => boolean,
  ): string[] => {
    if (filter) {
      return permissions
        .filter((f: DropDownData<PermissionsType>) => filter(f))
        .map((permission: any) => replaceallText(permission.text, '_', ' '));
    } else {
      return permissions.map((permission: any) =>
        replaceallText(permission.text, '_', ' '),
      );
    }
  };

  public static getPermissionText = (
    filter?: (value: DropDownData<PermissionsType>) => boolean,
  ): string[] =>
    PermissionService.getTextFromPermission(PermissionService.permissions, filter);
}

export { PermissionService };
