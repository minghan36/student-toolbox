import bcryptjs from "bcryptjs"
import mongoose from "mongoose"

const connections = {}

export async function connectToDatabase(dbName) {
  if (connections[dbName]) {
    return connections[dbName]
  }

  const dbUri = process.env.MONGODB_URI + dbName
  const dbConnection = await mongoose.createConnection(dbUri).asPromise()

  connections[dbName] = dbConnection
  return dbConnection
}

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    methods: {
      comparePassword: function (password) {
        return bcryptjs.compareSync(password, this.password)
      },
    },
  }
)

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = bcryptjs.genSaltSync(10)
    this.password = bcryptjs.hashSync(this.password, salt)
  }
})

export async function createUserModel() {
  const db = await connectToDatabase("user_data")
  return db.model("User", userSchema)
}
