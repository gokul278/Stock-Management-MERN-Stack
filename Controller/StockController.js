const StockModel = require("../Models/StockModel");

const getStock = async (req, res) => {
  try {
    const stocks = await StockModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ status: "success", stocks: stocks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createNewStock = async (req, res) => {
  const { product_name, product_description, product_stocks, product_price } =
    req.body;

  try {

    const getdata = await StockModel.find({ product_name: product_name });

    if (getdata.length > 0) {
      return res.status(200).json({ status: "error", message: "Product Name Already Used" });
    } else {
      await StockModel.create({
        product_name: product_name,
        product_description: product_description,
        product_stocks: product_stocks,
        product_price: product_price,
      });

      return res.status(200).json({ status: "success", message: "Stock Added Successfully" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const searchStock = async (req, res) => {

  const { product_name } = req.body;

  try {

    const products = await StockModel.find({
      product_name: { $regex: product_name, $options: "i" }
    });

    return res.status(200).json({ status: "success", stocks: products });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }

}

const removeStock = async (req, res) => {
  const { product_id } = req.body;

  try {
    await StockModel.deleteOne({ _id: product_id });

    return res.status(200).json({ status: "success", message: "Stock Successfully Removed!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


const updateStock = async (req, res) => {
  const { product_id, product_name, product_description, product_stocks, product_price } =
    req.body;

  try {

    const getdata = await StockModel.find({ product_name: product_name });

    if (getdata.length > 0) {
      if(getdata[0]._id == product_id){
        await StockModel.updateOne(
          { _id: product_id },
          {
            $set: {
              product_name: product_name,
              product_description: product_description,
              product_stocks: product_stocks,
              product_price: product_price
            }
          }
        )
      }else{
        return res.status(200).json({ status: "error", message: "Product Name Already Exits!" });
      }
      
    } else {
      await StockModel.updateOne(
        { _id: product_id },
        {
          $set: {
            product_name: product_name,
            product_description: product_description,
            product_stocks: product_stocks,
            product_price: product_price
          }
        }
      )
    }

    return res.status(200).json({ status: "success", message: "Stock Successfully Updated!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getStock, createNewStock, searchStock, removeStock, updateStock };
