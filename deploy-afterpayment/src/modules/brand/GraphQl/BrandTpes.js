
import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";


export const imageTypeBrand = new GraphQLObjectType({
    name: "BrandImage",
    description: "Product Image",
    fields: {
      secure_url: { type: GraphQLString },
      public_id: { type: GraphQLString },
    },
  });
  
export const BrandType = new GraphQLObjectType({
    name: "brandType",
    discription: "Brand Types",
    fields: {
      _id:{ type : GraphQLID },
      name: { type: GraphQLString },
      image: { type: imageTypeBrand },
    },
  })