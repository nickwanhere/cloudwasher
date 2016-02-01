var cloudinary = require('cloudinary');
var cloudinary_config = require('./config.js');

console.log(cloudinary_config.CLOUD_NAME);

cloudinary.config({ 
  cloud_name: cloudinary_config.CLOUD_NAME, 
  api_key: cloudinary_config.API_KEY, 
  api_secret: cloudinary_config.API_SECRET 
});

console.log('Start Cloudwasher');


var cursor = '';

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function() {
    

    cloudinary.api.resources(function(result){
          
          var public_ids = [];
          cursor = result.next_cursor;

          result.resources.forEach(function(resource){

              console.log('Public ID '+resource.public_id );
              public_ids.push(resource.public_id )

          });


              cloudinary.api.delete_resources(public_ids, function(del_result){

                  console.log(del_result);


              }, {keep_original:1});

      },{
      direction:1,
      max_results:100,
      next_cursor:cursor
      });


  },
  start: true,
  timeZone: 'Asia/Hong_kong'
});
job.start();
