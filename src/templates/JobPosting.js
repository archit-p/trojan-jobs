import React from "react";
import { graphql } from "gatsby";
import Ruler from "../components/Ruler";
import Footer from "../components/Footer";

function JobPosting({ data: { markdownRemark: context } }) {
  return (
    <div className="max-w-2xl mx-auto px-2">
      <article className="py-3">
        <h2>{context.frontmatter.title}</h2>
        <div role="doc-subtitle" className="text-gray-600 font-light">
          {context.frontmatter.employer}
        </div>
        <footer className="text-gray-600 text-sm capitalize mt-2 font-light">
          <time>{context.frontmatter.postedAt}</time>
          {context.frontmatter.tags.map((tag) => (
            <>
              <span className="ml-2">•</span>
              <span className="ml-2">{tag}</span>
            </>
          ))}
        </footer>
      </article>
      <Ruler />
      <div
        className="prose py-3"
        dangerouslySetInnerHTML={{ __html: context.html }}
      ></div>
      <Ruler />
      <Footer />
    </div>
  );
}

export default JobPosting;

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        employer
        postedAt(fromNow: true)
        tags
      }
    }
  }
`;
