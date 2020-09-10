
# Why this tech stack?
- Sagas: easy to work with parallel actions and apis. good testing techniques also. And of course separation of concern- logic in one place only. easy to go to react-server-side and test components in isolation
- Redux: one state to rule them all, gives nice split to the applications layers / logic so it is easier to maintain and test.
- React: Because it is fast(!) have many libraries that supports it and also really minimal logic in jsx.
- React-create-scripts: Because that is the official way to start react application, the libraries versions are all set in to go. But- need to remove unneeded dependencies and components.

# How to run

1. run install `yarn` or `npm i`
2. run the dev script (although also build is fine) `npm start`
3. Go to http://localhost:1234

# What's inside?
- Material -ui (Single File Components)
- responsive design- till some point the data disappear.
- click on icon will open more information regarding the resource in a modal.
- in the modal clicking on icon will open at the same modal the information regarding the resource
- click next/previous page will load the next pages of resources.
- loading per container and it's resources. 
- search in apis
- switching between different resources.
- Sagas - controlling the state and multi threading
- async actions with redux
- debounce on clicking too much on next/prev page
- protection against running search on same term too many time
- (out of scope)- changing view, see DisplayPickerContainer.
- lint
- testing jest + saga testing
- saving the errors from apis to store
- typescript type imports (partialy)

# What can be improved?
- a11y
- Fixing some typescript problems
- adding multiple modals for recursive resources.
- adding another request type as trigger
- query the website only if needed (caching)
- when changing resource enable the search button.
- Wrapper reducer can put all the reducer cases with simple saga
- adding error messages from state to view
- improve the request status timestamp
- More saga tests
- adding delay in the requests so loader would be seem.
- fixing rendering jumps.
