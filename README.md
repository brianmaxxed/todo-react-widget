### Simple React Todo Widget

#### install
yarm

#### run
yarn start

This is a simple widget that you can reuse multiple times on the same page.
It uses a simple react store to store the todo list of react list items and renders to the ul as todo items are added.
It does a simple regex check to make sure the input doesn't contain only whitespace or invalid entries.

There was a strict 1-2 hour time limit so there isn't much CSS, but it validate and adds/deletes nicely and each component is seperate.

When the submit button is clicked the todo items list is looped over and the array of text todo items are sent to the console.
This would be a normal form submission of an array of items as json. Since it's just an example I console out the array.

Given more time I would have not had the full list re-rendered on deletion. I would have structured the code differently to have a sub-component and pass down neccessary props only to the component being deleted.

Since this is a todo list of probably 100 items max, that extra refinement isn't neccessary. Performance is good as is.

