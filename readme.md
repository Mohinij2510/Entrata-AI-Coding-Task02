# JSON Lines Parser Bug Fix

## Overview

This project fixes a JSONL (JSON Lines) parser to correctly handle blank lines, malformed JSON, and trailing commas without stopping the entire parsing process.

## Problem

Previously, an invalid JSON line could cause the parser to throw an error and stop processing. This could result in valid records being lost and later lines not being processed.

## Solution

The parser now:

- Processes input line by line.
- Skips blank and whitespace-only lines.
- Parses valid JSON records into`ok`.
- Records malformed JSON in `errors`.
- Reports the original 1-based line number for each error.
- Continues processing after an invalid line.
- Preserves previously and subsequently valid records.
- Treats trailing commas as invalid JSON.
- Supports both LF (`\n`) and CRLF (`\r\n`) line endings.

## Output Format

```json
{
  "ok": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ],
  "errors": [
    {
      "line": 2,
      "message": "Invalid JSON"
    }
  ]
}
