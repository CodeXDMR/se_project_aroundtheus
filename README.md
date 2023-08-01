# Project 8: Around The U.S.

GitHub Pages - [Link](https://codexdmr.github.io/se_project_aroundtheus/)
</br></br>

### Overview

- Intro
- Figma
- Images
- Notes
  </br></br>

**_Intro_**

---

This project was developed to provide visitors with a resource on national parks in the United States of America. Six of the most known parks were selected with more to be added at a later date.
</br></br>

**_Figma_**

---

Project design was provided on
[Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)
</br></br>

**Images**

---

All the photos used in this project were compressed using
[tinypng.com](https://tinypng.com/).
<br /><br />

**_Notes_**

---

1. Additional whitespace between the bottom of each photo and its description was detected. This was eliminated using **_vertical-align: text-bottom;_**.

   [Graphic Link](./src/images/readme/Issue-WhiteSpace.jpg)

2. A double border was encountered on one of the buttons. The svg image was not exported properly from Figma. A flattened version of the button which included the outline and plus sign was exported instead of just the plus sign.

   [Graphic Link](./src/images/readme/Issue-DoubleBorder.jpg)

3. Functionality was added to Modal window, allowing users to edit the profile title and description and user configureable cards via Javascript.

4. Add and delete cards features were added so that users can add locations and then delete any of the existing cards.

5. Preview Modal was created so users can see a preview image of each card.

6. Added validation scripts on the text input fields for the profile info edit popup and the add new card popup.

7. Refactored code using class objects, created separate js files, Card.js and FormValidator.js.

8. Continued to refactor code and installed webpack.

9. Final code refactoring and setting up API calls.
