{
  'use strict'; //shows error

  /*document.getElementById('test-button').addEventListener('click', function () {
      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
  });*/

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* create HTML of the link */


      /* insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags){
  const params ={max : 0, min : 999999};

  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    if (tags[tag] < params.min){
        params.min = tags[tag];
    }

    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

    return params;
  }

  function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;

}

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    console.log(articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      tagList.innerHTML = '';

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
      console.log(tag);

        /* ?????????????????????generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a>' + "&nbsp;" + '</li>';
        console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;

         /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else{
        allTags[tag]++;
      }

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagParams(allTags);
    console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';


const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + tag + (' + allTags[tag] + ')' + '</li>'';
console.log('tagLinkHTML:', tagLinkHTML);

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /*[NEW] ???????????????????????? generate code of a link and add it to allTagsHTML */
      allTagsHTML += tagLinkHTML;
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefEqualTag = document.querySelectorAll('a[href="' + href + '"]');

    /*???????????????????????????????? START LOOP: for each found tag link */
    for (let hrefEqualTag of activeTags) {

    /* add class active */
    hrefEqualTag.classList.add('active');

    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');

  function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */
    for(let link of links)

    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
  }

  addClickListenersToTags();

  function generateAuthors() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find author wrapper */
      const authorList = article.querySelector(optArticleAuthorSelector);
      authorList.innerHTML = '';

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);

      /* generate HTML of the author */
      const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      console.log(authorHTML);

      /* add generated code to html variable */
      html = html + authorHTML;

      /* insert HTML of all the links into the tags wrapper */
      authorList.innerHTML = html;
    }
  }
    generateAuthors();


  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(tag);

    /* find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {

      /* remove class active */
      activeAuthor.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tarAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /*???????????????????????????????? START LOOP: for each found author link */
    for (let tarAuthor of tarAuthors) {

    /* remove? class active */
    tarAuthor.classList.remove('active');

    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
  }
  generateTitleLinks('[data-author="' + author + '"]');

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const links = document.querySelectorAll('.post-author a');

    /* START LOOP: for each link */
    for(let link of links)

    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
  }

  addClickListenersToAuthors();
}
}
