"use strict";

///////////////////////////////////////////////////////////////////////////////////////////////
//                 IMPORTANT - DO NOT MODIFY AUTO-GENERATED CODE OR COMMENTS                 //
//Parts of this file are auto-generated and modifications to those sections will be          //
//overwritten. You are allowed to modify:                                                    //
// - the tags in the jsDoc as described in the corresponding section                         //
// - the function name and its parameters                                                    //
// - the function body between the insertion ranges                                          //
//         "Add your customizing javaScript code below / above"                              //
//                                                                                           //
// NOTE:                                                                                     //
// - If you have created PRE and POST functions, they will be executed in the same order     //
//   as before.                                                                              //
// - If you have created a REPLACE to override core function, only the REPLACE function will //
//   be executed. PRE and POST functions will be executed in the same order as before.       //
//                                                                                           //
// - For new customizations, you can directly modify this file. There is no need to use the  //
//   PRE, POST, and REPLACE functions.                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Use the following jsDoc tags to describe the BL function. Setting these tags will
 * change the runtime behavior in the mobile app. The values specified in the tags determine
 * the name of the contract file. The filename format is “@this . @function .bl.js”.
 * For example, LoVisit.BeforeLoadAsync.bl.js
 * -> function: Name of the businessLogic function.
 * -> this: The LO, BO, or LU object that this function belongs to (and it is part of the filename).
 * -> kind: Type of object this function belongs to. Most common value is "businessobject".
 * -> async: If declared as async then the function should return a promise.
 * -> param: List of parameters the function accepts. Make sure the parameters match the function signature.
 * -> module: Use CORE or CUSTOM. If you are a Salesforce client or an implementation partner, always use CUSTOM to enable a seamless release upgrade.
 * -> extends: Base class of the LO, BO, and LU objects that this function belongs to.
 * -> maxRuntime: Maximum time this function is allowed to run, takes integer value in ms. If the max time is exceeded, error is logged.
 * -> returns: Type and variable name in which the return value is stored.
 * @function getCameraSettings
 * @this LoCallAttachments
 * @kind TODO_ADD_BUSINESS_OBJECT_TYPE
 * @async
 * @namespace CORE
 * @param {String} settingsType
 * @returns cameraSettings
 */
function getCameraSettings(settingsType){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    var cameraSettings = {};

if (settingsType === "picture") {

  //validation code in the toggle will be like "320-240-80" 
  var user = ApplicationContext.get('user');
  var arrUserPictureQuality = user.getBoUserSettings().getPictureQualityValues().split("-");
  var targetWidth = parseInt(arrUserPictureQuality[0], 10);
  var targetHeight = parseInt(arrUserPictureQuality[1], 10);
  var quality = parseInt(arrUserPictureQuality[2], 10);
  
  var MAX_TARGET_WIDTH = 2048;
  var MAX_TARGET_HEIGHT = 1536;
  var MAX_QUALITY = 90;

  cameraSettings.targetWidth = targetWidth > MAX_TARGET_WIDTH ? MAX_TARGET_WIDTH : targetWidth;
  cameraSettings.targetHeight = targetHeight > MAX_TARGET_HEIGHT ? MAX_TARGET_HEIGHT : targetHeight;
  cameraSettings.quality = quality > MAX_QUALITY ? MAX_QUALITY : quality;
  cameraSettings.encodingType = Utils.isSfBackend() ? 'image/jpeg' : 'jpeg';
  
  if(targetWidth > MAX_TARGET_WIDTH || targetHeight > MAX_TARGET_HEIGHT || quality > MAX_QUALITY) {
    var buttonValues = {};
    buttonValues[Localization.resolve("OK")] = "ok";
    return MessageBox.displayMessage(Localization.resolve("MessageBox_Title_Validation"), Localization.resolve("BoCall_CasClbAdjustPictureDimension"), buttonValues) 
      .then(function (input) {
      return cameraSettings;					
    });
  }

} else if (settingsType === "video") {
  cameraSettings.quality = 40;
  cameraSettings.encodingType = "mp4";
}
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    return cameraSettings;
}