import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";


export const imageTypeUser = new GraphQLObjectType({
    name: "UserImage",
    description: "User Image",
    fields: {
      secure_url: { type: GraphQLString },
      public_id: { type: GraphQLString },
    },
  });
  
export const UserType = new GraphQLObjectType({
    name: "userType",
    discription: "User Types",
    fields: {
      _id:{ type : GraphQLID },
      username: { type: GraphQLString },
      email : { type: GraphQLString },
      password: { type: GraphQLString },
      confirmEmail: { type: GraphQLBoolean},
      role:{type: GraphQLString},
      image: { type: imageTypeUser },
      
    },
  })