const t_product = require('../model/product');
const t_user = require('../model/user');

exports.addUser = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const user = new t_user({
        username: req.body._username,
        email: req.body._email,
        password: req.body._password,
        gender: req.body._gender
    })

    user.save(user)
        .then(data => {
            console.log(data)
            res.send('Data has been added !');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}


exports.addProduct = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const product = new t_product({
        product: req.body._product,
        stock: req.body._stock
    })

    product.save(product)
        .then(data => {
            console.log(data)
            res.send('Data has been added !');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}


exports.searchUser = (req, res) => {
    const id = req.body._id;

    t_user.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ message: "Erro retrieving user with id " + id })
        })


}

exports.getUsers = (req, res) => {
    t_user.find({}, function(err, t_user) {
        var userMap = {};

        t_user.forEach(function(t_user) {
            userMap[t_user._id] = t_user;
        });

        res.send(userMap);
    });
}

exports.deleteUser = (req, res) => {
    const id = req.body._id;

    t_user.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

exports.updateUser = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.body._id;
    t_user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}