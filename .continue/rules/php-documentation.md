---
name: PHP Documentation
globs: ["**/*.php"]
---

# PHP Documentation

## Purpose

This rule defines how PHP source code should be documented using PHPDoc.

This rule is mandatory.

Whenever PHP code is generated or modified, the AI must follow every requirement in this document unless the user explicitly instructs otherwise.

The following requirements are mandatory.

Unless explicitly instructed otherwise, all PHPDoc comments should follow these rules.

## Language

- All PHPDoc descriptions must be written in Russian.
- Keep descriptions concise, clear and technically accurate.
- Use complete sentences when describing classes and complex behavior.

## General Rules

- Use PHPDoc instead of regular comments whenever documentation is required.
- Keep documentation synchronized with the implementation.
- Whenever code behavior changes, update the corresponding PHPDoc.
- Whenever a class purpose changes, update the class description as well.
- Remove outdated or misleading documentation.

## Class Documentation

Every class, interface, trait and enum must have a PHPDoc block.

The class description should explain:

- what the class is responsible for;
- why it exists;
- when it should be used.

Do not simply repeat the class name.

Good:

```php
/**
 * Управляет жизненным циклом WireGuard-клиентов и отвечает
 * за генерацию конфигураций подключения.
 */
```

Avoid:

```php
/**
 * Класс WireGuardManager.
 */
```

## Mandatory Class Documentation

Class PHPDoc is mandatory.

Every generated or modified class, interface, trait and enum must contain a PHPDoc block.

This requirement has no exceptions.

## Method Documentation

Add PHPDoc only when it provides useful information.

Describe:

- what the method does;
- important implementation details;
- side effects;
- exceptions;
- non-obvious behavior.

Do not describe implementation line by line.

## Parameters

Generate a `@param` entry only when it provides information that cannot be inferred directly from:

- the parameter name;
- the native PHP type declaration;
- the method signature.

Do not generate `@param` entries that only duplicate information already present in the code.

Omit the `@param` entry entirely when no additional explanation is required.

Generate `@param` when:

- the parameter has business meaning;
- the parameter represents multiple possible states;
- the parameter requires format or value restrictions;
- the parameter is an array and its contents must be described;
- additional behavior or usage needs clarification.

Good:

```php
/**
 * @param bool $force
 *     True — принудительно перезаписывает существующую конфигурацию.
 *     False — сохраняет существующую конфигурацию, если она уже существует.
 */
```

```php
/**
 * @param array<int, Client> $clients Список клиентов для регистрации на сервере.
 */
```

```php
/**
 * @param int $status
 *     0 — отключён.
 *     1 — подключается.
 *     2 — подключён.
 *     3 — ошибка.
 */
```

Avoid:

```php
/**
 * @param string $username
 */
```

```php
/**
 * @param int $id
 */
```

```php
/**
 * @param string $username Имя пользователя.
 */
```

### Arrays

Every array must be documented.

Always describe:

- what the array contains;
- the key type;
- the value type.

Prefer generic notation.

Good:

```php
@param array<int, Client> $clients
```

```php
@return array<string, ConnectionInfo>
```

Nested generics deeper than approximately three levels should be replaced with `mixed` for readability.

Good:

```php
array<string, array<int, mixed>>
```

Avoid deeply nested generic declarations.

## Boolean Values

Whenever a parameter, property or return value is `bool`, always document what each state means.

Example:

```php
@param bool $force

True — принудительно перезаписывает существующую конфигурацию.

False — сохраняет существующую конфигурацию, если она уже существует.
```

The same applies to `@return bool`.

## State Values

Whenever a parameter or return value represents several possible states, document every possible value.

Example:

```php
@return int

0 — отключено.

1 — подключение.

2 — подключено.

3 — переподключение.

4 — ошибка.

5 — ожидание.
```

The same applies to parameters and properties representing state values.

## Properties

Do not document properties whose purpose is already obvious from:

- the property name;
- the declared type.

Good:

```php
private string $username;
```

No PHPDoc is necessary.

Document properties when:

- an array requires generic typing;
- a state requires explanation;
- the property has non-obvious semantics.

## Return Values

Do not describe `@return` when:

- the return type is obvious;
- the method name already clearly explains the result.

Good:

```php
@return User
```

Provide a description when:

- returning bool;
- returning state values;
- returning arrays;
- returning collections;
- returning values with non-obvious semantics.

## Exceptions

Document thrown exceptions using `@throws` whenever applicable.

Describe when the exception is thrown.

## Synchronization

Whenever a class, method or property is added, removed or modified:

- update the corresponding PHPDoc;
- remove obsolete documentation;
- keep the documentation consistent with the implementation.

Documentation must always describe the current behavior of the code.

## Redundant Documentation

Never generate PHPDoc that only repeats information already present in:

- the method name;
- parameter names;
- native PHP type declarations;
- property names.

Every PHPDoc description should provide additional information that cannot be inferred directly from the code.

## Priority

When generating PHP documentation, follow this priority:

1. Explicit user instructions.
2. This rule.
3. Project-specific documentation standards.
4. PHPDoc recommendations.
