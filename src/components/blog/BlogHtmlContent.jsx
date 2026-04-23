import { sanitizeBlogHtml } from "../../admin/blogContentHtml";

function BlogHtmlContent({ html }) {
  const safeHtml = sanitizeBlogHtml(html);

  return <div className="legacy-blog-html-content" dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}

export default BlogHtmlContent;
