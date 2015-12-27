import marked from "marked";

let renderer = new marked.Renderer();

let getMod = (message) => {
    let mod = "";
    let re = /{([a-z]+)}/g;
    let modMatch = re.exec(message);
    if (modMatch !== null) {
        switch (modMatch[1]) {
            case "center":
                mod = "center aligned header";
                message = message.replace(/{([a-z]+)}/g, "");
                break;
            case "right":
                mod = "right aligned header";
                message = message.replace(/{([a-z]+)}/g, "");
                break;
            case "left":
                mod = "left aligned header";
                message = message.replace(/{([a-z]+)}/g, "");
                break;
            default:
                mod = "";
        }
        return {
            mod: mod,
            message: message
        };
    }
    else {
        return {
            mod: mod,
            message: message
        };
    }
};

let getModImage = (message) => {
    let mod = "";
    let re = /{([a-z]+)}/g;
    let modMatch = re.exec(message);
    if (modMatch !== null) {
        switch (modMatch[1]) {
            case "small":
                mod = "small";
                message = message.replace(/{([a-z]+)}/g, "");
                break;
            case "medium":
                mod = "medium";
                message = message.replace(/{([a-z]+)}/g, "");
                break;
            case "large":
                mod = "large";
                message = message.replace(/{([a-z]+)}/g, "");
                break;
            case "fluid":
                mod = "fluid";
                message = message.replace(/{([a-z]+)}/g, "");
                break;
            default:
                mod = "fluid";
        }
        return {
            mod: mod,
            message: message
        };
    }
    else {
        return {
            mod: mod,
            message: message
        };
    }
};

renderer.image = (href, title, text) => {
    let alterText = getModImage(text);
    return `<img class="ui centered ${alterText.mod} rounded image" src=${href}></img>`;
};

renderer.heading = (text, level) => {
    let alterText = getMod(text);
    return `<h${level} class="ui ${alterText.mod}">${alterText.message}</h${level}>`;
};

export default renderer;
