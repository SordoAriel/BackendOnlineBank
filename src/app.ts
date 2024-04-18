import * as moduleAlias from "module-alias";
const sourcePath = "src";
moduleAlias.addAliases({
    "@server": sourcePath,
    "@config": `${sourcePath}/config`,
    "@controllers": `${sourcePath}/controllers`,
    "@models": `${sourcePath}/models`,
    "@routes": `${sourcePath}/routes`,
    "@services": `${sourcePath}/services`,
    "@utils": `${sourcePath}/utils`,
    "@constants": `${sourcePath}/constants`,
});
import "dotenv/config";
import { createServer } from "@config/server";
import { host, port } from "@constants/server";
import http from "http";
import { AddressInfo } from "net";
import { connDB } from "@config/database";

const startServer = async (): Promise<void> => {
    connDB();
    const app = await createServer();
    const server = http.createServer(app).listen({ host, port }, () => {
        const address = server.address() as AddressInfo;
        console.log(`servidor corriendo en ${address.address}:${address.port}`);
    });
};

startServer();
