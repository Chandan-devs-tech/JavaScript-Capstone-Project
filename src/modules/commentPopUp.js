/* eslint-disable no-console */
import { setComment, getComments, displayComment } from './setComment.js';

const popupWindow = async (id) => {
  const mainContainer = document.querySelector('.main-container');
  const result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );

  const data = await result.json();
  const mealDetails = data.meals[0];
  // console.log(mealDetails);
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const popupContainer = document.createElement('div');
  popupContainer.className = 'popup-container';

  const closeButton = document.createElement('button');
  closeButton.className = 'popup-close';
  closeButton.innerHTML = 'X';

  const img = new Image();
  const popupImage = document.createElement('div');
  img.src = `${mealDetails.strMealThumb}`;
  popupImage.appendChild(img);

  const imgDescipDiv = document.createElement('div');
  imgDescipDiv.classList.add('img-desc-container');
  imgDescipDiv.innerHTML = `<p>Area : ${mealDetails.strArea} </p>
  <p>Measure : ${mealDetails.strMeasure2}</p>
  <p>Ingedients : ${mealDetails.strIngredient1} </p>
  <p>Category: ${mealDetails.strCategory}</p>
 `;

  const popupFoodName = document.createElement('h3');
  popupFoodName.textContent = `${mealDetails.strMeal}`;

  const formTitle = document.createElement('div');
  formTitle.className = 'comment-input-sec';
  formTitle.textContent = 'Add a comment';

  const form = document.createElement('form');
  form.className = 'form';

  const nameInput = document.createElement('input');
  nameInput.className = 'name-input';
  nameInput.type = 'text';
  nameInput.placeholder = 'Your Name';

  const yourInsightInput = document.createElement('textarea');
  yourInsightInput.className = 'your-insight';
  yourInsightInput.cols = 40;
  yourInsightInput.rows = 6;
  yourInsightInput.placeholder = 'Your Insights';

  const submit = document.createElement('button');
  submit.className = 'submit';
  submit.innerText = 'Submit';

  const commentHeader = document.createElement('h4');
  commentHeader.className = 'comment-header';
  // commentHeader.innerHTML = '(Counter coming soon) Comments';
  const userCommentsDiv = document.createElement('div');
  userCommentsDiv.classList.add('comments-container');

  const allComments = await getComments(id);
  displayComment(allComments, userCommentsDiv, commentHeader);

  // get comments from API starts

  // get comments from API done

  form.appendChild(nameInput);
  form.appendChild(yourInsightInput);
  form.appendChild(submit);

  popupContainer.appendChild(closeButton);
  popupContainer.appendChild(popupImage);
  popupContainer.appendChild(imgDescipDiv);
  popupContainer.appendChild(formTitle);
  popupContainer.appendChild(form);
  popupContainer.appendChild(commentHeader);
  overlay.appendChild(popupContainer);
  mainContainer.appendChild(overlay);
  popupContainer.appendChild(userCommentsDiv);

  const closePopup = () => {
    mainContainer.removeChild(overlay);
  };

  closeButton.addEventListener('click', closePopup);

  // set comments to API starts
  submit.addEventListener('click', async (event) => {
    event.preventDefault();
    const nameVal = nameInput.value;
    const insightVal = yourInsightInput.value;
    setComment(id, nameVal, insightVal);
    const allComments = await getComments(id);
    console.log('This is allComments', allComments);
    displayComment(allComments, userCommentsDiv, commentHeader);
  });
};

export default popupWindow;
