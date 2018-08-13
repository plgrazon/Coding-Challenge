const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../protos/image.proto';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(
    PROTO_PATH,
    options
  )
);

const main = () => {
  let client = new proto.image.Image(
    '0.0.0.0:3000',
    grpc.credentials.createInsecure()
  );

  let image = 'testing.jpg';

  client.receiveImage({image: image}, (err, res) => {
    if (err) {
      console.log('error handling image ', err);
    }
    console.log('Success: ', res.image);
  });
}

main();
