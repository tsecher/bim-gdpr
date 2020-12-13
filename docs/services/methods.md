# Service Methods 

Here is the list of available methods of a Service 

## Service Methods

|Name |Detail|Call context|
|-----|------|------------|
|init | Init the element| Called when service is added to the Core object|
|getCookiePatterns | Return the cookie patterns. <br><br>Cookies with an id matching with this pattern will be removed when service will stop. | Called when service stops|
|getLocalStoragePatterns|Return the local storage patterns.<br><br>Local storage with an id matching with this pattern will be removed when<br>when service will stop.| Called when service stops|
|getRelatedScripts|Return the list of scripts path to add.| - Called when service starts: auto load scripts<br>- Called when service stops : auto unlink scripts|
|getRelatedCss|Return the list of css path to add.| - Called when service starts: auto load scripts|
|onEnable|Action when service is enabled.| Called each time the user enables the service|
|onDisable|Action when service is disabled.| Called each time the user disables the service|
|start|Action when service starts| Called when service starts|
|stop|Action when service stops| Called when service stops|
|isMandatory|Return true if service is mandatory| On view initialisation|
|isEnabled|Return true if service is enabled| On view initialisation|
|isDisabled|Return true if service is disabled| On view initialisation|
|isPending|Return true if service is pending| On view initialisation|
|setWeight|Update service weight|int weight||


## LocalizedElementAbstract methods
Service extends LocalisedElementAbstract.


|Name |Detail|Call context|
|-----|------|------------|
|initTranslations|Load translations|Called when service is initialised|
|setDefaultLanguage|Set the default language.||
|getDefaultLanguage|Get the default language.||
|getDefaultTranslations|Return the default translation file list.| Called on initTranslations |
|getTranslations|Return the translation file list||
|setTranslations(<array>fileList)|Set the translation file list||
|addTranslation|Add a translation if user language is different of the default language||
