// ==UserScript==
// @name         Better Github
// @version      0.1
// @description  highlight Github pull request status
// @updateURL    https://github.com/Cerzat43/userscript-github/blob/master/better-github.js
// @downloadURL  https://github.com/Cerzat43/userscript-github/blob/master/better-github.js
// @match        https://github.com/*
// @connect      github.com
// ==/UserScript==

const ALREADY_REPLACED_CLASS = '__PR_REPLACED__';

const replaceDivBackground = function() {
  const pullRequestSelector = '.js-issue-row';
  const pullRequests = document.querySelectorAll(`
    ${pullRequestSelector}:not(.${ALREADY_REPLACED_CLASS})
  `);

  pullRequests.forEach((pullRequest) => {
    const stateElement = pullRequest.querySelector('.tooltipped-s');
    const stateElementText = stateElement ? stateElement.textContent.trim() : null;

    pullRequest.classList.add(ALREADY_REPLACED_CLASS);
    switch (stateElementText) {
      case 'Changes requested':
        pullRequest.style.backgroundColor = '#fce8e6';
        break;
      case 'Review required':
        pullRequest.style.backgroundColor = '#ffffaa';
        break;
      case 'Approved':
        pullRequest.style.backgroundColor = '#ccff99';
        break;
    }
  });
};

var observer = new MutationObserver(replaceDivBackground);
const pullRequestSelector = '.application-main';
observer.observe(document.querySelector(`${pullRequestSelector}`), {
  subtree: true,
  childList: true
});
