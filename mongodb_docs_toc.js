// ==UserScript==
// @name         mongodb-docs-toc
// @namespace    https://github.com/turnon/mongodb_docs_toc
// @version      0.0.1
// @description  add table of content on https://docs.mongodb.com
// @author       block24block@gmail.com
// @match        https://docs.mongodb.com/*
// @grant        none
// @require https://greasyfork.org/scripts/372188-ateles/code/ateles.js?version=631434
// ==/UserScript==
Ateles(['dropdown', 'when_changed'], (dropdown, when_changed) => {
    let selector = '#main-column h2, #main-column h3, #main-column h4, #main-column h5, #main-column h6',
        toc

    function make_toc() {
        if (toc) {
            toc.remove()
        }

        let titles = {}

        document.querySelectorAll(selector).forEach(h => {
            titles[h.parentNode.id] = h.innerText
        })

        toc = dropdown(titles, {
            beforeend: document.body,
            direction: 'left_down',
            style: {
                shadow: true,
                id: 'position: fixed; top: 70px; left: 1200px;'
            }
        })
    }

    when_changed({
        interval: 1000,
        selector: 'h1',
        callback: make_toc
    })
})