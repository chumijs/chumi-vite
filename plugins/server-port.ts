import { PluginOption } from 'vite';

export default function viteServerPort() {
  return {
    name: 'server-port',
    config(config) {
      return {
        define: {
          'process.env.NODE_PORT': JSON.stringify(config.server.port)
        }
      };
    }
  } as PluginOption;
}
