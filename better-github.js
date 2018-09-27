// ==UserScript==
// @name         Better Github
// @version      0.2
// @description  highlight Github pull request status
// @updateURL    https://github.com/Cerzat43/userscript-github/blob/master/better-github.js
// @downloadURL  https://github.com/Cerzat43/userscript-github/blob/master/better-github.js
// @match        https://github.com/*
// @connect      github.com
// ==/UserScript==

const ALREADY_REPLACED_CLASS = '__PR_REPLACED__';

const arr = {
  'Changes requested': '#fce8e6',
  'Review required': '#ffffaa',
  'Approved': '#ccff99'
};

const replaceDivBackground = function() {
  const pullRequestSelector = '.js-issue-row';
  const pullRequests = document.querySelectorAll(`
    ${pullRequestSelector}:not(.${ALREADY_REPLACED_CLASS})
  `);

  pullRequests.forEach((pullRequest) => {
    const stateElement = pullRequest.querySelector('.tooltipped-s');
    const stateElementText = stateElement ? stateElement.textContent.trim() : null;

    pullRequest.classList.add(ALREADY_REPLACED_CLASS);
    pullRequest.style.backgroundColor = arr[stateElementText];
  });
};

var observer = new MutationObserver(replaceDivBackground);
const pullRequestSelector = '.application-main';
observer.observe(document.querySelector(`${pullRequestSelector}`), {
  subtree: true,
  childList: true
});

// / <b class="text-red">✗ Non validé</b>
