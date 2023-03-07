/**
 * 开发时，项目启动
 */
import { createServer, defineConfig } from 'vite';
import path from 'path';
import net from 'net';
import http from 'http';

function getRandomPort() {
  const server = net.createServer();
  return new Promise<number>((resolve, reject) => {
    server.on('error', reject);
    server.listen(0, () => {
      const { port } = server.address() as net.AddressInfo;
      server.close(() => {
        resolve(port);
      });
    });
  });
}

(async () => {
  const WebPort = await getRandomPort();

  const nodeServer = await createServer({
    configFile: path.join(__dirname, 'vite.config.node.ts')
  });
  nodeServer.config.env.WebPort = WebPort;

  await nodeServer.listen();

  const webServer = await createServer({
    configFile: path.join(__dirname, 'vite.config.web.ts'),
    server: {
      port: WebPort,
      hmr: {
        port: WebPort
      }
    }
  });
  await webServer.listen();

  nodeServer.printUrls();

  // 请求服务，以生效当前server
  http.request(`http://127.0.0.1:${nodeServer.config.server.port}`).end();
})();

export default defineConfig({
  logLevel: 'silent'
});
