const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require('fs');
const {Server} = require("socket.io");
const io = new Server(server);
const chokidar = require('chokidar');
const { S3 } = require("aws-sdk");
const s3 = new S3();

var bucket_list = [];

const PORT = process.env.PORT || 3000;

const log = console.log;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


async function* listAllKeys(opts) {
  opts = { ...opts };
  do {
    const data = await s3.listObjectsV2(opts).promise();
    opts.ContinuationToken = data.NextContinuationToken;
    yield data;
  } while (opts.ContinuationToken);
}

const opts = {
  Bucket: "e-ivettta-files" /* required */,
  // ContinuationToken: 'STRING_VALUE',
  // Delimiter: 'STRING_VALUE',
  // EncodingType: url,
  // FetchOwner: true || false,
  // MaxKeys: 'NUMBER_VALUE',
  // Prefix: 'STRING_VALUE',
  // RequestPayer: requester,
  // StartAfter: 'STRING_VALUE'
};

async function main() {
  // using for of await loop
  for await (const data of listAllKeys(opts)) {
    for (var i = 0; i < (data.Contents).length; i++){
		if ((data.Contents[i].Key).slice(0,1) != "t") {
			bucket_list.push(data.Contents[i].Key);
		}
	}
	
  }

}
main();


let timerId = setInterval(() => main(), 3600000);

io.on('connection', (socket) => {
	

	
	io.to(socket.id).emit('catalog_upd', bucket_list.sort().reverse());
	

});
	




server.listen(PORT, () => {
	log(`listening on *:${ PORT }`);
});