# Disclaimer

Thank you for this opportunity, not just for the interview but also for the challenge that I believe myself can do much better than this. I won't bored you with personal reasons behind the delay and the incompletes, this week was so hectic. No matter whether or not becoming a part of Shinka Network, I appreciate the challenge that I desperately need recently to spice up my ambition and curiosity. There're always things to learn even from this test project. I enjoyed this very much and would love hear your feedback if possible. Have a nice day!

# How to start

## 4.1 Prime number

### Work breakdown

1. Scratching head looking for an optimized algorithm for generating prime numbers -> Sieve of Eratosthenes
2. Implement infinite scroll with IntersectionObserver
3. Generating prime numbers (16 \* 50) on demand with generator function
4. The rest is basic React, nothing special

```
docker-compose up
```

Client: http://127.0.0.1:5173 <br/>

## 1. User State Behavihour Challenge <br/>

https://vimeo.com/801790002

## 2. Tiptap Challenge <br/>

https://vimeo.com/801790169

## 3. Price Tracker

### How to start

A simple API server that provides endpoints to retrieve ADA price in different resolutions.

1. To sign up for discord notification, join this server via: https://discord.gg/rZwgGV35

2. Run the project

```
docker-compose up
```

API Docs: http://127.0.0.1:3000/docs/shinka
<br/><br/>

## 4. Media App

### Let's go through each requirement:

- Discord accounts are used for authorization ✅
- IPFS is used as the source of truth for storage ✅ (web3.storage)
- Users can add, list, view, and delete media files ✅ (except delete)
  <br/> &rarr; Due to time constrain, I couldn't commit a pleasant delete UI thus I skipped it.
- Images are queried in different sizes and formats to fit different devices. ✅
  <br/> &rarr; Working with centralized storage like s3, I'm used to CDN that allow resize image on the fly so this gave me a hard time at first. The temporary approach was compressed the image file and save it along with the original images. One used for thumbnail, the other used for detail view.
- Videos are streamed to the application.
  <br/> &rarr; Current only used video progressing, I believe HLS.js should be the best practice but I did not have enough time to dive into the documentation. The library hasn't released any official React support so I expected it would take a high learning curve.
- The application has a smooth user experience.
  <br/> &rarr; Love Tailwind but looking up all the complicated CSS properties conversion in its document took forever that some components were rather be written in plain CSS for time saving purpose 🥺

### Improvement

Tbh, there're lots of room for improvement with this open task.
<br/>1. First one is unit test for both FE and BE, I had experienced with this so it shouldn't be a problem.
<br/>2. If time allows, I can setup deployment with EKS to utilize the K8S resources management & auto-scaling, monitoring with Grafana, ...
<br/>3. For features, IPFS is a new playground for me so I want to dive in image optimization & video streaming.

## How to run

```
docker-compose up
```

Client: http://127.0.0.1:5174 <br/>
API Docs: http://127.0.0.1:3000/docs/shinka
<br/><br/>
