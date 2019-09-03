{
  'use strict'; //shows error

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.authors',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  //ok
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

  //almost ok
  function generateTitleLinks(customSelector = '') {
    console.log(customSelector);

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );

    let html = '';

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // console.log(linkHTML);
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

      /* create HTML of the link */
      html = html + linkHTML;
    }
    /* insert link into titleList */
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  //znajdowanie najmniejszej i największej liczby wystąpień
  function calculateTagsParams(tags) {
    const params = { max: 0, min: 999999 };

    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      } else if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  }

  //almost ok
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

        /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a>' + '&nbsp;' + '</li>';
        // console.log(linkHTML);
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /* [NEW] add generated code to allTags object */
          allTags[tag] = 1;
        } else {
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

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create variable for all links HTML code */

    // let allTagsHTML = '';
    const allTagsData = { tags: [] };

    // const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + tag + ' + allTags[tag] + ' + '</li>';
    // console.log('tagLinkHTML:', tagLinkHTML);

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /*[NEW] ? generate code of a link and add it to allTagsHTML */
      //allTagsHTML += tagLinkHTML;

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add html from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  }
  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named 'clickedElement' and give it the value of 'this' */
    const clickedElement = this;

    /* make a new constant 'href' and read the attribute 'href' of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant 'tag' and extract tag from the 'href' constant */
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

    /* find all tag links with 'href' attribute equal to the 'href' constant */
    const hrefEqualTags = document.querySelectorAll('a[href="' + href + '"]');

    /*???????????????????????????????? START LOOP: for each found tag link */
    for (let hrefEqualTag of hrefEqualTags) {
      /* add class active */
      hrefEqualTag.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    console.log(tag);

    /* execute function 'generateTitleLinks' with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */
    /* add tagClickHandler as event listener for that link */
    for (let link of links) link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }

  addClickListenersToTags();

  function generateAuthors() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    const allAuthors = {};

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find author wrapper */
      const authorList = document.querySelector(optArticleAuthorSelector);
      authorList.innerHTML = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      article.querySelector('.post-authors').innerHTML = articleAuthor;
      console.log(articleAuthor);

      /* make html variable with empty string */
      let html = '';

      if (!allAuthors.hasOwnProperty(articleAuthor)) {
        /* [NEW] add generated code to allTags object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      for (let author in allAuthors) {
        /* generate HTML of the author */
        //const authorHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
        //console.log(authorHTML);
        const linkHTMLData = { id: author, title: author };
        const linkHTML = templates.authorLink(linkHTMLData);

        /* add generated code to html variable */
        html = html + linkHTML;
      }

      /* insert HTML of all the links into the tags wrapper */
      authorList.innerHTML = html;
    }
  }
  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named 'clickedElement' and give it the value of 'this' */
    const clickedElement = this;

    /* make a new constant 'href' and read the attribute 'href' of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant 'author' and extract author from the 'href' constant */
    const author = href.replace('#author-', '');
    console.log(tag);

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll(
      'a.active[href^="#author-"]'
    );

    /* START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors) {
      /* remove class active */
      activeAuthor.classList.remove('active');

      /* END LOOP: for each active author link */
    }

    /* find all tag links with 'href' attribute equal to the 'href' constant */
    const tarAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /*???????????????????????????????? START LOOP: for each found author link */
    for (let tarAuthor of tarAuthors) {
      /* remove? class active */
      tarAuthor.classList.remove('active');

      /* END LOOP: for each found author link */
    }
    /* execute function 'generateTitleLinks' with article selector as argument */

    /*???????author jest not defined wiec jak mam się odnieść do author skoro jest poza {}*/

    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const links = document.querySelectorAll('.post-author a');

    /* START LOOP: for each link */
    /* add tagClickHandler as event listener for that link */
    for (let link of links) link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }

  addClickListenersToAuthors();
}
