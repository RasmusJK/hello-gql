import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    login(username: String!, password: String!): User
     user: User
  }
  type User {
    id: ID
    username: String
    full_name: String
    token: String
  }
  extend type Mutation {
    register(username: String!, password: String!): User
  }
  
`;