Placeholders allows you to add html part hidden by default when a service is not enabled.

Placeholders uses the noscript tag to hide element. Each part of the dom that should be hidden 
when a service is disabled will be wrapped into a noscript tag. To indentify part you have to use
the selector `data-bgdpr-hidden-if-enabled` or `data-bgdpr-visible-if-enabled`.
In the dom, before behavior is loaded, you should wrap the part of the dom that should be visible only if service is enabled 
into a noscript tag. This will ensure that no behavior will be triggered before the user make is choice.

For example : 

```html
<!-- This part is only be shwon when the service "service1" is enabled : -->
<noscript>
    <div data-bgdpr-visible-if-enabled="service1">
        Youtube content.
    </div>
</noscript>

<!-- This part is only be shwon when the service "service1" is enabled : -->
<div data-bgdpr-hidden-if-enabled="service1">
    You need to enable "Service 1" to access this content.
    <button data-bgdpr-service="service1">OK</button>
    <button data-bgdpr-view-show>Manage cookies</button>
</div>




```
