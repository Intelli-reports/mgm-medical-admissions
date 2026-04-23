export function buildCustomBlockRegistrationScript() {
  return `
    (function registerMedicalBlocks() {
      if (!window.wp || !window.wp.blocks || !window.wp.blockEditor || !window.wp.element) return;

      const { registerBlockType } = window.wp.blocks;
      const { createElement: el, Fragment } = window.wp.element;
      const { RichText, InspectorControls } = window.wp.blockEditor;
      const { PanelBody, SelectControl, TextControl, TextareaControl } = window.wp.components;

      function maybeRegister(name, settings) {
        if (window.wp.blocks.getBlockType(name)) return;
        registerBlockType(name, settings);
      }

      maybeRegister("medical/notice", {
        title: "Medical Notice",
        icon: "warning",
        category: "widgets",
        attributes: {
          tone: { type: "string", default: "info" },
          title: { type: "string", default: "" },
          text: { type: "string", default: "" }
        },
        edit: function(props) {
          const { attributes, setAttributes } = props;
          return el(Fragment, null,
            el(InspectorControls, null,
              el(PanelBody, { title: "Notice settings", initialOpen: true },
                el(SelectControl, {
                  label: "Tone",
                  value: attributes.tone,
                  options: [
                    { label: "Info", value: "info" },
                    { label: "Warning", value: "warning" },
                    { label: "Success", value: "success" }
                  ],
                  onChange: function(value) { setAttributes({ tone: value }); }
                })
              )
            ),
            el("div", { className: "wp-block-medical-notice is-" + attributes.tone },
              el(RichText, {
                tagName: "strong",
                placeholder: "Notice title",
                value: attributes.title,
                onChange: function(value) { setAttributes({ title: value }); }
              }),
              el(RichText, {
                tagName: "p",
                placeholder: "Notice text",
                value: attributes.text,
                onChange: function(value) { setAttributes({ text: value }); }
              })
            )
          );
        },
        save: function(props) {
          const { attributes } = props;
          return el("div", { className: "wp-block-medical-notice is-" + attributes.tone },
            el(RichText.Content, { tagName: "strong", value: attributes.title }),
            el(RichText.Content, { tagName: "p", value: attributes.text })
          );
        }
      });

      maybeRegister("medical/cta", {
        title: "Medical CTA",
        icon: "megaphone",
        category: "widgets",
        attributes: {
          title: { type: "string", default: "" },
          text: { type: "string", default: "" },
          buttonLabel: { type: "string", default: "Contact now" },
          buttonUrl: { type: "string", default: "" }
        },
        edit: function(props) {
          const { attributes, setAttributes } = props;
          return el(Fragment, null,
            el(InspectorControls, null,
              el(PanelBody, { title: "CTA settings", initialOpen: true },
                el(TextControl, {
                  label: "Button label",
                  value: attributes.buttonLabel,
                  onChange: function(value) { setAttributes({ buttonLabel: value }); }
                }),
                el(TextControl, {
                  label: "Button URL",
                  value: attributes.buttonUrl,
                  onChange: function(value) { setAttributes({ buttonUrl: value }); }
                })
              )
            ),
            el("div", { className: "wp-block-medical-cta" },
              el(RichText, {
                tagName: "h3",
                placeholder: "CTA title",
                value: attributes.title,
                onChange: function(value) { setAttributes({ title: value }); }
              }),
              el(RichText, {
                tagName: "p",
                placeholder: "CTA copy",
                value: attributes.text,
                onChange: function(value) { setAttributes({ text: value }); }
              }),
              el("a", { href: attributes.buttonUrl || "#" }, attributes.buttonLabel || "Contact now")
            )
          );
        },
        save: function(props) {
          const { attributes } = props;
          return el("div", { className: "wp-block-medical-cta" },
            el(RichText.Content, { tagName: "h3", value: attributes.title }),
            el(RichText.Content, { tagName: "p", value: attributes.text }),
            el("a", { href: attributes.buttonUrl || "#" }, attributes.buttonLabel || "Contact now")
          );
        }
      });

      maybeRegister("medical/college-highlight", {
        title: "College Highlight",
        icon: "admin-multisite",
        category: "widgets",
        attributes: {
          collegeName: { type: "string", default: "" },
          location: { type: "string", default: "" },
          courses: { type: "string", default: "" },
          ctaLabel: { type: "string", default: "Request details" },
          ctaUrl: { type: "string", default: "" }
        },
        edit: function(props) {
          const { attributes, setAttributes } = props;
          return el(Fragment, null,
            el(InspectorControls, null,
              el(PanelBody, { title: "College settings", initialOpen: true },
                el(TextControl, {
                  label: "CTA label",
                  value: attributes.ctaLabel,
                  onChange: function(value) { setAttributes({ ctaLabel: value }); }
                }),
                el(TextControl, {
                  label: "CTA URL",
                  value: attributes.ctaUrl,
                  onChange: function(value) { setAttributes({ ctaUrl: value }); }
                })
              )
            ),
            el("div", { className: "wp-block-medical-college-highlight" },
              el(RichText, {
                tagName: "h3",
                placeholder: "College name",
                value: attributes.collegeName,
                onChange: function(value) { setAttributes({ collegeName: value }); }
              }),
              el(RichText, {
                tagName: "p",
                placeholder: "Location",
                value: attributes.location,
                onChange: function(value) { setAttributes({ location: value }); }
              }),
              el(RichText, {
                tagName: "p",
                placeholder: "Courses / key info",
                value: attributes.courses,
                onChange: function(value) { setAttributes({ courses: value }); }
              }),
              el("a", { href: attributes.ctaUrl || "#" }, attributes.ctaLabel || "Request details")
            )
          );
        },
        save: function(props) {
          const { attributes } = props;
          return el("div", { className: "wp-block-medical-college-highlight" },
            el(RichText.Content, { tagName: "h3", value: attributes.collegeName }),
            el(RichText.Content, { tagName: "p", value: attributes.location }),
            el(RichText.Content, { tagName: "p", value: attributes.courses }),
            el("a", { href: attributes.ctaUrl || "#" }, attributes.ctaLabel || "Request details")
          );
        }
      });

      maybeRegister("medical/faq", {
        title: "Medical FAQ",
        icon: "editor-help",
        category: "widgets",
        attributes: {
          question: { type: "string", default: "" },
          answer: { type: "string", default: "" }
        },
        edit: function(props) {
          const { attributes, setAttributes } = props;
          return el("div", { className: "wp-block-medical-faq" },
            el(RichText, {
              tagName: "h3",
              placeholder: "Question",
              value: attributes.question,
              onChange: function(value) { setAttributes({ question: value }); }
            }),
            el(RichText, {
              tagName: "p",
              placeholder: "Answer",
              value: attributes.answer,
              onChange: function(value) { setAttributes({ answer: value }); }
            })
          );
        },
        save: function(props) {
          const { attributes } = props;
          return el("div", { className: "wp-block-medical-faq" },
            el(RichText.Content, { tagName: "h3", value: attributes.question }),
            el(RichText.Content, { tagName: "p", value: attributes.answer })
          );
        }
      });
    })();
  `;
}
