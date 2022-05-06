// ==UserScript==
// @name         Better Github
// @version      0.3
// @description  highlight Github pull request status
// @updateURL    https://github.com/Cerzat43/userscript-github/blob/master/better-github.js
// @downloadURL  https://github.com/Cerzat43/userscript-github/blob/master/better-github.js
// @match        https://github.com/*
// @connect      github.com
// ==/UserScript==

const ALREADY_REPLACED_CLASS = '__PR_REPLACED__';

const arr = {
  'Changes requested': '#f4aaac',
  'Review required': '#fac905',
  'Approved': '#c4ee81'
};

const replaceDivBackground = function() {
  const pullRequestSelector = '.tooltipped-s';
  const pullRequests = document.querySelectorAll(`
    ${pullRequestSelector}:not(.${ALREADY_REPLACED_CLASS})
  `);

  pullRequests.forEach((pullRequest) => {
    const stateElementText = pullRequest ? pullRequest.textContent.trim() : null;

    pullRequest.classList.add(ALREADY_REPLACED_CLASS);
    pullRequest.style.setProperty('color', arr[stateElementText], 'important');
  });
};

var observer = new MutationObserver(replaceDivBackground);
const pullRequestSelector = '.application-main';
observer.observe(document.querySelector(`${pullRequestSelector}`), {
  subtree: true,
  childList: true
});
