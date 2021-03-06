# DTO generator

## What inspired us?

When it comes to writting clean code, Data Transfer Objects (DTOs) help us separating stuff in a proper way. The problem comes when we need to create as many DTOs as models and this turns into a repetitive and painful job.

This is why I've created this extension, which allows us to generate _fromJson_, _toJson_, _fromDomain_ and _toDomain_ methods the fastest way, without writting repetitive code over and over again.

![syntax](assets/demonstration.gif)

## Usage

This extension works by creating a _template_ class that will help us know what to generate next. The expected structure is as follows:

```dart
class YourClassName{
    final String firstVariable;
    final int secondVariable;
    final CustomType thirdVariable;
}
```

This example allows us to generate the mentioned methods, resulting in the following code:

```dart
class YourClassName {
  const YourClassName._({
    this.firstVariable,
    this.secondVariable,
    this.thirdVariable,
  });
  final String firstVariable;
  final int secondVariable;
  final CustomType thirdVariable;

  static YourClassName fromJson(Map<String, dynamic> json) {
    return YourClassName._(
      firstVariable: json['firstVariable'],
      secondVariable: json['secondVariable'],
      thirdVariable: json['thirdVariable'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'firstVariable': firstVariable,
      'secondVariable': secondVariable,
      'thirdVariable': thirdVariable,
    };
  }

  static YourClassName fromDomain(YourClassName domain) {
    return YourClassName._(
      firstVariable: domain.firstVariable,
      secondVariable: domain.secondVariable,
      thirdVariable: domain.thirdVariable,
    );
  }

  YourClassName toDomain() {
    return YourClassName(
      firstVariable: this.firstVariable,
      secondVariable: this.secondVariable,
      thirdVariable: this.thirdVariable,
    );
  }
}
```

To activate generation you must place the cursor in the class declaration line, and press _cntrl (cmd) + ._

If you want to add some customization to the resulting class, we provide you 5 handy annotations:

_fromJson_: Can be used in class properties only. This can be used if you want to provide a method or constructor that you want us to use to wrap the value that comes from the json. Like this:

```dart
class YourClassName {
  @fromJson(customMethod)
  final CustomType thirdVariable;
}

```

this generates (besides of other methods) the _fromJson_ method that will wrap the value returned by the json with _customMethod_:

```dart
static YourClassName fromJson(Map<String, dynamic> json) {
    return YourClassName._(
        thirdVariable: customMethod(json['thirdVariable']),
    );
}
```

_toJson_: works similar to _fromJson_. The difference is that you can use it to wrap the value returned in the _toJson_ method. It will generate from this:

```dart
class YourClassName {
  @toJson(customMethod)
  final CustomType thirdVariable;
}
```

To this:

```dart
Map<String, dynamic> toJson(){
  return {thirdVariable: customMethod(thirdVariable),};
}
```

_toDomain_: this allows us to wrap the returned values for properties in the _toDomain_ method.

```dart
class YourClassName {
  @toDomain(customMethod)
  final CustomType thirdVariable;
}
```

Generates:

```dart
YourClassName toDomain() {
    return YourClassName(
      thirdVariable: customMethod(this.thirdVariable),
    );
}
```

_domainName_: This annotation can be used on either properties or the class itself.
If you use it on the class, this will tell us what the name of the domain class is. For example when you're creating an _UserDto_, you can tell us that the domain name is the _User_ class

```dart
@domainName(User)
class UserDto {
  final String name;
}
```

Will generate

```dart
static UserDto fromDomain(User domain){
  return UserDto._(
    name:domain.name,
  );
}
User toDomain(){
  return User(name:this.name,);
}
```

Note that, thanks to this annotation, we realized that you wanted to use a class calles _User_ as domain class

The other case for using this annotation is on properties. This will tell us what the name of the corresponding domain property is. For example:

```dart
@domainName(User)
class UserDto {
  final String name;
}

class User {
  User(this.firstName);
  final String firstName;
}
```

In this case, the _User_ name is called a different way (firstName) than the way we called it in out DTO (name). No worries, use the _@domainName_ annotation on the DTO property and you're done:

```dart
@domainName(User)
class UserDto {
  @domainName(firstName)
  final String name;
}
```

This generates:

```dart
static UserDto fromDomain(User domain){
  return UserDto._(
    name:domain.firstName,
  );
}
User toDomain(){
  return User(firstName:this.name,);
}
```

_jsonName_: this was thought only to be used as a property annotation. It allows you to tell us when the name of the json property is different than the class' property name.

```dart
class UserDto {
  @jsonName(jsonNameDifferent)
  final String name;
  final String surname;
}
```

This will generate:

```dart

static UserDto fromJson(Map<String, dynamic> json){
  return UserDto._(name:json['jsonNameDifferent'], surname:json['surname'],);
}
Map<String, dynamic> toJson(){
  return {'jsonNameDifferent': name, 'surname': surname,};
}
```

You can use these annotations together by writting them on the property/class you want to apply them to.

```dart
import 'package:streams/domain.dart';
import 'package:streams/user.dart';
@domainName(User)
class UserDto {
  @domainName(firstName)
  @fromJson(somemethodthatdoesntmatter)
  @jsonName(jsonNameDifferent)
  final String name;
  @toJson(somemethodthatdoesntmatter)
  @toDomain(Surname)
  final String surname;
}
```

Let's describe this:

The DTO's domain class name is User
_name_ property is called _firstName_ in the domain class (User)

_name_ property will use _somemethodthatdoesntmatter_ for being converted from json to String

_name_ property is called _jsonNameDifferent_ in the json that's comming

_surname_ will use _somemethodthatdoesntmatter_ to be converted from String to json.

_surname_ will be wrapped in an instance of _Surname_ class when transformed into domain.

Generating this will result on:

```dart
import 'package:streams/domain.dart';
import 'package:streams/user.dart';

class UserDto {
  const UserDto._({
    this.name,
    this.surname,
  });
  final String name;
  final String surname;

  static UserDto fromJson(Map<String, dynamic> json) {
    return UserDto._(
      name: somemethodthatdoesntmatter(json['jsonNameDifferent']),
      surname: json['surname'],
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'jsonNameDifferent': name,
      surname: somemethodthatdoesntmatter(surname),
    };
  }
  static UserDto fromDomain(User domain) {
    return UserDto._(
      name: domain.firstName,
      surname: domain.surname,
    );
  }
  User toDomain() {
    return User(
      firstName: this.name,
      surname: Surname(this.surname),
    );
  }
}

```

# Support

I highly encourage you to create a pull request for this extension if you want to improve it. Your help is always welcome. Also, you can open issues if there's any trouble.
