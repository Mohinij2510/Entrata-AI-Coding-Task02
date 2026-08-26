# AI Coding Challenge - Prompt Log

## Prompt 1 - Repository Analysis

**Unavailable.** The verbatim repository-analysis prompt used during the challenge is not present in the retained conversation/session context. The available context only records that repository inspection was requested and that the parser implementation, tests, API, and root cause were to be identified. Please provide the original prompt if an exact transcription is required.

## Prompt 2 - Implementation

**Unavailable.** The verbatim implementation prompt used during the challenge is not present in the retained conversation/session context. The available task requirements specified line-by-line JSONL processing, blank-line skipping, continued processing after malformed JSON, structured 1-based errors, preservation of valid records, strict handling of trailing commas, LF/CRLF support, API preservation where possible, and no unrelated changes. Please provide the original prompt if an exact transcription is required.

## Prompt 3 - Test Coverage

> The final task check found two important issues:
>
> 1. Requirement 14 FAIL:
> The existing test file does not contain focused unit tests covering the JSONL parser requirements.
>
> 2. Requirement 15 FAIL:
> `npm test` currently reports 3 passed and 5 failed. The existing tests appear to leave streams open and time out.
>
> Fix these issues without weakening or deleting existing tests.
>
> IMPORTANT:
> - First inspect the existing `test/index.js` and the parser implementation.
> - Understand why the existing tests are timing out.
> - Preserve the original ndjson stream API and behavior.
> - Do NOT remove existing tests just to make the suite pass.
> - Do NOT change unrelated functionality.
> - Do NOT modify `README.md`.
> - Keep `prompt.md` intact except if adding this prompt is required by our prompt log.
>
> Then:
>
> 1. Fix the test setup/teardown issue causing streams to remain open, if the issue is in the test usage rather than the parser.
> 2. Add focused unit tests specifically for this coding challenge.
> 3. Cover:
>    - valid JSON lines
>    - blank lines
>    - whitespace-only lines
>    - invalid JSON
>    - trailing comma
>    - malformed line followed by valid line
>    - multiple malformed lines
>    - correct 1-based line numbers
>    - preservation of records before errors
>    - preservation of records after errors
>    - empty input
>    - LF and CRLF
> 4. Make sure tests properly end/close streams and do not hang.
> 5. Run `npm test`.
> 6. Run the complete test suite again until all tests pass.
> 7. Report the exact final test count.
> 8. Do not modify `README.md`.
>
> Do not stop at saying the tests are conceptually correct. Actually run them and show the final result.

## Prompt 4 - Code Review

**Unavailable.** No verbatim code-review prompt is present in the retained conversation/session context. The requested review areas were correctness, code quality, error handling, maintainability, unnecessary changes, API compatibility, edge cases, and security issues. Please provide the original prompt if an exact transcription is required.

## Prompt 5 - Documentation

The exact documentation-related prompt available in the retained conversation is the current request to create this `prompt.md` file. Its relevant instruction is:

> Create a new file named `prompt.md` in the repository root. Do not modify, rewrite, or replace the existing `README.md`; keep the existing README exactly as it is. Do not fabricate prompt history. The file must contain the actual prompts used during this AI coding challenge and must clearly mark any unavailable exact historical prompt rather than inventing it. It must use the requested six-prompt structure and include an AI-assisted development summary. After creating it, show its contents and confirm that `README.md` was not modified.

This documentation prompt explicitly does not request changes to `README.md`.

## Prompt 6 - Final Validation

**Unavailable.** The verbatim final-validation prompt used during the challenge is not present in the retained conversation/session context. The available requirements called for running the complete test suite, running lint/type-check/build if available, reviewing the final diff, checking for unrelated changes and secrets, verifying the task requirements, and confirming that `prompt.md` exists. Please provide the original prompt if an exact transcription is required.

## AI-Assisted Development Summary

The retained conversation shows that AI assistance was used for repository analysis, implementation work, and test execution. The exact prompts for those phases are unavailable in the retained session context, so their wording is not reconstructed here. No claim is made that separate code-review, documentation, or final-validation prompts were used when their verbatim history is unavailable.
