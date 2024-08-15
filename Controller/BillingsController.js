const BillingSchema = require("../Models/BillingModel");
const StockModel = require("../Models/StockModel")

const createBill = async (req, res) => {

    const { products } = req.body;

    try {

        let billid = 1001;

        const bills = await BillingSchema.find({});

        if (bills.length !== 0) {
            billid = 1000 + bills.length + 1;
        }

        const product_totalprice = products.reduce((acc, product) => {
            return acc + (product.quantity * product.product_price);
        }, 0);

        products.forEach(async (element) => {
            const getdata = await StockModel.findOne({ _id: element.product_id });
            const product_stocks = getdata.product_stocks - element.quantity;

            await StockModel.updateOne(
                { _id: element.product_id },
                {
                    $set: {
                        product_stocks: product_stocks
                    }
                }
            )
        });

        await BillingSchema.create({
            bill_id: billid,
            products: products,
            total_billvalue: product_totalprice
        });

        return res.status(200).json({ status: "success", message: "Successfully Bill Added", bill_id: billid });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


const getbill = async (req, res) => {

    try {
        const billings = await BillingSchema.find({}).sort({ createdAt: -1 });

        let totalsalesamount = 0;
        let totalsalesstock = 0;

        billings.forEach(element => {
            totalsalesamount += element.total_billvalue
            element.products.forEach(product => {
                totalsalesstock += product.quantity
            });
        });

        return res.status(200).json({ status: "success", billings: billings, totalsalesamount: totalsalesamount, totalsalesstock: totalsalesstock })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const setSearchDate = async (req, res) => {
    const { fromDate, toDate } = req.body;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    end.setDate(end.getDate() + 1);


    try {

        const getData = await BillingSchema.find({
            createdAt: {
                $gte: start,
                $lt: end
            }
        }).sort({ createdAt: -1 })

        let totalsalesamount = 0;
        let totalsalesstock = 0;

        getData.forEach(element => {
            totalsalesamount += element.total_billvalue
            element.products.forEach(product => {
                totalsalesstock += product.quantity
            });
        });

        return res.status(200).json({ status: "success", billings: getData, totalsalesamount: totalsalesamount, totalsalesstock: totalsalesstock })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = { createBill, getbill, setSearchDate };