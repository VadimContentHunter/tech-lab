---
name: PHP Documentation
globs: ["**/*.php"]
---

# PHP Documentation

## Purpose

This rule defines how PHP source code MUST be documented using PHPDoc.

Unless explicitly overridden by user instructions or project-specific requirements, every generated or modified PHPDoc block MUST comply with this specification.

This rule defines documentation only.

It does not define coding style, architecture or business logic.

## References

This rule is based on the following specifications:

- PHPDoc Standard
- PHPDoc Tags
- PSR-5 (draft)
- PSR-19 (draft)

Whenever this rule does not explicitly define a documentation requirement, the AI MUST follow the relevant PHPDoc specification.

## Language

All PHPDoc descriptions MUST be written in Russian.

Descriptions MUST be:

- Clear.
- Concise.
- Technically accurate.

Short descriptions SHOULD consist of a single sentence.

Long descriptions SHOULD explain behavior without repeating the implementation.

## When to Generate PHPDoc

The AI MUST generate PHPDoc only when it provides additional value.

The AI MUST generate PHPDoc for:

- Classes
- Interfaces
- Traits
- Enums

The AI SHOULD generate PHPDoc for:

- Methods
- Functions
- Properties

only when additional documentation is useful.

The AI MUST NOT generate PHPDoc that only repeats information already present in:

- Type declarations
- Class names
- Method names
- Property names
- Parameter names

When no additional information can be provided, the AI MUST omit the PHPDoc block.

## General Rules

Documentation MUST always describe the current implementation.

Whenever documented code changes, the AI MUST update the corresponding PHPDoc.

Outdated documentation MUST be removed.

Documentation MUST describe intent rather than implementation.

The AI MUST NOT describe code line by line.

The AI MUST NOT generate empty PHPDoc blocks.

Forbidden:

```php
/**
 *
 */
```

## PHPDoc Structure

A PHPDoc block MAY contain:

- Summary
- Description
- Tags

The summary SHOULD briefly describe the purpose of the documented element.

The description SHOULD only be included when additional explanation is necessary.

Tags MUST only be included when they provide information that cannot be expressed using native PHP syntax.

The AI MUST NOT generate unnecessary tags.

## Class Documentation

Every generated or modified class, interface, trait and enum MUST contain a PHPDoc block.

The summary MUST describe the responsibility of the type.

The summary MUST explain:

- What the type is responsible for.
- Why it exists.
- When it should be used, if this is not obvious.

The AI MUST NOT simply repeat the type name.

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

## Method Documentation

The AI SHOULD generate PHPDoc for methods only when it provides additional information.

Method documentation SHOULD describe:

- The purpose of the method.
- Non-obvious behavior.
- Side effects.
- Business rules.
- Performance considerations, when relevant.

The AI MUST NOT describe implementation details line by line.

The AI MUST NOT generate documentation that simply repeats the method name.

Good:

```php
/**
 * Создает конфигурацию клиента и сохраняет её на диске.
 */
```

Avoid:

```php
/**
 * Создает клиента.
 */
```

## @param

The AI MUST generate a `@param` tag only when additional information cannot be inferred from:

- The parameter name.
- Native PHP type declarations.
- The method signature.

The AI MUST NOT duplicate native type information.

The AI SHOULD generate `@param` when:

- The parameter has business meaning.
- The parameter accepts specific states.
- The parameter has format restrictions.
- The parameter contains an array or collection.
- The parameter requires additional usage information.

Good:

```php
/**
 * @param bool $force
 *     True — принудительно перезаписывает существующую конфигурацию.
 *     False — сохраняет существующую конфигурацию.
 */
```

Good:

```php
/**
 * @param array<int, Client> $clients
 *     Список клиентов для регистрации на сервере.
 */
```

Avoid:

```php
/**
 * @param string $username
 */
```

Avoid:

```php
/**
 * @param int $id
 */
```

Avoid:

```php
/**
 * @param string $username Имя пользователя.
 */
```

## Arrays

Whenever an array is documented, the AI MUST describe:

- Key type.
- Value type.
- Array contents.

Generic notation SHOULD be used.

Good:

```php
@param array<int, Client> $clients
```

Good:

```php
@return array<string, ConnectionInfo>
```

Deeply nested generic declarations SHOULD be simplified.

Preferred:

```php
array<string, array<int, mixed>>
```

The AI SHOULD avoid generic declarations that are difficult to read.

## @return

The AI MUST generate a `@return` tag only when it provides additional information.

The AI MUST NOT generate redundant `@return` tags.

Good:

```php
@return User
```

only when additional explanation is required.

The AI SHOULD document:

- Boolean values.
- State values.
- Arrays.
- Collections.
- Values with non-obvious semantics.

The AI SHOULD NOT generate:

```php
@return void
```

when the native PHP return type already declares `void`.

## @throws

The AI MUST generate a `@throws` tag only for exceptions that may propagate to the caller.

The AI MUST NOT document exceptions that are fully handled inside the method.

Each `@throws` tag SHOULD briefly explain under which condition the exception is thrown.

Example:

```php
/**
 * @throws RuntimeException Если не удалось сохранить конфигурацию.
 */
```

## @var

The AI MUST generate `@var` only when native PHP types cannot fully describe the value.

Typical cases include:

- Generic arrays.
- Collections.
- Complex iterable types.

The AI MUST NOT generate redundant `@var` annotations.

## @property

The AI SHOULD generate `@property` only for magic properties that cannot be expressed using native PHP syntax.

The AI MUST NOT generate `@property` for regular class properties.

Example:

```php
/**
 * @property string $name
 * @property int $id
 */
```

## @method

The AI SHOULD generate `@method` only for dynamically provided methods that are unavailable through native PHP declarations.

The AI MUST NOT generate `@method` for methods that are explicitly declared in the class.

Example:

```php
/**
 * @method User find(int $id)
 * @method User|null first()
 */
```

## @inheritDoc

When overriding a documented method without changing its behavior, the AI SHOULD use:

```php
/**
 * {@inheritDoc}
 */
```

instead of duplicating the original documentation.

When the overridden implementation changes behavior, the AI MUST provide new PHPDoc.

## Boolean Values

Whenever a parameter, property or return value represents a boolean, the AI SHOULD document what each state means when it cannot be inferred directly from the code.

Good:

```php
/**
 * @param bool $force
 *     True — принудительно перезаписывает существующую конфигурацию.
 *     False — сохраняет существующую конфигурацию.
 */
```

The same rule applies to `@return bool`.

The AI MUST NOT document obvious boolean values whose meaning is already clear from the parameter name.

## State Values

Whenever an integer or string represents a predefined set of states, the AI SHOULD document every possible value.

Example:

```php
/**
 * @return int
 *
 * 0 — отключено.
 * 1 — подключение.
 * 2 — подключено.
 * 3 — ошибка.
 */
```

The same rule applies to parameters and properties representing state values.

## Properties

The AI SHOULD generate PHPDoc for properties only when additional information is required.

Property PHPDoc SHOULD be generated when:

- Generic array types are required.
- Collection element types must be described.
- The property represents a state.
- The property has non-obvious semantics.

The AI MUST NOT generate PHPDoc for properties whose purpose is already obvious from their name and native type.

Good:

```php
private string $username;
```

No PHPDoc is required.

## Inline Comments

The AI MUST avoid inline comments whenever the code is self-explanatory.

Inline comments SHOULD only explain:

- Complex algorithms.
- Non-obvious business rules.
- External API limitations.
- Performance optimizations.
- Workarounds.

The AI MUST NOT generate comments that merely describe the next line of code.

Avoid:

```php
// Create user.
$user = new User();
```

## Examples

The AI SHOULD include examples only when they significantly improve understanding.

The AI MUST NOT generate examples for trivial methods, properties or classes.

## Synchronization

Whenever documented code is modified, the AI MUST update the corresponding PHPDoc as part of the same change.

The AI MUST:

- Update summaries.
- Update descriptions.
- Update tags.
- Remove obsolete documentation.

Documentation MUST always describe the current implementation.

## Redundant Documentation

The AI MUST NOT generate documentation that only repeats information already present in:

- Class names.
- Method names.
- Property names.
- Parameter names.
- Native PHP type declarations.

Good documentation explains intent.

Bad documentation repeats syntax.

## PHPDoc Formatting

Each summary MUST begin with a capital letter.

Short summaries SHOULD NOT end with a period.

Descriptions SHOULD use complete sentences.

Tags SHOULD be grouped after the description.

The AI MUST preserve consistent formatting throughout the file.

## Priority

When generating or modifying PHP documentation, the AI MUST follow this priority order:

1. Explicit user instructions.
2. Project-specific documentation standards.
3. This rule.
4. PHPDoc specifications.
5. PHPDoc tag recommendations.

A higher-priority rule MUST override a lower-priority rule.
