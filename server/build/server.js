"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const zhihu_1 = __importDefault(require("./routes/zhihu"));
const posts_1 = __importDefault(require("./routes/posts"));
const votes_1 = __importDefault(require("./routes/votes"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
app.use(cors_1.default());
app.use(express_1.default.json());
const uri = process.env.ATLAS_URI || "";
console.log(uri);
mongoose_1.default
    .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("MongoDB database connection established successfully.");
})
    .catch((error) => {
    console.log(`MongoDB database connection failed: ${error}`);
});
// routes
app.use("/api/v1/zhihu", zhihu_1.default);
app.use("/api/v1/post", posts_1.default);
app.use("/api/v1/vote", votes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
