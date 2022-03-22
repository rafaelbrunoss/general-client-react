/*
  0xFFFFFFFF = 4 294 967 295

  FF XXXXXX = 255 modules
  XX FFFF XX = 65535 submodules
  XX XXXX FF = 255 actions
*/

export enum PermissionModule {
  NONE = 0x00000000,
  PROJECT = 0x01000000,
}
