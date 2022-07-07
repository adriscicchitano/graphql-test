import { result } from "lodash";

const users = [
  {
    firstName: "Adrian",
    lastName: "Scicchitano",
    email: "adrian.scicchitano@gmail.com",
    password: "1234"
  },
  {
    firstName: "Jose",
    lastName: "Perez",
    email: "jose.perez@gmail.com",
    password: "1234"
  },
  {
    firstName: "Marcos",
    lastName: "Maidana",
    email: "marcos.maidana@gmail.com",
    password: "1234"
  }
]

const resolvers = {
  Query: {
    currentUser: (_, args) => {return users[0]},
    existsUser: (_, args) => {
      const {email, password} = args
      const result = users.filter(user => user.email === email && user.password === password)
      if (result.length === 0) throw new Error("User with data passed as argument does not exists")
      else if (result.length > 1) throw new Error("More than one user with that data passed as argument exist")
      else return result[0]
    }
  },
  Mutation: {
    addUser: (_, args) => {
      const newUser = {...args}
      if (users.filter(user => user.email === newUser.email).length > 0) 
        throw new Error(`User with email ${newUser.email} already exists`)
      users.push(newUser)
      return newUser
    }
  }
};

export default resolvers;