/**
 * Скрипт для проверки формата сообщения коммита.
 *
 * Формат сообщения коммита должен соответствовать одному из следующих типов:
 *
 * <тип>(<область>): <описание>
 *
 * Типы коммитов, которые разрешены:
 * - fix: Исправление ошибки
 * - feat: Новая функциональность
 * - docs: Изменения в документации
 * - style: Изменения в стиле (например, форматирование, пробелы)
 * - refactor: Рефакторинг (изменения, не влияющие на функциональность)
 * - test: Добавление или изменение тестов
 * - chore: Рутинные задачи (например, обновление зависимостей)
 *
 * Регулярное выражение для проверки формата коммита:
 * ^(fix|feat|docs|style|refactor|test|chore)\s*(\([A-Za-z0-9\-]+\))?\s*:\s[A-Za-z].*
 * - Тип (например, feat, fix) обязателен.
 * - Область (например, api-0) необязательна, но если присутствует, она должна быть
 *   в круглых скобках и может содержать латинские буквы в верхнем и нижнем регистре,
 *   цифры и дефисы.
 *
 * Примеры:
 * - feat(api-0): Add new user endpoint
 * - feat(API-0): Add new user endpoint
 * - feat(Api-0): Add new user endpoint
 * - fix(auth): Fix login bug
 * - fix(API-AUTH): Fix login bug
 * - fix: Fix validation error in data processing
 * - feat: Add new API for user management
 * - docs: Update documentation for installation instructions
 * - style: Format code, add spaces for better readability
 * - refactor: Refactor function to improve code clarity
 * - test: Add unit tests for the new API
 * - chore: Update project dependencies
 *
 * Скрипт считывает последний коммит и проверяет его формат с помощью регулярного выражения.
 * Если формат неверен, скрипт завершится с ошибкой и сообщением.
 */

import fs from 'fs';
import { execSync } from 'child_process';

// Получаем путь к файлу с сообщением коммита
function getCommitMessageFile() {
    try {
        return execSync('git rev-parse --git-path COMMIT_EDITMSG')
            .toString()
            .trim();
    } catch {
        console.error('Git repository not found.');
        process.exit(1);
    }
}

// Проверяем формат сообщения коммита
function validateCommitMessage(commitMsgFile) {
    // Проверяем существование файла с сообщением коммита
    if (!fs.existsSync(commitMsgFile)) {
        console.error(`❌ Commit message file does not exist: ${commitMsgFile}`);
        process.exit(1);
    }

    let commitMessage;

    try {
        // Читаем сообщение коммита
        commitMessage = fs.readFileSync(commitMsgFile, 'utf8').trim();
    } catch (error) {
        console.error(`❌ Cannot read commit message: ${commitMsgFile}`);
        console.error(error.message);
        process.exit(1);
    }

    console.log('Commit message:\n' + commitMessage);

    // Регулярное выражение для проверки формата
    const regex = /^(fix|feat|docs|style|refactor|test|chore)\s*(\([A-Za-z0-9\-]+\))?\s*:\s[A-Za-z].*/;

    if (!regex.test(commitMessage)) {
        console.error('❌ Commit message format is invalid.');
        console.error('Example: feat: Add new user endpoint or feat(api-0): Add new user endpoint');
        process.exit(1);
    }

    console.log('✅ Commit message format is valid.');
}

const commitMsgFile = getCommitMessageFile();

validateCommitMessage(commitMsgFile);

