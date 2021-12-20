import React from "react";
import { graphql } from "gatsby";
import Ruler from "../components/Ruler";
import { Helmet } from "react-helmet";

function JobPosting({ data: { markdownRemark: context } }) {
  return (
    <>
      <Helmet>
        <title>
          {context.frontmatter.title} at {context.frontmatter.employer}
        </title>
      </Helmet>
      <header className="py-3 bg-white">
        <div className="max-w-3xl mx-auto px-3 flex flex-row">
          <div>
            <h1 className="text-lg font-semibold">Trojan Jobs 👩‍💻👨‍💼👩‍🔬</h1>
            <div role="doc-subtitle" className="text-gray-600">
              Find on-campus jobs at USC
            </div>
          </div>
          <div className="ml-auto flex flex-col justify-center">
            <a
              className="bg-red-800 rounded-md shadow-sm py-2 px-4 text-white"
              href="mailto:architpa@usc.edu"
            >
              Post a Job
            </a>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-3xl mx-auto px-3">
          <Ruler />
          <article className="py-3">
            <h2 className="text-lg font-medium">{context.frontmatter.title}</h2>
            <div role="doc-subtitle" className="text-gray-600">
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
          <div
            className="prose py-3"
            dangerouslySetInnerHTML={{ __html: context.html }}
          ></div>
        </div>
      </main>
    </>
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
