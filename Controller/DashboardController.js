const BillingSchema = require("../Models/BillingModel");

const getDashboard = async (req, res) => {

    const { year, month } = req.body;

    const startDate = new Date(year, month - 1, 2);
    startDate.setHours(0, 0, 0, 0);
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);
    const formattedEndDate = endDate.toISOString().slice(0, 10);


    try {
        const getData = await BillingSchema.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        }).sort({ createdAt: -1 });


        let totalsalesamount = 0;
        let totalsalesstock = 0;

        getData.forEach(element => {
            totalsalesamount += element.total_billvalue
            element.products.forEach(product => {
                totalsalesstock += product.quantity
            });
        });

        let initialDate = new Date(formattedStartDate);
        const dates = [];
        const amounts = [];
        const stocks = [];

        while (initialDate.toISOString().slice(0, 10) <= formattedEndDate) {
            dates.push(initialDate.toISOString().slice(0, 10));

            let st = new Date(initialDate.toISOString().slice(0, 10));
            st.setHours(0, 0, 0, 0)

            let end = new Date(initialDate.toISOString().slice(0, 10));
            end.setHours(23, 59, 59, 999);


            const currentdata = await BillingSchema.find({
                createdAt: {
                    $gte: st,
                    $lte: end,
                },
            });

            let amountvalue = 0;
            let stockvalue = 0;

            currentdata.forEach(element => {
                amountvalue += element.total_billvalue
                element.products.forEach(product => {
                    stockvalue += product.quantity
                });
                
            });

            amounts.push(amountvalue)
            stocks.push(stockvalue)

            initialDate.setDate(initialDate.getDate() + 1);
        }

        return res.status(200).json({ status: "success", totalsalesamount: totalsalesamount, totalsalesstock: totalsalesstock, dates: dates, amounts: amounts, stocks: stocks });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }

}

module.exports = { getDashboard };