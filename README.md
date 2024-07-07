# React project setup. Class components. Error boundary.

## Application Requirements

1. Create a page comprised of 2 horizontal sections (a smaller top one, and a bigger bottom one).
2. On the top section put _Search_ input and the "Search" button. _Search_ component should look for a previously saved search term in the local storage (LS), if there isn't any - leave the input empty.
3. Bottom section should be used for displaying search results (name and a small description).
4. By default application makes a call to the selected api to get the list of the items with the search term from the input (only first page). If the input is empty make a call to get all the items.
5. When user modifies the _Search_ input and clicks on "Search" button, application makes a call to an api with the newly provided search term (search term should not have any trailing spaces, process the input) to get the results (only first page).
6. The provided search term should be saved to the LS, if the value exists overwrite it.
7. Wrap application to an error boundary to catch errors. Report an error to a console and show fallback UI (use respective methods for this). Create a button which will throw an error on click to test the functionality.

**Use class components to get access to lifecycle events or state. Using hooks is forbidden at this stage. Patience, it won't last long.**

All logical parts should be set into separate components.
