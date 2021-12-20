import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Ruler from "../components/Ruler";
import { useStaticQuery, graphql, Link } from "gatsby";
import Footer from "../components/Footer";
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
      <div className="max-w-2xl mx-auto px-2">
        <header className="py-3">
          <h1 className="text-lg font-semibold">Trojan Jobs 👩‍💻👨‍💼👩‍🔬</h1>
          <div role="doc-subtitle" className="text-gray-600">
            Find on-campus jobs at USC
          </div>
          <section className="mt-2">
            <div>
              <input
                type="text"
                className="w-full border rounded-md border-gray-300 p-2 font-light"
                placeholder="Search..."
                onChange={(e) => searchJobs(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <input
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
        </header>
        <Ruler />
        {filteredJobs.map((job) => (
          <>
            <article className="py-3">
              <Link to={job.fields.slug}>
                <h2>{job.frontmatter.title}</h2>
              </Link>
              <div role="doc-subtitle" className="text-gray-600 font-light">
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
            <Ruler />
          </>
        ))}
        <Footer />
      </div>
    </>
  );
}

export default Index;
