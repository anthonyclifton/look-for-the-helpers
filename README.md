# look-for-the-helpers

This code helps happy peoples doing mutual aid.  It can be used to 
organize and manage the connections between folks giving help and
those receiving help.  It's non-hierarchical, so folks giving help
can also receive it.  And folks receiving help can also give it.

## technology

* ReactJS
* React Redux
* React Diagrams
    * [Using the Library](https://projectstorm.gitbook.io/react-diagrams/getting-started/using-the-library)
    * [Testing](https://projectstorm.gitbooks.io/react-diagrams/content/docs/Testing.html)
    * [React-Diagrams Github](https://github.com/projectstorm/react-diagrams/tree/v5.3.2)
* NodeJS
* GraphQL (Apollo)
* Typescript
    * [Typescript JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
* type-graphql library to add decorators for GraphQL schema
* Deployed to AWS, Azure, Google Cloud, or locally to Docker
* Relevant Function as a Service (Lambda, etc.)
* Relevant Relational Database
    * [Postgresql in AWS, Azure, Google Cloud](https://aiven.io/blog/postgresql-cloud-performance)
* Relevant Authentication/Authorization
* Test driven with Jest and Cypress
    * I spent many hours trying to get Jest by itself and with
    Testing-Library/React to work testing the componnent that
    contains the React-Diagrams effort, with poor results.
    I can get tests to pass as long as I don't add any nodes
    or links or labels to the DiagramModel.  If I do that then
    I start getting all kinds of sad ```a.default has no constructor```
    errors which most discussions suggest can be solved by
    doing imports and exports correctly.  But, after trying
    half a dozen ways to do that, I still get those errors.
    And then I found a line in the React-Diagrams documentation
    that says they test using either Jest Snapshots or
    doing E2E tests with Puppeteer.  That's strongly 
    suggestive that their framework is architected in a way
    that doesn't play well.  I know that they talk about
    doing a lot of peer dependencies and other folks have had
    problems integrating their library in various ways, so I
    suspect E2E testing is probably the best approach, whether
    with Puppeteer (headless) or Cypress.
