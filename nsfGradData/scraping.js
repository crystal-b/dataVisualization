var cheerio = require('cheerio');
var request = require('request');
var servi = require("servi");
var app = new servi(true);

port(3001);

//set up database
var db = useDatabase("schoolRankings");
var pages  = 8;
var url = ['http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings', 'http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings/page+2', 'http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings/page+3', 'http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings/page+4', 'http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings/page+5', 'http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings/page+6', 'http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings/page+7', 'http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings/page+8'];

//loop to get all page urls
for(i = 0; i < pages; i++) {
	request(url[i], function(error, response, body) {
		//error handling
		if(error) {
			console.log(error);
		}
		//load url and search for data
		$ = cheerio.load(body);
		$('tr').each(function() {
			var school = ($(this).find('.school-name').text());
			var score = ($(this).find('.rankscore-bronze').text());
			//create an object for each school
			var schoolRanking = {
				school: school,
				score: score
			};
			//add object to database
			db.add(schoolRanking);
		});
	});
}

//set up routes
route('/all', showAll);
route('/max/:num', showScrapedData);
serveFiles('public');

//show all
function showAll(request) {
	db.getAll(function(data) {
		request.header("application/json");
		request.respond(JSON.stringify(data));
	});
}

//show scraped data
function showScrapedData(request) {
	var num = request.params.num;

	db.getAll(function(data) {
		var scrapedData = [];
		listings.push(data[i]);
		request.header("application/json");
		request.respond(JSON.stringify(scrapedData));
	});
}

start();








