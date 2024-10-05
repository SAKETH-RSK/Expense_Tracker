const IncomeSchema = require('../models/IncomeModel')

exports.addIncome = async (req, res) => {
    const {title,amount,category,description,date} = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try{
        if(!title||!category||!description||!date){
            return res.status(400).json({msg:"Please fill in all fields"})
        }
        if(amount<=0||!amount==='number'){
            return res.status(400).json({msg:"Please enter a valid amount"})
        }
        await income.save()
        res.status(200).json({msg:"Income added successfully"})
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
    console.log(income)
} 


exports.getIncomes= async (req, res) => {
    try{
        const incomes = await IncomeSchema.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income) =>{
    res.status(200).json({msg:'Income deleted.'})
    })
    .catch((error) =>{
        res.status(500).json({msg:'Server error'})
    })
}