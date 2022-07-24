const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";

const client = redis.createClient();

client.connect();
client.on("connect", () => {
  console.log("Connected!");
});
client.set("Intern", "gfg", (err, stu) => {
  if (err) console.log(err);
  else console.log(stu);
});
client.hSet("frameworks_hash", [
  "javascript",
  "ReactJS",
  "css",
  "TailwindCSS",
  "node",
  "Express",
]);

client.set("hi", "there", (err, reply) => console.log(reply));

//short form
client.get("hi", console.log);
//response will be null, there

//hash in redis
client.hSet("spanish", "red", "rojo");

client.hGet("spanish", "red", (err, val) => console.log(val));
// with an object
client.HSET("key", {
  field1: "value1",
  field2: "value2",
});

// with flat array
client.HSET("key", ["field1", "value1", "field2", "value2"]);

// with tuples
client.HSET("key", [
  ["field1", "value1"],
  ["field2", "value2"],
]);
//store a list of items
client.rPush("frameworkList", "react", (err, reply) => {
  console.log(reply);
});
client.rPush("frameworkList", "angular", (err, reply) => {
  console.log(reply);
});
client.rPop("frameworkList");
// pop the last element from the list
//lpush - push elements to the left
//rpush - push elements to the right

setTimeout(async () => {
  console.log("I ma in timeot");
  const value = await client.get("hi"); //, (err, val) =>
  const val = await client.hGet("spanish", "red", (err, val) =>
    console.log(val)
  );
  const framework = await client.hGetAll("frameworks_hash", (err, val) =>
    console.log(val)
  );
  //to retriv elements from a list use lRange
  const elementFromList = await client.lRange("frameworkList", 0, -1);
  const FirstelementFromList = await client.lRange("frameworkList", 0, 1);

  console.log(
    "Value: ",
    value,
    val,
    framework,
    elementFromList,
    FirstelementFromList
  );
}, 10);
//has two looku ps,spanish and red while, seting the third value ie rojo
//so now nested hash will be something like this
// const redisValue = {
//   spanish: {
//     red: "rojo",
//     orange: "naranja",
//   },
//   german: {
//     red: "rot",
//     orange: "orange",
//   },
// };
client.on("error", (err) => {
  console.log(`${err}redis client disconnected`);
});
client.on("close", () => {
  console.log(`redis client disconnected`);
});
// to store objects in redis use client.set("colors",JSON.stringify({red:"rojo"}))
//similarly to retreive objects from redis
// client.get('colors', (err,val)=>cocnsole.log(JSON.parse(val)))
