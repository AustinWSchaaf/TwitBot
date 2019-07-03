const Twit = require('twit')
const config = require('./config')
const bot = new Twit(config)

const artists = ['flumemusic', 'illeniummusic', 'whethanmusic', 'LouisTheChild']
const tfc = 'twentyfauxcarat'

const follower_count = 200

// milliseconds seconds minutes
const interval_time = 1000 * 60 * 1

// const {createServer} = require('http');
// const server = createServer(() => {});
// server.listen(3000);

// post a status

function tweet(status){
	bot.post('statuses/update', {
		status: status
	}, (err, data, response) => { 
		if (err){
			console.log(err)
		}else{
			console.log(status)
		}
	})
}


// get followers from user

function getFollowers(artist){
	bot.get('followers/list', {
		screen_name: artist, 
		count: follower_count
	}, (err, data, response) => {
		if (err){
		}else{
			data.users.forEach( user => {
				var screen_name = user.screen_name
				var follows = doesFollow(screen_name)

				if (!follows){
					follow(screen_name)
				}
			})
		}	
	})
}

// Follow user

function follow(name){
	bot.post('friendships/create', {
		screen_name: name
	}, (err, data, response) => {
		if (err){
			console.log(err)
		} else{
			// console.log(data)
		}
	})
}

// Check relationship

function doesFollow(user){
	bot.get('friendships/show', {
		source_screen_name: tfc,
		target_screen_name: user
	}, (err, data, response) =>{
		if(err){
			console.log(err)
		}else{
			var isFollowing = data.relationship.source.following
			console.log(isFollowing)
		}
	})
}

//isFriend(artists[0])

// unfollow user

function unfollow(user){
	bot.post('friendships/destroy',{
		screen_name: user
	}, (err, data, response) =>{
		if (err){
			console.log(err)
		}else{

		}
	})
}

// Begin program
var count = 0
function beginProgram(){

	// artists.forEach( artist => {
	// 	console.log(artist)
	// 	setInterval(getFollowers, interval_time, artist)
	// })
}

beginProgram()

// tester

function tester(){
	setInterval(tweet('Testing'), 1000 * 30)
}
// setInterval(tweet, 1000 * 30, 'hello')

// run program

// setInterval(beginProgram, interval_time)
