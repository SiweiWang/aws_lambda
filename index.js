console.log('Loading AWS Lambda function');

var aws = require("aws-sdk");
var s3 = new aws.S3 ({apiVersion: '2006-03-01' });

exports.handler = function(event, context) {
    // TODO implement
    console.log(JSON.stringify(event, null, 2));
    
    var bucket = event.Records[0].s3.bucket.name;
    var key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    console.log(key);

    var params = {
        Bucket:bucket,
        Key:key
    };
    
    s3.getObject(params, function(err, data) {
        if (err) {
            console.log(err);
            var message = "Error getting object " + key + " from bucket " + bucket;
            console.log(message);

            context.fail(message);
        } else {
            console.log("CONTENT TYPE:", data.ContentType);
            console.log("Last Modified", data.LastModified);

            context.succeed(date);
        }
        
    })
    

};