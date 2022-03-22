/*
  0xFFFFFFFF = 4 294 967 295

  FF XXXXXX = 255 modules
  XX FFFF XX = 65535 submodules
  XX XXXX FF = 255 actions
*/

export enum Action {
  // Primary Actions
  READ = 0x00000001,
  CREATE = 0x00000002,
  UPDATE = 0x00000003,
  DELETE = 0x00000004,
  EXPORT = 0x00000005,
  SHARE = 0x00000006,
  UPLOAD = 0x00000007,
  DOWNLOAD = 0x00000008,

  // Secondary Actions
  SUBMIT = 0x00000010,
  NOTIFY = 0x00000011,
  COMMENT = 0x00000012,
  APPROVE = 0x00000013,
  UNAPPROVE = 0x00000014,
}