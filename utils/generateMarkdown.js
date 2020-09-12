// function to generate markdown for title h1
function generateMarkdownH1(data) {
    return `# ${data.title}`;
}
//generate markdown for contents links
function generateMarkdownContentLink(data) {
    return `* [${data}](#${data})`;
}
//generates markdown for subtitles
function generateMarkdownH2(data) {
    return `## ${data}`;
}


module.exports = { generateMarkdownH1, generateMarkdownContentLink, generateMarkdownH2, };