import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./helloworld";
import { HelloReply, HelloRequest } from "@/proto/helloworld_pb";

const PROTO_PATH = "./helloworld.proto";

// 加载 gRPC 包
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
const greeter = new protoDescriptor.helloworld.Greeter(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export function sayHello() {
  const user = "world";
  const request = new HelloRequest();
  greeter.sayHello(request, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Greeting:", response.getMessage());
    }
  });
}
