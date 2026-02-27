# Blog Posts Translation Task - COMPLETED

## Status: ✅ COMPLETE

All blog posts have been successfully extracted from `app/content/blogPosts.ts` and moved to translation files.

## Completed Steps:
- [x] 1. Updated messages/en.json with blogPosts translations (English source texts)
- [x] 2. Updated messages/ru.json with Russian blogPosts translations
- [x] 3. Updated app/content/blogPosts.ts to use translation data structure
- [x] 4. Updated app/[locale]/blog/page.tsx to pass translations to blog functions
- [x] 5. Build successful - both English and Russian versions render correctly

## Blog Posts Translated:
1. ✅ ai-governance-baseline-for-enterprise-committees
2. ✅ governed-rag-rollout-checklist
3. ✅ audit-brief-what-security-teams-need
4. ✅ century-release-citations-iam-updates

## Technical Changes:
- Added `blogPosts` section to both `messages/en.json` and `messages/ru.json`
- Refactored `app/content/blogPosts.ts` to accept `BlogPostsData` structure instead of hardcoded strings
- Updated `app/[locale]/blog/page.tsx` to read translations and pass them to `getAllBlogPosts()`
- Used direct JSON file reading approach (fs/readFileSync) to bypass next-intl getTranslations issues during static export

## Verification:
- ✅ English blog posts render correctly
- ✅ Russian blog posts render correctly
- ✅ Build completes successfully
- ✅ Static export generates all blog pages in `out/blog/`
