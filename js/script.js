/*
document.getElementById('test-button').addEventListener('click', function(){
const links = document.querySelectorAll('.titles a');
console.log('links:', links);
});
*/

/* LINK CLICK HANDLER */

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE]  remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }


  /* [DONE]  get 'href' attribute from the clicked link */

  const linkHref =  clickedElement.getAttribute('href');
  console.log('Link href:', linkHref);

  /* [DONE]  find the correct article using the selector (value of 'href' attribute) */

  const correctArticle = document.querySelector(linkHref);
  console.log(correctArticle);

  /* [DONE]  add class 'active' to the correct article */

  correctArticle.classList.add('active');
};


/* TITLE LINKS GENERATOR */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks (customSelector = '') {
  console.log('Custom selector = ' + customSelector);
  /*  [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  console.log(titleList);


  /*  [DONE]  for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

  /* [DONE] get the article id */

  let html = '';

  for (let article of articles) {

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE]  get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* [DONE] insert link into titleList */

    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
/* TITLE LINKS GENERATION */
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log('tagWrapper is: ' + tagWrapper);
    /* make html variable with empty string */
    let html = '';
    console.log('HTML is: ' + html);
    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');
    console.log('tags is: ' + tags);
    /* split tags into array */
    const articleTags = tags.split(' ');
    console.log('articleTags is: ' + articleTags);
    /* START LOOP: for each tag */
    for (let articleTag of articleTags) {
      console.log('articleTag is: ' + articleTag);
      /* generate HTML of the link */
      const link = '<li><a href="#tag-' + articleTag + '"><span>' + articleTag + '</span></a></li>';
      console.log('linl is: ' + link);
      /* add generated code to html variable */
      html = html + ' ' + link;
      console.log('html is : ' + html);
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateTags();

/* TAG ONCLICK ACTION */

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const allActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeLink of allActiveLinks) {
  /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
  /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();
