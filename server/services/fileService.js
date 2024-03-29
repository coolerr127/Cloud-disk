const fs = require("fs");
const config = require("config");

class FileService {
  createDir(file) {
    const filePath = `${config.get("filesPath")}\\${file.user}\\${file.path}`;

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exist" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }
}

module.exports = new FileService();
