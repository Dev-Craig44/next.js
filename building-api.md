Things to learn:

- Getting objects
- Creating objects
- Updating objects
- Deleting objects
- Validating requests with Zod

Getting a Collection of Objects

- in a gived folder or URL segment we can either have a page file or a route file, but not both
- if you want to show something to the user, you need to use a page file

Getting a Single Object
_create endpoint for getting a single object_

Creating an Object

- to create a user, we send a request to the user's endpoint include a user object in the body of the request

Updating an Object

- update a user, we should send a request to the endpoint that represents an individual user, like users/1
- so we send the request and include the updated user object in the body of the request

Deleteing an Object

- to delete a user, we send a request to the endpoint that represents an individual user, like users/1
