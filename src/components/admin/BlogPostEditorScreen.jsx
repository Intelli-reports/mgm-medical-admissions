import GutenbergBlogEditor from "./GutenbergBlogEditor";

function BlogPostEditorScreen({
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
  return (
    <section className="admin-blog-editor-screen">
      <GutenbergBlogEditor
        editorKey={editorKey}
        blogDraft={blogDraft}
        setBlogDraft={setBlogDraft}
        onBack={onBack}
        onSave={onSave}
        onResetDraft={onResetDraft}
        onRestoreVersion={onRestoreVersion}
        onUploadMedia={onUploadMedia}
        onApplyTemplate={onApplyTemplate}
        onAppendSnippet={onAppendSnippet}
        autoSaveState={autoSaveState}
        editorLockWarning={editorLockWarning}
        blogVersionHistory={blogVersionHistory}
        mediaItems={mediaItems}
        relatedBlogs={relatedBlogs}
      />
    </section>
  );
}

export default BlogPostEditorScreen;
