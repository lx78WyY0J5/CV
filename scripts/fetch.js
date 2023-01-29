includeFile();

async function includeFile() {
    await include("/contents/head.html", "head", false);

    await include_css("/styles/userAgentRemover.css");
    await include_css("/styles/main.css");
    await include_css("/styles/text.css");
    await include_css("/styles/text-utils.css");

    await include("/contents/header.html", "body", false);

    await include("/contents/content.html", "body");
}

async function include(link, query, queryOrIndex) {
    let response = await fetch(link)
        .then(response => {
            return response.text()
        })
        .then(data => {
            if (queryOrIndex) {
                document.getElementById(query).innerHTML += data;
            } else {
                document.querySelector(query).innerHTML += data;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

async function include_script(url) {
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}

async function include_css(url) {
    var head = document.getElementsByTagName('HEAD')[0];

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;

    head.appendChild(link);
}