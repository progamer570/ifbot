import env from "../services/env.js";
function sendRequest() {
    fetch(env.otherDomain)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then(function (data) {
        console.log(data);
    })
        .catch(function (error) {
        console.error("Error:", error);
    });
}
export default sendRequest;
