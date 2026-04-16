import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BLOG_SECTION_SNIPPETS } from "../../admin/blogReusableSections";
import { buildCustomBlockRegistrationScript } from "../../admin/gutenbergCustomBlocks";
import { slugify } from "../../admin/contracts";
import BlogFaqEditor from "./BlogFaqEditor";
import BlogRelationsPanel from "./BlogRelationsPanel";
import BlogTemplatePicker from "./BlogTemplatePicker";
import MediaLibraryPicker from "./MediaLibraryPicker";
import MediaDropzone from "./MediaDropzone";

const GUTENBERG_CHANNEL = "medical-blog-editor";
const GUTENBERG_REACT_URL = "/gutenberg/react.production.min.js";
const GUTENBERG_REACT_DOM_URL = "/gutenberg/react-dom.production.min.js";

function serializeForScript(value) {
  return JSON.stringify(value ?? "")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

function buildEditorDoc({ title, contentHtml }) {
  const initialTitle = serializeForScript(title);
  const initialContent = serializeForScript(contentHtml);
  const customBlocks = buildCustomBlockRegistrationScript();

  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script crossorigin src="${GUTENBERG_REACT_URL}"></script>
    <script crossorigin src="${GUTENBERG_REACT_DOM_URL}"></script>
    <script src="/gutenberg/isolated-block-editor.js"></script>
    <link rel="stylesheet" href="/gutenberg/core.css" />
    <link rel="stylesheet" href="/gutenberg/isolated-block-editor.css" />
    <style>
      html, body {
        margin: 0;
        min-height: 100%;
        background: #f7f8fc;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .editor-shell {
        min-height: 100vh;
        background: #f7f8fc;
      }

      .title-wrap {
        max-width: 900px;
        margin: 0 auto;
        padding: 34px 48px 10px;
      }

      .title-input {
        width: 100%;
        border: 0;
        outline: none;
        background: transparent;
        color: #7b789d;
        font-size: 4rem;
        line-height: 1.02;
        letter-spacing: -0.04em;
        font-weight: 700;
      }

      .title-input::placeholder {
        color: #7b789d;
      }

      .textarea-host {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 48px 64px;
      }

      textarea {
        width: 100%;
        min-height: 500px;
      }

      .editor {
        min-height: 720px;
      }

      .wp-block-medical-notice,
      .wp-block-medical-cta,
      .wp-block-medical-college-highlight,
      .wp-block-medical-faq {
        border: 1px solid #dbe3ef;
        border-radius: 14px;
        padding: 16px 18px;
        background: #fff;
      }

      .wp-block-medical-notice.is-warning {
        background: #fff7e8;
      }

      .wp-block-medical-notice.is-success {
        background: #eef9f1;
      }

      .wp-block-medical-cta {
        background: linear-gradient(135deg, #f7fbff 0%, #eef5ff 100%);
      }

      .wp-block-medical-cta a,
      .wp-block-medical-college-highlight a {
        display: inline-block;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="editor-shell">
      <div class="title-wrap">
        <input id="editor-title" class="title-input" type="text" placeholder="Add title" />
      </div>
      <div class="textarea-host">
        <textarea id="editor-textarea"></textarea>
      </div>
    </div>

    <script>
      ${customBlocks}

      const channel = "${GUTENBERG_CHANNEL}";
      const initialTitle = ${initialTitle};
      const initialContent = ${initialContent};
      const titleInput = document.getElementById("editor-title");
      const textarea = document.getElementById("editor-textarea");

      titleInput.value = initialTitle;
      textarea.value = initialContent || "<!-- wp:paragraph --><p></p><!-- /wp:paragraph -->";

      let lastValue = textarea.value;
      let lastTitle = titleInput.value;

      function emit(type, payload) {
        window.parent.postMessage({ channel, type, payload }, "*");
      }

      titleInput.addEventListener("input", () => {
        if (titleInput.value !== lastTitle) {
          lastTitle = titleInput.value;
          emit("title-change", titleInput.value);
        }
      });

      window.wp.attachEditor(textarea, {
        iso: {
          allowApi: false,
          persistenceKey: null,
          preferencesKey: "medical-college-gutenberg-preferences",
          toolbar: {
            navigation: false,
            undo: true,
            documentInspector: "Block"
          },
          sidebar: {
            inserter: false,
            inspector: true
          },
          moreMenu: {
            editor: false,
            fullscreen: false,
            preview: false,
            topToolbar: true
          },
          blocks: {
            allowBlocks: [
              "core/paragraph",
              "core/heading",
              "core/list",
              "core/quote",
              "core/image",
              "core/table",
              "core/separator",
              "core/embed",
              "medical/notice",
              "medical/cta",
              "medical/college-highlight",
              "medical/faq"
            ],
            disallowBlocks: []
          }
        }
      });

      emit("ready", { ok: true });

      setInterval(() => {
        if (textarea.value !== lastValue) {
          lastValue = textarea.value;
          emit("content-change", textarea.value);
        }
      }, 300);
    </script>
  </body>
</html>`;
}

function GutenbergBlogEditor({
  editorKey,
  blogDraft,
  setBlogDraft,
  onBack,
  onSave,
  onResetDraft,
  onRestoreVersion,
  onUploadMedia,
  onApplyTemplate,
  onAppendSnippet,
  autoSaveState,
  editorLockWarning,
  blogVersionHistory,
  mediaItems,
  relatedBlogs
}) {
  const iframeRef = useRef(null);
  const [editorReady, setEditorReady] = useState(false);
  const [editorError, setEditorError] = useState("");
  const readingTime = useMemo(() => {
    const source = `${blogDraft.contentHtml || ""} ${blogDraft.excerpt || ""}`
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return Math.max(1, Math.ceil((source ? source.split(" ").filter(Boolean).length : 0) / 200));
  }, [blogDraft.contentHtml, blogDraft.excerpt]);

  const editorDoc = useMemo(
    () => buildEditorDoc({ title: blogDraft.title, contentHtml: blogDraft.contentHtml }),
    [editorKey]
  );

  useEffect(() => {
    function handleMessage(event) {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.channel !== GUTENBERG_CHANNEL) return;

      if (event.data.type === "ready") {
        setEditorReady(true);
        setEditorError("");
      }

      if (event.data.type === "title-change") {
        const nextTitle = String(event.data.payload || "");
        setBlogDraft((old) => ({
          ...old,
          title: nextTitle,
          slug: old.slug || slugify(nextTitle)
        }));
      }

      if (event.data.type === "content-change") {
        setBlogDraft((old) => ({ ...old, contentHtml: String(event.data.payload || "") }));
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setBlogDraft]);

  useEffect(() => {
    setEditorReady(false);
    setEditorError("");
  }, [editorKey]);

  return (
    <div className="admin-gutenberg-standalone">
      <header className="admin-gutenberg-shellbar">
        <div className="admin-gutenberg-shellbar-left">
          <button type="button" className="admin-gutenberg-toolbar-button" onClick={onBack}>
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="admin-gutenberg-toolbar-state">
            {autoSaveState.status === "restored" ? "Draft restored" : autoSaveState.status === "saved" ? "Autosaved" : "Draft"}
          </span>
        </div>

        <div className="admin-gutenberg-shellbar-right">
          <button type="button" className="admin-gutenberg-toolbar-link" onClick={onResetDraft}>
            Clear draft
          </button>
          <button type="button" className="admin-gutenberg-toolbar-primary" onClick={onSave}>
            <Save size={15} />
            Publish
          </button>
        </div>
      </header>

      <div className="admin-gutenberg-workspace">
        <div className="admin-gutenberg-canvas">
          {!editorReady && !editorError ? (
            <div className="admin-gutenberg-loading">
              <p>Loading editor...</p>
            </div>
          ) : null}

          {editorError ? (
            <div className="admin-gutenberg-loading">
              <p>{editorError}</p>
            </div>
          ) : null}

          <iframe
            key={editorKey}
            ref={iframeRef}
            title="Blog editor"
            className="admin-gutenberg-iframe"
            srcDoc={editorDoc}
            onLoad={() => {
              if (!iframeRef.current?.contentDocument) {
                setEditorError("The editor failed to load.");
              }
            }}
          />
        </div>

        <aside className="admin-gutenberg-postpanel">
          <div className="admin-picker-head">
            <strong>Post settings</strong>
            <span>Publishing, SEO, media, schema, and reusable content controls.</span>
          </div>

          <div className="admin-gutenberg-postpanel-grid">
            <div className="admin-editor-sidebar-group">
              <MediaDropzone
                label="Upload featured image"
                onSelect={async ({ name, dataUrl }) => {
                  const mediaItem = await onUploadMedia({
                    label: name,
                    path: dataUrl,
                    alt: blogDraft.title || name
                  });
                  setBlogDraft((old) => ({
                    ...old,
                    image: mediaItem.path,
                    featuredImage: mediaItem
                  }));
                }}
              />
            </div>

            <label className="admin-form-field">
              <span>Slug</span>
              <input value={blogDraft.slug} onChange={(event) => setBlogDraft((old) => ({ ...old, slug: slugify(event.target.value) }))} />
            </label>

            <label className="admin-form-field">
              <span>Status</span>
              <select value={blogDraft.status} onChange={(event) => setBlogDraft((old) => ({ ...old, status: event.target.value }))}>
                <option value="draft">draft</option>
                <option value="published">published</option>
                <option value="scheduled">scheduled</option>
              </select>
            </label>

            <label className="admin-form-field">
              <span>Publish date</span>
              <input value={blogDraft.date} onChange={(event) => setBlogDraft((old) => ({ ...old, date: event.target.value }))} />
            </label>

            <label className="admin-form-field">
              <span>Tag</span>
              <input value={blogDraft.tag} onChange={(event) => setBlogDraft((old) => ({ ...old, tag: event.target.value }))} />
            </label>

            <label className="admin-form-field">
              <span>Author</span>
              <input value={blogDraft.author} onChange={(event) => setBlogDraft((old) => ({ ...old, author: event.target.value }))} />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>Meta</span>
              <input value={blogDraft.meta} onChange={(event) => setBlogDraft((old) => ({ ...old, meta: event.target.value }))} />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>Canonical URL</span>
              <input value={blogDraft.canonicalUrl} onChange={(event) => setBlogDraft((old) => ({ ...old, canonicalUrl: event.target.value }))} />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>Excerpt</span>
              <textarea rows="3" value={blogDraft.excerpt} onChange={(event) => setBlogDraft((old) => ({ ...old, excerpt: event.target.value }))} />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>Takeaways</span>
              <textarea rows="4" value={blogDraft.takeawaysText} onChange={(event) => setBlogDraft((old) => ({ ...old, takeawaysText: event.target.value }))} />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>Categories</span>
              <input value={blogDraft.categoriesText} onChange={(event) => setBlogDraft((old) => ({ ...old, categoriesText: event.target.value }))} />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>Tags</span>
              <input value={blogDraft.tagsText} onChange={(event) => setBlogDraft((old) => ({ ...old, tagsText: event.target.value }))} />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>SEO title</span>
              <input value={blogDraft.seoTitle} onChange={(event) => setBlogDraft((old) => ({ ...old, seoTitle: event.target.value }))} />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>SEO description</span>
              <textarea rows="3" value={blogDraft.seoDescription} onChange={(event) => setBlogDraft((old) => ({ ...old, seoDescription: event.target.value }))} />
            </label>

            <label className="admin-form-field">
              <span>Image alt</span>
              <input
                value={blogDraft.featuredImage?.alt || ""}
                onChange={(event) =>
                  setBlogDraft((old) => ({
                    ...old,
                    featuredImage: { ...old.featuredImage, alt: event.target.value }
                  }))
                }
              />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>Image caption</span>
              <input
                value={blogDraft.featuredImage?.caption || ""}
                onChange={(event) =>
                  setBlogDraft((old) => ({
                    ...old,
                    featuredImage: { ...old.featuredImage, caption: event.target.value }
                  }))
                }
              />
            </label>

            <label className="admin-form-field">
              <span>Focal X</span>
              <input
                type="range"
                min="0"
                max="100"
                value={blogDraft.featuredImage?.focalX ?? 50}
                onChange={(event) =>
                  setBlogDraft((old) => ({
                    ...old,
                    featuredImage: { ...old.featuredImage, focalX: Number(event.target.value) }
                  }))
                }
              />
            </label>

            <label className="admin-form-field">
              <span>Focal Y</span>
              <input
                type="range"
                min="0"
                max="100"
                value={blogDraft.featuredImage?.focalY ?? 50}
                onChange={(event) =>
                  setBlogDraft((old) => ({
                    ...old,
                    featuredImage: { ...old.featuredImage, focalY: Number(event.target.value) }
                  }))
                }
              />
            </label>
          </div>

          <MediaLibraryPicker
            mediaItems={mediaItems}
            selectedMediaId={blogDraft.featuredImage?.id || ""}
            onUpload={async ({ name, dataUrl }) => {
              const mediaItem = await onUploadMedia({
                label: name,
                path: dataUrl,
                alt: blogDraft.title || name
              });
              setBlogDraft((old) => ({
                ...old,
                image: mediaItem.path,
                featuredImage: mediaItem
              }));
            }}
            onSelect={(mediaItem) =>
              setBlogDraft((old) => ({
                ...old,
                image: mediaItem.path,
                featuredImage: mediaItem
              }))
            }
          />

          <BlogTemplatePicker
            activeTemplateKey={blogDraft.templateKey}
            onApplyTemplate={onApplyTemplate}
          />

          <div className="admin-picker-panel">
            <div className="admin-picker-head">
              <strong>Reusable sections</strong>
              <span>Insert frequently used structures into the article.</span>
            </div>
            <div className="admin-template-list">
              {BLOG_SECTION_SNIPPETS.map((snippet) => (
                <button
                  key={snippet.key}
                  type="button"
                  className="admin-template-item"
                  onClick={() => onAppendSnippet(snippet)}
                >
                  <strong>{snippet.label}</strong>
                </button>
              ))}
            </div>
          </div>

          <BlogFaqEditor
            items={blogDraft.faqItems}
            onChange={(faqItems) => setBlogDraft((old) => ({ ...old, faqItems }))}
          />

          <BlogRelationsPanel
            blogs={relatedBlogs}
            selectedIds={blogDraft.relatedBlogIds}
            onChange={(relatedBlogIds) => setBlogDraft((old) => ({ ...old, relatedBlogIds }))}
          />

          <div className="admin-picker-panel">
            <div className="admin-picker-head">
              <strong>CTA panel</strong>
              <span>Optional call-to-action below the article.</span>
            </div>
            <label className="admin-form-field admin-form-field-wide">
              <span>CTA title</span>
              <input value={blogDraft.cta.title} onChange={(event) => setBlogDraft((old) => ({ ...old, cta: { ...old.cta, title: event.target.value } }))} />
            </label>
            <label className="admin-form-field admin-form-field-wide">
              <span>CTA text</span>
              <textarea rows="3" value={blogDraft.cta.text} onChange={(event) => setBlogDraft((old) => ({ ...old, cta: { ...old.cta, text: event.target.value } }))} />
            </label>
            <label className="admin-form-field">
              <span>Button label</span>
              <input value={blogDraft.cta.buttonLabel} onChange={(event) => setBlogDraft((old) => ({ ...old, cta: { ...old.cta, buttonLabel: event.target.value } }))} />
            </label>
            <label className="admin-form-field">
              <span>Button URL</span>
              <input value={blogDraft.cta.buttonUrl} onChange={(event) => setBlogDraft((old) => ({ ...old, cta: { ...old.cta, buttonUrl: event.target.value } }))} />
            </label>
          </div>

          {editorLockWarning ? <p className="admin-media-dropzone-error">{editorLockWarning}</p> : null}

          <div className="admin-editor-sidebar-meta">
            <p>
              Last autosave
              {autoSaveState.savedAt ? `: ${new Date(autoSaveState.savedAt).toLocaleString()}` : ": not yet"}
            </p>
            <p>Reading time: {readingTime} min read</p>
          </div>

          {blogVersionHistory.length ? (
            <div className="admin-version-list">
              {blogVersionHistory.map((version) => (
                <article key={version.id} className="admin-version-item">
                  <div>
                    <strong>{new Date(version.savedAt).toLocaleString()}</strong>
                    <p>{version.source}</p>
                  </div>
                  <button type="button" className="admin-inline-link" onClick={() => onRestoreVersion(version.blog)}>
                    Restore
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="admin-block-note">Version history starts after the first save.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default GutenbergBlogEditor;
