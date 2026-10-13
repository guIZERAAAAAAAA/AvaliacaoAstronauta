import swaggerJSDoc from "swagger-jsdoc"


const opcoes = {
    definition:{
        openani:"3.0.0",
        info: {title: "API  de missoes espaciais", version : "1.0.0"}
    },
    apis:["./app.js"],
};



export default swaggerJSDoc(opcoes);