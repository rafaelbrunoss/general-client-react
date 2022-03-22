import { Action } from '../permission.action.enum';
import { PermissionModule } from '../permission.module.enum';
import { ProjectSubmodule } from './project.submodule.enum';

export enum ProjectPermissions {
  PROJECT_ACTIVITIES_READ = PermissionModule.PROJECT +
    ProjectSubmodule.PROJECT_ACTIVITIES +
    Action.READ,
  PROJECT_ACTIVITIES_CREATE = PermissionModule.PROJECT +
    ProjectSubmodule.PROJECT_ACTIVITIES +
    Action.CREATE,
  PROJECT_ACTIVITIES_UPDATE = PermissionModule.PROJECT +
    ProjectSubmodule.PROJECT_ACTIVITIES +
    Action.UPDATE,
  PROJECT_ACTIVITIES_DELETE = PermissionModule.PROJECT +
    ProjectSubmodule.PROJECT_ACTIVITIES +
    Action.DELETE,
  PROJECT_ACTIVITIES_EXPORT = PermissionModule.PROJECT +
    ProjectSubmodule.PROJECT_ACTIVITIES +
    Action.EXPORT,
}
