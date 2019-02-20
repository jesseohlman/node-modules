 const fs = require("fs");

 function done(output){
     process.stdout.write(output);
     process.stdout.write("\nprompt > ");
 }

 function firstNLines(output, num){
    var linesArray = output.split(/\n/);
    const choppedArray = linesArray.splice(0, num);
    process.stdout.write(choppedArray.join('\n'));
    process.stdout.write("\nprompt > ");
 }

 function lastNLines(output, num){
    var linesArray = output.split(/\n/);
    const choppedArray = linesArray.splice((linesArray.length - num));
    process.stdout.write(choppedArray.join('\n'));
    process.stdout.write("\nprompt > ");
 }

 function evaluateCmd(userInput){

    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch(command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1,2), userInputArray.slice(2));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1,2), userInputArray.slice(2));
            break;
        default:
            process.stdout.write(`${command}` + ` is not a valid command.`);
            process.stdout.write("\nprompt > ");
    }
 }

 const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
        },
    "cat": function(filePath){
        const fileName = filePath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
            });
        },
    "head": function(filePath, lines){
        fileName = filePath[0];
        numberOfLines = lines[0];
        fs.readFile(fileName, "utf8", (err, data) => {
            if(err) throw err;
            firstNLines(data, numberOfLines);
        })
        },
    "tail": function(filePath, lines){
        fileName = filePath[0];
        numberOfLines = lines[0];
        fs.readFile(fileName, "utf8", (err, data) => {
            if(err) throw err;
            lastNLines(data, numberOfLines);
        })
        },
    };

 module.exports = {commandLibrary, evaluateCmd};