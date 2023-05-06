import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import * as productControllerGraph from "./Fields.js";

export const productSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:"ProductQueryWithoutSpace",
        description:"Handle GraphQl Api Inside Product Module",
        fields:{
            products:productControllerGraph.productFields,
            productById : productControllerGraph.productById
        }

    }),
    mutation :new GraphQLObjectType({
        name:"ProductMutationWithoutSpace",
        description:"Handle GraphQl Api Inside Product Module Mutation",
        fields:{
            UpdateStock:productControllerGraph.UpdateStock,
            DeleteById:productControllerGraph.DeleteById,
        }

    })





})