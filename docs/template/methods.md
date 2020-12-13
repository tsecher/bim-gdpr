# Template Methods 

Here is the list of available methods of a Template 

## Methods

|Name |Detail|Call context|
|-----|------|------------|
| initTemplate | Init the template | Called when template is added to the Core object  |
| getDefaultCssList | Return the list of default css files urls | Called when the Core object is initialized |
| getCssList | Return the list of css files urls | Called when the Core object is initialized |
| setCssList(<array>cssList) | Update the list of css files urls |  |
| wrapper(<string>content) | Wrap the markup of the view into constant dom part | Called when the view is displayed |
| getNoServiceMarkup | Return the markup of the view when no service is declared  | Called when the view is displayed |
| getViewMarkup(<object>content) | Return the markup of the view. "content" contains the list of isolated markups | Called when the view is displayed |
| getServiceMarkup(<Service>service) | Return the markup of a service | Called when the view is displayed |
| getGroupMarkup(<Group>group, <array>serviceMarkupList) | Return the markup of a group. "servicelMarkupList" is an array of the service markup | Called when the view is displayed |
| html(<string>id, <object>data) | Return the translated string | Called when the view is displayed |
| getUngroupedTitle | Return the title of the ungrouped service part. | Called when the view is displayed  |
| getShowPromise | Return a promise that can temporise the addition to the DOM | Called when the view is displayed  |
| getHidePromise | Return a promise that can temporise the removal from the DOM  | Called when the view is displayed  |
| getParentElement | Return the parent element where the view should be added | Called when the view is displayed  |





## LocalizedElementAbstract methods
Template extends LocalisedElementAbstract.


|Name |Detail|Call context|
|-----|------|------------|
|initTranslations|Load translations|Called when service is initialised|
|setDefaultLanguage|Set the default language.||
|getDefaultLanguage|Get the default language.||
|getDefaultTranslations|Return the default translation file list.| Called on initTranslations |
|getTranslations|Return the translation file list||
|setTranslations(<array>fileList)|Set the translation file list||
|addTranslation|Add a translation if user language is different of the default language||
