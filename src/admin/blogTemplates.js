function wrapParagraph(text) {
  return `<!-- wp:paragraph --><p>${text}</p><!-- /wp:paragraph -->`;
}

export const BLOG_TEMPLATES = [
  {
    key: "blank",
    label: "Blank",
    description: "Start with an empty article.",
    contentHtml: "<!-- wp:paragraph --><p></p><!-- /wp:paragraph -->"
  },
  {
    key: "counselling-guide",
    label: "Counselling Guide",
    description: "Intro, checklist, timeline, FAQ, CTA.",
    contentHtml: [
      "<!-- wp:heading --><h2>What this guide covers</h2><!-- /wp:heading -->",
      wrapParagraph("Explain the counselling problem, the audience, and the outcome this guide helps them achieve."),
      "<!-- wp:list --><ul><li>Who should read this</li><li>Key dates to watch</li><li>Common mistakes to avoid</li></ul><!-- /wp:list -->",
      "<!-- wp:heading --><h2>Step-by-step process</h2><!-- /wp:heading -->",
      wrapParagraph("Break the process into simple steps with practical decisions."),
      "<!-- wp:medical/notice {\"tone\":\"warning\",\"title\":\"Important\"} --><div class=\"wp-block-medical-notice is-warning\"><strong>Important</strong><p>Use this section for policy deadlines, document risks, or seat-locking warnings.</p></div><!-- /wp:medical/notice -->",
      "<!-- wp:medical/faq {\"question\":\"What documents are essential?\",\"answer\":\"Keep scorecard, admit card, ID proof, category documents, and fee-ready payment options available before choice filling.\"} --><div class=\"wp-block-medical-faq\"><h3>What documents are essential?</h3><p>Keep scorecard, admit card, ID proof, category documents, and fee-ready payment options available before choice filling.</p></div><!-- /wp:medical/faq -->",
      "<!-- wp:medical/cta {\"title\":\"Need shortlist help?\",\"text\":\"Talk to the admission desk for college filtering and round strategy.\",\"buttonLabel\":\"Talk on WhatsApp\",\"buttonUrl\":\"https://wa.me/919324652984\"} --><div class=\"wp-block-medical-cta\"><h3>Need shortlist help?</h3><p>Talk to the admission desk for college filtering and round strategy.</p><a href=\"https://wa.me/919324652984\">Talk on WhatsApp</a></div><!-- /wp:medical/cta -->"
    ].join("\n")
  },
  {
    key: "college-profile",
    label: "College Profile",
    description: "Use for a single-college overview article.",
    contentHtml: [
      "<!-- wp:medical/college-highlight {\"collegeName\":\"College name\",\"location\":\"Location\",\"courses\":\"MBBS\",\"ctaLabel\":\"Request profile\",\"ctaUrl\":\"https://wa.me/919324652984\"} --><div class=\"wp-block-medical-college-highlight\"><h3>College name</h3><p>Location</p><p>MBBS</p><a href=\"https://wa.me/919324652984\">Request profile</a></div><!-- /wp:medical/college-highlight -->",
      "<!-- wp:heading --><h2>Quick overview</h2><!-- /wp:heading -->",
      wrapParagraph("Add approval, university, seats, fees, hospital setup, and who this college suits."),
      "<!-- wp:table --><figure class=\"wp-block-table\"><table><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody><tr><td>Seats</td><td></td></tr><tr><td>Fees</td><td></td></tr></tbody></table></figure><!-- /wp:table -->",
      "<!-- wp:heading --><h2>Should students consider it?</h2><!-- /wp:heading -->",
      wrapParagraph("Give balanced pros, constraints, and fit.")
    ].join("\n")
  }
];

export function getBlogTemplate(key) {
  return BLOG_TEMPLATES.find((item) => item.key === key) || BLOG_TEMPLATES[0];
}
