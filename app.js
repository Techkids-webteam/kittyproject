var functions = require('./libs/functions.js');
var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jade = require('jade'),
  path = require('path'),
  multipart = require('connect-multiparty'),
  fs = require('fs'),
  multipartMiddleware = multipart();

// mongoose.connect(config.db);
mongoose.connect('mongodb://techkids:codethechange@ds021751.mlab.com:21751/techkids');
var dbMongo = mongoose.connection;
dbMongo.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});
// ------------dữ liệu-----------------------
// var models = glob.sync(config.root + '/app/models/*.js');
// models.forEach(function (model) {
//   require(model);
// });
var PostSchema = mongoose.Schema({
	title : String,
	slug : String,
	picture : String,
	teaser : String,
	content : String,
	author: String,
	time : Number
});
// ---- kiểm tra tình trạng kết nối mongo -----
var Post = mongoose.model('Post', PostSchema);
dbMongo.on('error', console.error.bind(console, 'connection error:'));
dbMongo.once('open', function(){
	console.log('MongoDb connected');
});

//=========================================================
//app init
var app = express();
// the directory where the template files are located.
// var viewPath = path.join(__dirname, 'app/views/');
// var viewPath ='/views'
// app.set('views', viewPath);
// the template engine to use.
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
//upload folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/pictures/', express.static(__dirname + '/public/upload/'));
//=========================
var router = express.Router();
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use('/', router);
//========================================
//<------------------static---------------------------------------------------->

// Đường dẫn tới thư mục pulic
//app.use('/cms/', express.static(__dirname + '/public/'));
app.use('/cms',express.static(path.join(__dirname, 'public')));

// =================demo hệ thống mới==============
app.use(bodyParser.urlencoded({
  	extended: true
}));

// Handle request
app.get('/test', function(req, res){

	var posts = Post.find({}, function(err, result) {

		// Sort by blog latest  khó hiểu
		result = result.sort({'id' : -1});

		res.render('test', { title : 'Home page' , posts : result, functions : functions});
	});

});

app.get('/post/:title/:id.html', function(req, res) {

	var id = req.params.id || 0;

	Post.findById(id, function(err, post) {

		if(post) {
			res.render('post/detail', {title : post.title, post : post});
			return false;
		}

		res.render('error');
	});

});

app.get('/create-post', function(req, res) {
	res.render('post/create', { title : 'Create a post' });
});

app.post('/create-post', multipartMiddleware, function(req, res) {

	var post = new Post;
	post.title = req.body.title;
	post.slug = functions.removeAccent(req.body.title);
	post.teaser = req.body.teaser;
	post.content = req.body.content;

	var file = req.files.picture;

	var originalFilename = file.name;
	var fileType         = file.type.split('/')[1];
	var fileSize         = file.size;
	var pathUpload       = __dirname + '/public/upload/' + originalFilename;

	var data = fs.readFileSync(file.path);
	fs.writeFileSync(pathUpload, data);

	if( fs.existsSync(pathUpload) ) {
		post.picture = originalFilename;
	}

	post.save(function(err, obj) {
		if(!err) {
			res.render('post/create', { status : 'success', message : 'Post successful!' });
			return false;
		}
	});
});


//----------------------------route ------------------------------------------//
app.get('/summer-code-camp', function(req,res) {
  res.sendFile(__dirname + '/public/Summer Camp/index.html');
});
app.get('/chia-se/tai-lieu/chia-se-sach-cho-dan-lap-trinh-vien', function (req, res) {
  res.render('articles-1');
});
app.get('/chuong-trinh/su-kien/english-and-it-why-how-what', function (req, res) {
  res.render('events-1');
});
app.get('/chuong-trinh/su-kien/de-co-01-nam-kinh-nghiem-sinh-vien-it-nen-lam-the-nao', function (req, res) {
  res.render('events-2');
});
app.get('/chuong-trinh/su-kien/tim-kiem-nhung-dua-tre-cong-nghe-2016', function (req, res) {
  res.render('events-3');
});
app.get('/chuong-trinh/su-kien/hoc-lap-trinh-mien-phi-1-thang', function (req, res) {
  res.render('events-4');
});
app.get('/chuong-trinh/su-kien/coding-work-shop-2', function (req, res) {
  res.render('events-5');
});
app.get('/chuong-trinh/su-kien/free-training-google-apps', function (req, res) {
  res.render('events-6');
});
app.get('/chuong-trinh/su-kien/keu-goi-500-ae', function (req, res) {
  res.render('events-7');
});
app.get('/chuong-trinh/su-kien/coding-workshop-learn-to-code-should-i', function (req, res) {
  res.render('events-8');
});
app.get('/chuong-trinh/su-kien/coding-for-women', function (req, res) {
  res.render('events-9');
});
app.get('/chuong-trinh/su-kien/workshop-c4e', function (req, res) {
  res.render('events-10');
});
// create a route to render the index.jade file.
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/shit', function (req, res) {
  res.render('index2');
});

// create a route to render the about-us.jade file.
app.get('/about-us', function (req, res) {
  res.render('about-us');
});
app.get('/ve-chung-toi', function (req, res) {
  res.render('about-us');
});
// create a route to render the courses.jade file.
app.get('/courses', function (req, res) {
  res.render('courses');
});
app.get('/khoa-hoc', function (req, res) {
  res.render('courses');
});

// create a route to render the contact.jade file.
app.get('/contact', function (req, res) {
  res.render('contact');
});
app.get('/lien-he', function (req, res) {
  res.render('contact');
});
// create a route to render the event.jade file.
app.get('/events', function (req, res) {
  res.render('events');
});
app.get('/chuong-trinh', function (req, res) {
  res.render('events');
});
// create a route to render the articles.jade file.
app.get('/articles', function (req, res) {
  res.render('articles');
});
app.get('/chia-se/', function (req, res) {
  res.render('articles');
});
// create a route to render the portfolio.jade file.
app.get('/portfolio', function (req, res) {
  res.render('portfolio');
});
// we have to create router here
// CREATE ROUTER
//==================================
// get an instance of router
var router_instructors = express.Router();

// create a route to render the intructors-1.jade file.
router_instructors.get('/1', function (req, res) {
  res.render('instructors-1');
});

router_instructors.get('/2', function (req, res) {
  res.render('instructors-2');
});

router_instructors.get('/3', function (req, res) {
  res.render('instructors-3');
});

router_instructors.get('/4', function (req, res) {
  res.render('instructors-4');
});

router_instructors.get('/le-hoang-tu', function (req, res) {
  res.render('instructors-1');
});

router_instructors.get('/bui-xuan-canh', function (req, res) {
  res.render('instructors-2');
});

router_instructors.get('/do-anh-tu', function (req, res) {
  res.render('instructors-3');
});

router_instructors.get('/nguyen-tien-dat', function (req, res) {
  res.render('instructors-4');
});

router_instructors.get('/nguyen-si-thanh-son', function (req, res) {
  res.render('instructors-5');
});

router_instructors.get('/ton-hong-duc', function (req, res) {
  res.render('instructors-6');
});

router_instructors.get('/tran-quang-hiep', function (req, res) {
  res.render('instructors-7');
});

router_instructors.get('/cuong-nguyen', function (req, res) {
  res.render('instructors-8');
});

router_instructors.get('/le-tien-dung', function (req, res) {
  res.render('instructors-9');
});

router_instructors.get('/ta-hoang-minh', function (req, res) {
  res.render('instructors-10');
});

router_instructors.get('/nguyen-quang-huy', function (req, res) {
  res.render('instructors-11');
});

router_instructors.get('/nguyen-quang-huy', function (req, res) {
  res.render('instructors-11');
});

// Đường dẫn tới thư mục pulic, static file cho instructor
router_instructors.use('/cms/', express.static(__dirname + '/public/'));

app.use('/instructors',router_instructors)
app.use('/giang-vien',router_instructors)
//router cho courses
//-------------------
// get an instance of router
var router_courses = express.Router();

// create a route to render the intructors-1.jade file.
router_courses.get('/1', function (req, res) {
  res.render('courses-1');
});

router_courses.get('/2', function (req, res) {
  res.render('courses-2');
});

router_courses.get('/3', function (req, res) {
  res.render('courses-3');
});

router_courses.get('/4', function (req, res) {
  res.render('courses-4');
});

router_courses.get('/code-for-everyone', function (req, res) {
  res.render('courses-1');
});

router_courses.get('/iOS', function (req, res) {
  res.render('courses-2');
});

router_courses.get('/android', function (req, res) {
  res.render('courses-3');
});

router_courses.get('/web-fullstack', function (req, res) {
  res.render('courses-4');
});

router_courses.get('/code-for-kids', function (req, res) {
  res.render('courses-5');
});

router_courses.get('/test', function (req, res) {
  res.render('test');
});

// Đường dẫn tới thư mục pulic, static file cho instructor
router_courses.use('/cms/', express.static(__dirname + '/public/'));

app.use('/courses',router_courses)
app.use('/khoa-hoc',router_courses)
//===================================
//router cho articles
//-------------------
// get an instance of router
var router_articles = express.Router();

// create a route to render the intructors-1.jade file.
router_articles.get('/chia-se-sach-cho-dan-lap-trinh-vien', function (req, res) {
  res.render('articles-1');
});

// Đường dẫn tới thư mục pulic, static file cho instructor
router_articles.use('/cms/', express.static(__dirname + '/public/'));

app.use('/chia-se/',router_articles)
//===================================
//===================================
//router cho events
//-------------------
// get an instance of router
var router_events = express.Router();


// create a route to render the intructors-1.jade file.
router_events.get('/english-and-it-why-how-what', function (req, res) {
  res.render('events-1');
});

// Đường dẫn tới thư mục pulic, static file cho instructor
router_events.use('/cms/', express.static(__dirname + '/public/'));

app.use('/chuong-trinh/',router_events)
//===================================

app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get((req, res,err) => {
        res.render('error'); // render jade file: views/error
        console.log({err,data});
});

app.route('/*')
    .get((req, res, err) => {
        res.render('error');
        console.log({err,data});
    });
//</ FIXME:--------------------------route ----------------------------------------->//



// TODO:app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
console.log('so sad')

require('./config/express')(app, config);
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
