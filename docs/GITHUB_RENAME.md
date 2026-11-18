# Rename repository & local folder

**Target GitHub name:** `CodeToCareer` (`https://github.com/suncoast-servers/CodeToCareer`)  
**Target local folder:** `c:\Users\Ryan\Dev\GitHub\CodeToCareer`

## 1. GitHub (you — ~30 seconds)

Org policy blocks automated rename from Cursor tokens.

1. Open [Repository settings](https://github.com/suncoast-servers/DataEngineering101/settings).
2. **Repository name** → `CodeToCareer` → **Rename**.

## 2. Local folder (close Cursor first)

The folder is locked while this workspace is open. After closing Cursor:

```powershell
Rename-Item "C:\Users\Ryan\Dev\GitHub\DataEngineering101" "CodeToCareer"
cd C:\Users\Ryan\Dev\GitHub\CodeToCareer
git remote set-url origin https://github.com/suncoast-servers/CodeToCareer.git
git fetch origin
```

Reopen `C:\Users\Ryan\Dev\GitHub\CodeToCareer` in Cursor.

## 3. Verify

```powershell
git remote -v
```

Should show `suncoast-servers/CodeToCareer`.
