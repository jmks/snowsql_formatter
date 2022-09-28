const fs = require("fs/promises");

const glob = require("glob");

const sqlFormatter = require("snowsql-formatter");

const options = {
    language: "sql",
    indent: "    ",
    uppercase: false,
    linesBetweenQueries: 2,
};

const format = async (path) => {
    try {
        const data = await fs.readFile(path, "utf8");

        // TODO: this doesn 't seem to follow the options correctly
        const formatted = sqlFormatter.format(data, options);

        if (data != formatted) {
            await fs.writeFile(path, formatted);
            console.log("Formatted " + path);
        }
    } catch (err) {
        console.log(err);
    }
};

glob("**/*.sql", (err, files) => {
    if (err != null) {
        console.log(err);
        return;
    }

    if (files.length == 0) {
        console.log("Found no .sql files to format");
    } else {
        files.forEach(format);
    }
});
