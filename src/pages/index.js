import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, Link } from "gatsby";
import Favicon from "../images/favicon.png";

function Index() {
  let {
    allMarkdownRemark: { nodes: jobs },
  } = useStaticQuery(graphql`
    query DataQuery {
      allMarkdownRemark(sort: { fields: frontmatter___postedAt, order: DESC }) {
        nodes {
          frontmatter {
            title
            employer
            postedAt(fromNow: true)
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  function searchJobs(keyword) {
    if (keyword) {
      setFilteredJobs(
        jobs.filter((job) => {
          const regex = new RegExp(String.raw`${keyword.toLowerCase()}`);
          if (job.frontmatter.title.toLowerCase().match(regex)) {
            return true;
          }
          if (job.frontmatter.employer.toLowerCase().match(regex)) {
            return true;
          }
          if (
            job.frontmatter.tags.filter((tag) => tag.toLowerCase().match(regex))
              .length > 0
          ) {
            return true;
          }
          return false;
        })
      );
    } else {
      setFilteredJobs(jobs);
    }
  }

  function togglePaidOnly(selected) {
    console.log(selected);
    if (selected) {
      setFilteredJobs(
        filteredJobs.filter((job) => job.frontmatter.tags.includes("Paid"))
      );
    } else {
      setFilteredJobs(jobs);
    }
  }

  return (
    <>
      <Helmet>
        <title>Trojan Jobs - Find On-Campus Jobs</title>
        <link rel="icon" type="image/x-icon" href={Favicon}></link>
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
      <main className="bg-slate-50 py-3 min-h-screen">
        <div className="max-w-3xl mx-auto px-3">
          <section className="mt-2">
            <div>
              <input
                type="text"
                className="w-full border-2 rounded-md border-gray-200 p-2 font-light"
                placeholder="Search..."
                onChange={(e) => searchJobs(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <input
                className="rounded-md border-gray-200"
                type="checkbox"
                id="paid-checkbox"
                onChange={(e) => togglePaidOnly(e.target.checked)}
              />
              <label
                htmlFor="paid-checkbox"
                className="ml-2 font-light text-gray-600 text-sm"
              >
                Paid only
              </label>
            </div>
          </section>
          {filteredJobs.map((job) => (
            <>
              <Link to={job.fields.slug}>
                <article className="p-3 bg-white mt-3 rounded-md shadow-sm">
                  <h2 className="text-lg font-medium">
                    {job.frontmatter.title}
                  </h2>

                  <div role="doc-subtitle" className="text-gray-600">
                    {job.frontmatter.employer}
                  </div>
                  <footer className="text-gray-600 text-sm capitalize mt-2 font-light">
                    <time>{job.frontmatter.postedAt}</time>
                    {job.frontmatter.tags.map((tag) => (
                      <>
                        <span className="ml-2">•</span>
                        <span className="ml-2">{tag}</span>
                      </>
                    ))}
                  </footer>
                </article>
              </Link>
            </>
          ))}
        </div>
      </main>
    </>
  );
}

export default Index;
