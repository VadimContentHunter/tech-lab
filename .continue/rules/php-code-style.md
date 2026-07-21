---
globs: ["**/*.php"]
---

# PHP Code Style

## Purpose

This rule defines the required coding style for all PHP source code generated or modified by the AI.

Unless explicitly overridden by user instructions or project-specific requirements, every generated or modified PHP file MUST comply with this specification.

The AI MUST generate PHP code that is:

- Consistent
- Readable
- Maintainable
- Predictable
- Compatible with modern PHP standards

This rule defines coding style only. It does not define architecture, design patterns or business logic.

## References

This rule is based on the following PHP-FIG specifications:

- PSR-1 — Basic Coding Standard
- PSR-4 — Autoloading Standard
- PSR-12 — Extended Coding Style

Whenever this rule does not explicitly define a style requirement, the AI MUST follow the relevant PSR specification.

## PHP File Structure

Every generated PHP file MUST follow the structure below.

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

The AI MUST place `declare(strict_types=1);` immediately after the opening PHP tag.

The AI MUST NOT place executable code before the namespace declaration.

## File Organization

Each PHP file MUST contain exactly one class, interface, trait or enum unless explicitly instructed otherwise.

File names MUST match the declared type.

Namespaces MUST reflect the project directory structure according to PSR-4.

The AI MUST NOT generate multiple unrelated declarations within the same file.

## Files

Every PHP file MUST end with exactly one newline.

The AI MUST NOT generate multiple opening PHP tags within a single file unless explicitly required.

The AI MUST NOT generate a closing PHP tag (`?>`) in files containing only PHP code.

## Strict Types

Every generated PHP source file MUST declare strict typing.

```php
declare(strict_types=1);
```

This declaration MUST appear immediately after the opening PHP tag.

The AI MUST NOT omit `declare(strict_types=1);` unless explicitly instructed by the user.

## Namespaces

The namespace declaration MUST immediately follow `declare(strict_types=1);`.

Namespaces MUST comply with PSR-4.

The AI MUST:

- Generate valid namespaces.
- Match the project directory structure.
- Use exactly one namespace declaration per file.

The AI MUST NOT:

- Omit the namespace declaration.
- Generate multiple namespace declarations within a single file.
- Place import statements before the namespace declaration.

## Import Statements

The AI MUST use `use` statements for external classes whenever appropriate.

Import statements MUST be grouped together.

Unused imports MUST be removed.

Duplicate imports MUST NEVER be generated.

A single blank line MUST separate the import block from the following declaration.

The AI SHOULD sort imports alphabetically unless the existing project follows another convention.

The AI MUST NOT:

- Leave unused imports.
- Generate duplicate imports.
- Use fully-qualified class names when an import statement is appropriate.

## Naming Conventions

The AI MUST use consistent naming conventions throughout the project.

Identifiers MUST be descriptive and clearly communicate their purpose.

The AI SHOULD avoid abbreviations unless they are widely recognized within the PHP ecosystem or already exist in the project.

### Classes

Class names MUST use PascalCase.

Examples:

```text
UserService
PaymentGateway
OrderRepository
```

### Interfaces

Interface names MUST use PascalCase.

The AI SHOULD preserve the project's existing naming convention for interfaces.

Examples:

```text
CacheInterface
LoggerInterface
```

### Traits

Trait names MUST use PascalCase.

Examples:

```text
LoggableTrait
SoftDeletes
```

### Enums

Enum names MUST use PascalCase.

Examples:

```text
UserStatus
PaymentMethod
```

### Methods

Method names MUST use camelCase.

Method names SHOULD clearly describe an action.

Examples:

```text
createUser
calculatePrice
sendNotification
```

The AI MUST NOT use vague or ambiguous method names unless they already exist in the project.

### Variables

Variable names MUST use camelCase.

Variable names SHOULD clearly describe their purpose.

Good examples:

```text
$currentUser
$connectionTimeout
$orderTotal
```

Avoid unclear abbreviations such as:

```text
$tmp
$obj
$val
$data1
```

unless their meaning is obvious from the surrounding code.

### Constants

Constant names MUST use UPPER_SNAKE_CASE.

Examples:

```text
DEFAULT_TIMEOUT
MAX_CONNECTIONS
API_VERSION
```

## Formatting

The AI MUST follow PSR-12 formatting rules.

Formatting MUST remain consistent throughout the entire file.

### Indentation

The AI MUST use four spaces for indentation.

Tabs MUST NOT be used for indentation.

### Blank Lines

The AI MUST:

- Use a single blank line to separate logical sections.
- Separate namespace, imports and declarations with one blank line.
- Keep blank lines meaningful.

The AI MUST NOT:

- Generate multiple consecutive blank lines.
- Insert decorative blank lines.

### Whitespace

The AI MUST:

- Use one space after commas.
- Use one space around binary operators.
- Use one space after language keywords where required.

The AI MUST NOT:

- Leave trailing whitespace.
- Insert unnecessary spaces.
- Align assignments using spaces.

Correct:

```php
$total = $price + $tax;
```

Incorrect:

```php
$total      = $price + $tax;
```

### Line Endings

The AI SHOULD preserve the existing line ending style of the project.

When creating new files, the AI SHOULD use Unix-style line endings (LF).

### Line Length

Lines SHOULD remain reasonably short.

Long expressions SHOULD be wrapped across multiple lines when doing so improves readability.

The AI MUST NOT wrap code unnecessarily.

## Trailing Commas

The AI SHOULD use trailing commas in multiline arrays, function calls, parameter lists and argument lists whenever supported by the target PHP version.

Example:

```php
public function __construct(
    private LoggerInterface $logger,
    private CacheInterface $cache,
) {
}
```

## Braces

The AI MUST follow the brace placement defined by PSR-12.

Opening braces for classes, interfaces, traits, enums and methods MUST appear on the next line.

Example:

```php
final class UserService
{
    public function create(): void
    {
    }
}
```

Opening braces for control structures MUST appear on the same line.

Correct:

```php
if ($condition) {
    doSomething();
}
```

The AI MUST always use braces for control structures, even when the body contains only a single statement.

The AI MUST NOT generate alternative control structure syntax.

Forbidden:

```php
if ($condition):

endif;
```

## Parentheses

The AI MUST NOT place unnecessary whitespace inside parentheses.

Correct:

```php
if ($value === 1)
```

Incorrect:

```php
if ( $value === 1 )
```

This rule applies to:

- Function calls
- Method calls
- Control structures
- Language constructs

## Control Structures

All control structures MUST follow PSR-12.

This includes:

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

The AI MUST:

- Always use braces.
- Keep indentation consistent.
- Format nested control structures according to PSR-12.

Preferred:

```php
if ($isValid) {
    process();
}
```

Forbidden:

```php
if ($isValid)
    process();
```

## Functions and Methods

Function and method names MUST clearly describe their purpose.

The AI MUST:

- Use camelCase for function and method names.
- Declare native parameter types whenever possible.
- Declare native return types whenever possible.
- Preserve the existing parameter order when modifying existing methods.

The AI MUST NOT:

- Change the signature of an existing public method unless explicitly instructed.
- Omit parameter or return types when they can be expressed using native PHP types.

Example:

```php
public function calculateTotal(Order $order): float
{
    // ...
}
```

## Parameters

Parameters MUST be separated by a comma followed by a single space.

Long parameter lists SHOULD be split across multiple lines.

Example:

```php
public function createUser(
    string $name,
    string $email,
    bool $isAdmin,
): User {
}
```

## Return Types

The AI MUST declare native return types whenever PHP allows them.

Return types MUST NOT be omitted without a valid reason.

Correct:

```php
public function getUser(): User
```

```php
public function exists(): bool
```

```php
public function save(): void
```

## Properties

All properties MUST explicitly declare visibility.

Properties SHOULD declare native PHP types whenever possible.

Correct:

```php
private string $name;

protected ?User $user;

public bool $enabled;
```

The AI MUST NOT omit visibility declarations.

## Type Declarations

The AI MUST prefer native PHP type declarations whenever possible.

The AI MUST use the most specific type that accurately represents the value.

The AI MUST NOT replace a specific type with `mixed` unless explicitly required.

Preferred:

```php
string
int
bool
float
array
callable
iterable
User
```

Avoid:

```php
mixed
```

unless the value genuinely cannot be represented by a more specific type.

## Array Syntax

The AI MUST use the short array syntax.

Correct:

```php
$items = [];
```

Forbidden:

```php
$items = array();
```

## Nullable Types

Nullable types MUST only be used when `null` is a valid value.

Correct:

```php
private ?User $user;
```

The AI MUST NOT make a type nullable unless the value may legitimately be `null`.

## Union Types

Union types SHOULD only be used when they accurately represent the allowed values.

Correct:

```php
string|int
```

```php
User|null
```

The AI SHOULD avoid unnecessarily complex union types.

## Priority

When generating or modifying PHP code, the AI MUST follow this priority order:

1. Explicit user instructions.
2. Project-specific conventions.
3. This rule.
4. PSR-12.
5. PSR-4.
6. PSR-1.

A higher-priority rule MUST override a lower-priority rule.
