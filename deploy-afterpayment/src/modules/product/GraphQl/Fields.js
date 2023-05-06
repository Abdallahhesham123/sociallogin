import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import ProductModel from "../../../../DB/model/Product.model.js";
import { ProductTypesGraphQl } from "./ProductTypes.js";
import cloudinary from "../../../utils/cloudinary.js";

export const productFields = {
  type: new GraphQLObjectType({
    name: "CustomProductType",
    discribtion: "Custom",
    fields: {
      message: { type: GraphQLString },
      ProductList: { type: new GraphQLList(ProductTypesGraphQl) },
    },
  }),
  resolve: async () => {
    const products = await ProductModel.find({}).populate([
      {
        path: "brandId",
        ref: "Brand",
      },
    ]);
    return {
      message: "Congratulation ,Products Found Successfully",
      ProductList: products,
    };
  },
};

export const productById ={

    type: new GraphQLObjectType({
        name: "CustomItemType",
        discribtion: "Custom Item Type",
        fields: {
          message: { type: GraphQLString },
          Product: {
            type: ProductTypesGraphQl,

          },
        },
      }),
      args:{
        id :{type :new GraphQLNonNull(GraphQLID)}
    },
    resolve: async (parent , args) => {
        const product = await ProductModel.findById(args.id)
        .populate([
          {
            path: "brandId",
            ref: "Brand",
          },
          {
            path:"createdBy",
            ref:"User"
          }
        ]);
        return {
          message: "Congratulation ,Product Found Successfully",
          Product: product,
        };
      },

}


export const UpdateStock ={
    type: new GraphQLObjectType({
        name: "UpdateItemType",
        discribtion: "Update Item Type",
        fields: {
          message: { type: GraphQLString },
          Product: {
            type: ProductTypesGraphQl,

          },
        },
      }),
      args:{
        id :{type :new GraphQLNonNull(GraphQLID)},
        stock:{type :new GraphQLNonNull(GraphQLInt)}
    },
    resolve: async (parent , args) => {
        const {id,stock} = args
        const updateProduct = await ProductModel.findByIdAndUpdate(id ,{stock} , {new:true})
       
        return {
          message: "Congratulation ,Product Updated Successfully",
          Product: updateProduct,
        };
      },

}

export const DeleteById ={
    type: new GraphQLObjectType({
        name: "DeleteItem",
        discribtion: "Delete Item Type",
        fields: {
          message: { type: GraphQLString },
          Product: {
            type: ProductTypesGraphQl,

          },
        },
      }),
      args:{
        id :{type :new GraphQLNonNull(GraphQLID)}
    },
    resolve: async (parent , {id}) => {
        
        const ProductDeleted = await ProductModel.findByIdAndDelete(id , {new:true})
        // await cloudinary.uploader.destroy(ProductDeleted?.mainImage?.public_id);
        // if (req.files?.subImages?.length) {
        //     for (const filedeleted of ProductDeleted.subImages) {
        //       await cloudinary.uploader.destroy(filedeleted.public_id)
        //     }
        // }
        return {
          message: "Congratulation ,Product Deleted Successfully",
          Product: ProductDeleted,
        };
      },

}

