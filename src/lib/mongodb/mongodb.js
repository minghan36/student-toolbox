import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const connections = {};

export async function connectToDatabase(dbName) {
  if (connections[dbName]) {
    return connections[dbName];
  }

  const dbUri = process.env.MONGODB_URI + dbName;
  const dbConnection = await mongoose.createConnection(dbUri).asPromise();

  connections[dbName] = dbConnection;
  return dbConnection;
}

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    animal: String,
    events: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        backgroundColor: { type: String, default: "#3788d8" },
        borderColor: { type: String, default: "#3788d8" },
      },
    ],
    courses: [
      {
        courseName: { type: String, required: true },
        id: { type: String, required: true },
        gradePoint: { type: Number, default: null },
        totalAchieved: { type: Number, default: 0 },
        averageAchieved: { type: Number, default: 0 },
        courseGrade: { type: String, default: "NA" },
        assignments: [
          {
            id: { type: String, required: true },
            name: { type: String, default: "" },
            grade: { type: String, default: "" },
            weight: { type: String, default: "" },
          },
        ],
      },
    ],
    todos: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, required: true },
      },
    ],
  },
  {
    methods: {
      comparePassword: function (password) {
        return bcryptjs.compareSync(password, this.password);
      },
    },
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = bcryptjs.genSaltSync(10);
    this.password = bcryptjs.hashSync(this.password, salt);
  }
});

export async function createUserModel() {
  const db = await connectToDatabase("user_data");
  return db.model("User", userSchema);
}
