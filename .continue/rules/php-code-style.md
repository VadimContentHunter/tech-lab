---
name: PHP Code Style
globs: ["**/*.php"]
---

# PHP Code Style

## Purpose

This rule defines the required coding style for all PHP source code generated or modified by the AI.

Its purpose is to ensure that all code is consistent, readable, maintainable and follows modern PHP community standards.

Unless explicitly overridden by project-specific requirements or user instructions, all PHP code should follow the principles of PSR-1, PSR-4 and PSR-12.

---

## References

This rule is based on the following PHP-FIG specifications:

- PSR-1 — Basic Coding Standard
  <https://www.php-fig.org/psr/psr-1/>

- PSR-4 — Autoloading Standard
  <https://www.php-fig.org/psr/psr-4/>

- PSR-12 — Extended Coding Style
  <https://www.php-fig.org/psr/psr-12/>

---

## PHP File Structure

Each PHP file should be organized in the following order:

1. Opening PHP tag.
2. `declare(strict_types=1);`
3. Namespace declaration.
4. Import statements.
5. Class, interface, trait, enum or executable code.

Example:

```php
<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

final class UserService
{
}
```

---

## File Organization

- One class, interface, trait or enum per file.
- File names should match the declared type.
- Namespaces should reflect the directory structure.

---

## Strict Types

Every PHP source file should declare strict typing.

```php
declare(strict_types=1);
```

---

## Namespaces

The namespace declaration should appear immediately after `declare(strict_types=1);`.

---

## Import Statements

- Use `use` statements whenever practical.
- Group imports together.
- Remove unused imports.
- Leave one blank line between imports and the following declaration.

---

## Naming Conventions

### Classes

Use PascalCase.

Example:

```text
UserService
PaymentGateway
OrderRepository
```

### Interfaces

Use PascalCase.

Example:

```text
CacheInterface
LoggerInterface
```

### Traits

Use PascalCase.

Example:

```text
LoggableTrait
```

### Enums

Use PascalCase.

Example:

```text
UserStatus
PaymentMethod
```

### Methods

Use camelCase.

Method names should clearly describe an action.

Example:

```text
createUser
calculatePrice
sendNotification
```

### Variables

Use camelCase.

Prefer descriptive names.

Good:

```text
$currentUser
$connectionTimeout
$orderTotal
```

Avoid unclear abbreviations.

### Constants

Use UPPER_SNAKE_CASE.

Example:

```text
DEFAULT_TIMEOUT
MAX_CONNECTIONS
API_VERSION
```

---

## Formatting

### Blank Lines

- Use a single blank line to separate logical sections.
- Avoid multiple consecutive blank lines.

### Whitespace

Use one space:

- after commas;
- around binary operators;
- after language keywords where required.

Avoid trailing whitespace.

### Line Length

Keep lines reasonably short.

Wrap long expressions across multiple lines when readability improves.

---

## Braces

Always use braces.

Opening braces should be placed on the next line.

Example:

```php
if ($condition)
{
    doSomething();
}
```

---

## Parentheses

Do not place unnecessary spaces inside parentheses.

Correct:

```php
if ($value === 1)
```

Incorrect:

```php
if ( $value === 1 )
```

---

## Control Structures

Apply consistent formatting to all control structures, including:

- if
- elseif
- else
- switch
- match
- for
- foreach
- while
- do...while
- try
- catch
- finally

Always use braces, even for single-line bodies.

Preferred:

```php
if ($isValid)
{
    process();
}
```

Avoid:

```php
if ($isValid)
    process();
```

---

## Functions and Methods

- Use descriptive names.
- Declare parameter types whenever possible.
- Declare return types whenever possible.

---

## Parameters

Separate parameters with a comma followed by one space.

Long parameter lists may be split across multiple lines.

---

## Return Types

Declare return types whenever they are known.

Avoid omitting return types unless necessary.

---

## Properties

Always declare visibility explicitly.

Preferred:

```php
private string $name;
```

Avoid:

```php
var $name;
```

---

## Type Declarations

Prefer native PHP type declarations whenever possible.

---

## Nullable Types

Use nullable types only when `null` is a valid value.

Example:

```php
?string
```

---

## Union Types

Use union types only when they accurately describe the allowed values.

Avoid unnecessarily complex type declarations.

---

## Priority

When generating PHP code, follow this priority:

1. Explicit user instructions.
2. This rule.
3. PSR-12.
4. PSR-4.
5. PSR-1.
