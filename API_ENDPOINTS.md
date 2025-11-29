# API Endpoints

Base URL: `http://127.0.0.1:8000/api`

## Categories

- List root categories
  - GET `/categories/roots`
  - Returns top-level categories (id, name, slug, maybe children count)

- Get category by id
  - GET `/categories/{id}`
  - Returns category details and commonly `subcategories` or `children`

- List all categories / tree
  - GET `/categories` or `/categories/tree`
  - Some APIs provide full tree responses

## Hadith lists (by category / subcategory)

- Category hadith list (paginated)
  - GET `/hadeeths/list?category={categoryId}&page={n}`
  - Returns list items (often minimal: id, hadith_number, book, chapter). Many implementations omit translation text here.

- Category direct list variant
  - GET `/categories/{id}/hadeeths`
  - May return similar paginated lists with counts

## Hadith lists (by book / chapter)

- By book & chapter (paginated)
  - GET `/books/{bookId}/chapters/{chapterId}/hadeeths`

- By book (all hadiths)
  - GET `/books/{bookId}/hadeeths` (if implemented)

## Single hadith detail

- Get full hadith by id
  - GET `/hadeeths/one?id={hadithId}` or GET `/hadeeths/{id}`
  - Returns full hadith object: `arabic_text`, `translations` (may be present or empty), `book` and `chapter` metadata

## Hadith translations

- Get translations for a hadith (by id & lang)
  - GET `/hadeeths/{id}/translations/{lang}`
  - Returns translation text(s) for the specified language (e.g., `en`, `vi`)

- Alternate translation fetch
  - GET `/hadeeths/one?id={id}` then inspect `data.translations` (if included)

- By book/number translation (fallback)
  - GET `/hadeeths/translations?book={bookId}&number={hadithNumber}&lang={lang}` (some APIs provide this)

## Search / filter (implementation-specific)

- Search hadiths
  - GET `/hadeeths/search?q=...` (if available)

- List translations for a given language
  - GET `/translations?lang=en` (API-specific)

## Notes & common pitfalls

- List endpoints often return minimal hadith objects and frequently do not include translation texts. If you need translations in lists, the client typically must fetch details per hadith or use a translation-specific endpoint.
- Fetching per-card details across a large list can create many HTTP requests. Mitigations:
  - Lazy-load per-card details using `IntersectionObserver` (only fetch for visible cards).
  - Batch fetch details for the first N visible items using a multi-id endpoint if the API supports it.
  - Request backend changes to include translations in list responses (best performance).
- Returning many hadiths (with translations) in server-side props can exceed Next.js page-data size limits (128 KB). Consider pagination or incremental/static generation.

## Quick example PowerShell commands

- List root categories:
  - `Invoke-RestMethod 'http://127.0.0.1:8000/api/categories/roots'`

- Category hadith list (page 1):
  - `Invoke-RestMethod 'http://127.0.0.1:8000/api/hadeeths/list?category=1&page=1'`

- Full hadith by id:
  - `Invoke-RestMethod 'http://127.0.0.1:8000/api/hadeeths/one?id=1690'`

- Translation for a hadith:
  - `Invoke-RestMethod 'http://127.0.0.1:8000/api/hadeeths/1690/translations/en'`

(You can replace `Invoke-RestMethod` with `curl -s` if preferred.)