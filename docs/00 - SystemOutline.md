# System Outline

- [] Create a custom Welcome Page. Welcome Page must contain a Button/s that redirect to a specific page.
- [] Create a custom Authentication Page [ `Register` + `Login`]
- [] Create a different Dashboard Page for a specific user role.
- [] Create a Page Layout that can wrap a rendered page. `Authentication Layout` for `Login, and Register Page`, and `App Layout` for `Dashboard Page` according to a specific role
- [] Create a Navigation Menu inside the `App Layout` that shows in any page that is rendered. The Navigation Menu that is found in `Admin Dashboard Page` should be different from the user navigation menu
- [] Create a Separate page for Task Log, and Todo List. While having a different page the Navigation Menu shouldn't be removed from the rendered page.


# Routing 
- [] Use the latest laravel wayfinder routing, in this app it is already integrated.

```php
Example Usage:

GET Method:
router.get(routeName());

POST Method:
router.post(routeName());

Passing Parameters:
router.method(routeName(parameters));

Question: How do you know the `routeName`?
- In your route file ex. 'web.php'. There you will see an example code of Route::method('/', [ControllerName::class])->name(routeName).

- There will be an instances that you will create a route that has dot notation, it look like this. Route::method('/'. [ControllerName::class])->name(routeName.dotNotationName).
# In this instance the `routeName` will become a prefix and the `dotNotationName` will be nested under the `routeName`. If there are question about this, just ask me.)

- Example Usage after this;
GET Method or POST Method:
router.method(prefixRouteName.dotNotationName());
```
