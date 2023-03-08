const {MongoClient,ObjectId} = require("mongodb");
const mongo = new MongoClient("mongodb://localhost:27017")
const db = mongo.db("social_media")

const {faker} = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const number_of_users =50
async function seedUsers(){
    const hash = await bcrypt.hash("password",10)
    await db.collection("users").deleteMany();
    let data = [];

    data.push({
        _id: new ObjectId("63969fc7526a2ee4e61451db"),
        name : "alice",
		handle : "alice0",
        email : "alice@gmail.com",
        password : hash,
        profile : "Account " + 0,
        created : new Date()
    })

    for(let i = 2 ; i<number_of_users ; i++){
        let firstName = faker.name.firstName();
		let lastName = faker.name.lastName()
        let email = faker.internet.email();
        data.push({
            name : `${firstName} ${lastName}`,
			handle : `${firstName}${i}`,
            email : email,
            profile : "Account" + i,
			password : hash,
            created : new Date()
        })
    }

    try{
        return await db.collection("users").insertMany(data)
    }finally{
        console.log("User seeding done")
    }
}

async function seedFollows() {
	let sample = Math.floor((Math.random() * number_of_users) / 2) + 5;

	let randomUsers = await db
		.collection("users")
		.aggregate([
			{
				$match: {
					_id: {
						$not: { $eq: new ObjectId("63969fc7526a2ee4e61451db") },
					},
				},
			},
			{ $sample: { size: sample } },
		])
		.toArray();

	let followers = randomUsers.map(user => user._id);

	sample = Math.floor((Math.random() * number_of_users) / 2) + 5;
	randomUsers = await db
		.collection("users")
		.aggregate([
			{
				$match: {
					_id: {
						$not: { $eq: new ObjectId("63969fc7526a2ee4e61451db") },
					},
				},
			},
			{ $sample: { size: sample } },
		])
		.toArray();

	let following = randomUsers.map(user => user._id);

	try {
		await db.collection("users").updateOne(
			{ _id: new ObjectId("63969fc7526a2ee4e61451db") },
			{
				$set: { followers, following },
			},
		);

		for (let i = 0; i < following.length; i++) {
			await db.collection("users").updateOne(
				{ _id: new ObjectId(following[i]) },
				{
					$set: { followers: [new ObjectId("63969fc7526a2ee4e61451db")] },
				},
			);
		}

		for (let i = 0; i < followers.length; i++) {
			await db.collection("users").updateOne(
				{ _id: new ObjectId(followers[i]) },
				{
					$set: { following: [new ObjectId("63969fc7526a2ee4e61451db")] },
				},
			);
		}
	} finally {
		console.log("Done adding follows for user Alice");
	}
}

async function seed(){
    console.log("Started seeding users...");
	let users = await seedUsers();

	console.log("Started seeding follows for user Alice");
	await seedFollows();
}
seed()