import { PrismaClient } from ".prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

const typeDefs = gql`
  type Query: {
   movies: [Movie],
   movie(id:Int!): Movie
  },
  type Mutation {
    createMovie(title:String!, year:Int!, genre:String): Movie
    deleteMovie(id:Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) =>
      client.movie.create({ data: { title, year, genre } }),
    deleteMobie: (_, { id }) => client.movie.delete({ where: { id } }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("Server is running on http://localhost:4000/"));
