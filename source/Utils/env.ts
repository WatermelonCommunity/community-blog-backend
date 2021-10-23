import { config } from "dotenv";
import { Logger } from "./logger";


class env {
  constructor() {
    try {
      this.load();
      Logger.sucess("Variables de entorno cargadas");
    } catch (err) {
      Logger.error("Error en la carga de las variables de entorno");
      process.exit(1);
    }
  }
  load() {
    config();
  }
}
export const Env = new env();
