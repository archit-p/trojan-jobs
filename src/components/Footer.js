import React from "react";

function Footer() {
  let email = "architpa@usc.edu";
  return (
    <footer className="py-3 text-sm text-gray-600 font-light">
      <div className="max-w-3xl mx-auto px-2">
        Want to post a job? Email{" "}
        <a className="underline" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
