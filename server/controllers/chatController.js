const User = require("../models/User");
const responses = require("../db/responses.json");
const synonyms = require("synonyms");

// controller to fetch messages
const chat_index = (req, res) => {
  // fetch the id of the user stored by auth middleware
  const id = req.user.id;

  // return the user's data except for the password
  User.findById(id)
    .select("-password")
    .then(user => res.json(user));
};

// controller to deal with client messages
const chat_message_post = (req, res) => {
  const keys = Object.keys(responses); // get the responses
  let message = req.body.msg; // extract the message sent in by the client

  message = sanitize_string(message); // remove articles and trim the message

  if (!message) return res.json({ msg: "Type something else" });

  let wordArray = message.split(/\s+/); // split the message into array

  // fetch synonyms for the each word in the array and concat it with the array
  wordArray.forEach(word => {
    const wordSynonym = synonyms(word);
    console.log("SYNONYMS -> ", wordSynonym);
    if (wordSynonym) {
      if (wordSynonym.n) wordArray = wordArray.concat(wordSynonym.n);
      if (wordSynonym.v) wordArray = wordArray.concat(wordSynonym.v);
      if (wordSynonym.s) wordArray = wordArray.concat(wordSynonym.s);
      if (wordSynonym.a) wordArray = wordArray.concat(wordSynonym.a);
    }
  });

  console.log("FINAL WORD ARRAY -> ", wordArray);
  const matchingKey = get_suitable_response(keys, wordArray);

  if (!matchingKey) return res.json({ msg: "Try something else" });

  let possibleResponses = [];

  for (let key in responses) {
    if (key === matchingKey) {
      possibleResponses = responses[key];
      break;
    }
  }

  let randomNumber = Math.floor(Math.random() * possibleResponses.length);
  res.json({ msg: possibleResponses[randomNumber] });
};

// helper function to get the suitable response for the client
const get_suitable_response = (keys, words) => {
  let currMatchCount = 0;
  let highestMatchCount = 0;
  let matchedKey = "";

  // calculate the best key to respond with
  keys.forEach(key => {
    words.forEach(word => {
      if (key.includes(word)) currMatchCount++;
    });
    if (currMatchCount > highestMatchCount) {
      highestMatchCount = currMatchCount;
      matchedKey = key;
    }
    currMatchCount = 0;
  });
  return matchedKey;
};

const sanitize_string = text => {
  const regex = /(?:(the|a|an) +)/g;
  const result = text.replace(regex, ` `);
  return result.trim().toLowerCase();
};

module.exports = { chat_index, chat_message_post };
