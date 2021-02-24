// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.


///**
// * @deprecated Moving to @zxing/browser
// *
// * Video input device metadata containing the id and label of the device if available.
// */
//export class VideoInputDevice implements MediaDeviceInfo {

//  /** @inheritdoc */
//  readonly kind = 'videoinput';

//  /** @inheritdoc */
//  readonly groupId: string;

//  /**
//   * Creates an instance of VideoInputDevice.
//   *
//   * @param {string} deviceId the video input device id
//   * @param {string} label the label of the device if available
//   */
//  public constructor(public deviceId: string, public label: string, groupId?: string) {
//    this.groupId = groupId || undefined;
//  }

//  /** @inheritdoc */
//  toJSON() {
//    return {
//      kind: this.kind,
//      groupId: this.groupId,
//      deviceId: this.deviceId,
//      label: this.label,
//    };
//  }
//}
