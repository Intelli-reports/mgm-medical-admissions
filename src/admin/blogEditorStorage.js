const BLOG_EDITOR_DRAFT_KEY = "medical-college-blog-editor-draft-v1";
const BLOG_EDITOR_LOCK_KEY = "medical-college-blog-editor-lock-v1";

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadBlogEditorDraft() {
  if (!hasStorage()) return null;

  try {
    const raw = window.localStorage.getItem(BLOG_EDITOR_DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveBlogEditorDraft(draft) {
  if (!hasStorage()) return;
  window.localStorage.setItem(BLOG_EDITOR_DRAFT_KEY, JSON.stringify({
    savedAt: new Date().toISOString(),
    draft
  }));
}

export function clearBlogEditorDraft() {
  if (!hasStorage()) return;
  window.localStorage.removeItem(BLOG_EDITOR_DRAFT_KEY);
}

export function createBlogEditorSessionId() {
  return `editor-${Math.random().toString(36).slice(2, 10)}`;
}

export function readBlogEditorLock() {
  if (!hasStorage()) return null;

  try {
    const raw = window.localStorage.getItem(BLOG_EDITOR_LOCK_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function refreshBlogEditorLock(sessionId, articleKey) {
  if (!hasStorage()) return;
  const locks = readBlogEditorLock();
  const articleLocks = locks?.[articleKey] && typeof locks[articleKey] === "object" ? locks[articleKey] : {};
  window.localStorage.setItem(BLOG_EDITOR_LOCK_KEY, JSON.stringify({
    ...locks,
    [articleKey]: {
      ...articleLocks,
      [sessionId]: {
        sessionId,
        articleKey,
        updatedAt: new Date().toISOString()
      }
    }
  }));
}

export function clearBlogEditorLock(sessionId, articleKey) {
  if (!hasStorage()) return;
  const locks = readBlogEditorLock();
  const articleLocks = locks?.[articleKey] && typeof locks[articleKey] === "object" ? locks[articleKey] : {};
  if (articleLocks[sessionId]) {
    delete articleLocks[sessionId];
    if (Object.keys(articleLocks).length) {
      locks[articleKey] = articleLocks;
    } else {
      delete locks[articleKey];
    }
    window.localStorage.setItem(BLOG_EDITOR_LOCK_KEY, JSON.stringify(locks));
  }
}
