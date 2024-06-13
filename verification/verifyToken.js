const jwt=require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "3e9af42de397cfc9387a06972c28c23a1ac7e9a60fb6dc1f05295bc6057baf500672d4a13db5d04ea84bbc4c5679164a7723f3d49f516bb73dc3df6e3b768c8e";
const verifyAccessToken = (token) => {

    //checking for provided token 
    if (!token) {
        console.log("empty token provided");
        return { valid: false, "port": "401" };


    }
    // verify token 
    return jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Token verification failed
            console.log("invalid token provided");
            return { valid: false, "port": "401" };
        } else {

            return { valid: true, "decoded": decoded, port: 200 };
        }
    });


};
module.exports = verifyAccessToken;