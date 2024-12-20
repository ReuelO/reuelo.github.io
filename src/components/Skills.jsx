import React, { useEffect, useState } from "react";
import { FaCss3Alt, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { fetchGitHubRepos } from "../api/github";

const languageIcons = {
  JavaScript: <FaJs className="text-yellow-500 text-3xl" />,
  HTML: <FaHtml5 className="text-orange-500 text-3xl" />,
  CSS: <FaCss3Alt className="text-blue-500 text-3xl" />,
  React: <FaReact className="text-blue-400 text-3xl" />,
  Node: <FaNodeJs className="text-green-500 text-3xl" />,
};

const Skills = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const repos = await fetchGitHubRepos();
      const languageSet = new Set();
      repos.forEach((repo) => {
        if (repo.language) languageSet.add(repo.language);
      });
      setLanguages(Array.from(languageSet));
    };
    fetchLanguages();
  }, []);

  return (
    <section
      id="skills"
      className="bg-cover bg-center"
      style={{ backgroundImage: `url('/skills.jpg')` }}
    >
      <div className="flex flex-col items-center justify-center h-full bg-light-background dark:bg-dark-background bg-opacity-70 dark:bg-opacity-50 p-16">
        <h2 className="text-3xl text-light-text dark:text-dark-text font-bold mb-6">
          Skills
        </h2>
        <div className="flex justify-center space-x-4 flex-wrap">
          {languages.map((language, index) => (
            <span
              key={index}
              className="bg-light-background dark:bg-dark-background px-4 py-2 rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition w-50"
            >
              <div
                key={language}
                className="flex flex-col items-center text-light-text dark:text-dark-text"
              >
                {languageIcons[language] || <span>{language}</span>}
                <p className="mt-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  {language}
                </p>
              </div>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
