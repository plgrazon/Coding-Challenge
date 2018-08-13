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

const receiveImage = (call, callback) => {
  console.log('Server received ', call.request.image);

  callback(null, {image: 'Server processed ' + call.request.image});
}

const main = () => {
  const server = new grpc.Server();
  server.addService(proto.image.Image.service,
    { receiveImage: receiveImage }
  );
  server.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('Server connected to PORT 3000');
}

main();
