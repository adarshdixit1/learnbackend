const dashboardController = {

    async dashboard(req,res){
        try {
            res.status(201).send({ message: 'get data successfully' });
        } catch (error) {
            res.status(500).send({error:"Internal Server Error"})
        }
    },
}

module.exports = dashboardController;