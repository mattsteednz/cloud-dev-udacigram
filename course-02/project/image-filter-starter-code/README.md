# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

### Notes
See the inclued Postman file cloud-cdnd-c2-final.postman_collection.json for a collection of all tested scenarios.
The rubric URL of https://timedotcom.files.wordpress.com/2019/03/kitten-report.jpg currently returns a 404.
filterImageFromURL has been refactored to implement a Promise rejection so this can be managed in the main server.ts code.

This API implements a basic API key header check, checking for a 'token' of 'udacity'.
See cloud-cdnd-c2-final.postman_collection.json for an example of the request headers.
