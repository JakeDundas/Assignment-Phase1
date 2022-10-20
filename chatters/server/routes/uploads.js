const formidable = require("formidable");

module.exports = {
  upload: (req, res) => {
    const form = new formidable.IncomingForm({ uploadDir: "./userImages" });
    form.options.keepExtensions = true;

    form.on("error", (error) => {
      res.send({
        result: "failed",
        data: {},
        numberOfImages: 0,
        message: `Cannot upload image. Error is :${error}`,
      });
    });

    form.on("fileBegin", (name, file) => {
      file.path = file.uploadDir + "/" + file.name;
    });

    form.on("file", (field, file) => {
      res.send({
        result: "OK",
        data: { filename: file.newFilename, size: file.size },
        numberOfImages: 1,
        message: `Upload successfully`,
      });
    });

    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      console.log(files);
      if (err) {
        console.log("Error parsing the files");
        return res.status(400).json({
          status: "Fail",
          message: "There was an error parsing the files",
          error: err,
        });
      }
    });
  },
};
