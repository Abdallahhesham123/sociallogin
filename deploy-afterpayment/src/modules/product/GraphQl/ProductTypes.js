import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { BrandType } from "../../brand/GraphQl/BrandTpes.js";
import { UserType } from "../../user/GraphQl/UserType.js";

export const imageType = new GraphQLObjectType({
  name: "ProductImage",
  description: "Product Image",
  fields: {
    secure_url: { type: GraphQLString },
    public_id: { type: GraphQLString },
  },
});

export const ProductTypesGraphQl = new GraphQLObjectType({
  name: "ProductType",
  description: "Product type",
  fields: {
    _id:{ type : GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    slug: { type: GraphQLString },
    price: { type: GraphQLFloat },
    discount: { type: GraphQLString },
    finalPrice: { type: GraphQLString },
    stock: { type: GraphQLInt },
    colors: { type: new GraphQLList(GraphQLString) },
    size: { type: new GraphQLList(GraphQLString) },
    mainImage: { type: imageType },
    subImages: { type: new GraphQLList(imageType) },
    categoryId: { type: GraphQLID },
    subCategoryId: { type: GraphQLID },
    brandId: {
      type: BrandType
    },
    createdBy:{
      type:UserType
    }
  },
});
