const ExpenseSchema = require('../models/ExpenseModel')

exports.addExpense = async (req, res) => {
    const {title,amount,category,description,date} = req.body

    const income = ExpenseSchema({
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
        res.status(200).json({msg:"Expense added successfully"})
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
    console.log(income)
} 


exports.getExpenses= async (req, res) => {
    try{
        const expenses = await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(expenses)
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expenses) =>{
    res.status(200).json({msg:'Expense deleted.'})
    })
    .catch((error) =>{
        res.status(500).json({msg:'Server error'})
    })
}