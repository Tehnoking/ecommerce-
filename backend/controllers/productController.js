const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander");

exports.createProduct = async (req, res, next) => {

const product = await Product.create(req.body);


res.status(201).json({
  success: true,
  product
});

}

exports.getAllProducts = async(req,res)=>{

  const products = await Product.find()
    res.status(200).json({
     
      success: true,
  products
})}

exports.getProductByDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next (new ErrorHander("Product not found",404))
  }res.status(200).json({
    success: true,
    product
  })
  
}

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id)
if(!product){
  return res.status(500).json({
    success: false,
    message: "Product not found"
  })
}
product = await Product.findByIdAndUpdate(req.params.id,req.body,{
  new:true,
runValidators:true,
useFindAndModify:false})

res.status(200).json({
  success: true,
  product
})
}

// 

// exports.deleteProduct = (async (req, res, next) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return next(new ErrorHander("Product not found", 404));
//   }

//   // Deleting Images From Cloudinary
  
//   await product.remove();
//   console.log(product)

//   res.status(200).json({
//     success: true,
//     message: "Product Delete Successfully",
//   });
// });

exports.deleteProduct = (async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  
  await Product.deleteOne({ _id: req.params.id });
  console.log(product)

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

