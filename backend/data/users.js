import bcrypt from "bcryptjs";
const users = [
  {
    name: "Sean Madzelonka",
    email: "smadzelonka@gmail.com",
    password: bcrypt.hashSync("California88", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@john.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@jane.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
