const item = require("../models/item");
const user = require("../models/user");
const exchange = require("../models/exchange");

exports.exchange = (req, res, next) => {
    let id = req.params.id;
    let user = req.session.user;
    let id2 = req.params.id2;
    Promise.all([user.findById(user), item.findById(id), item.findById(id2)])
        .then(results => {
            const [user, item1, item2] = results;
            if (!item1) {
                let err = new Error('Cannot find item with id \"' + id + '\"');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }
            if (!item2) {
                let err = new Error('Cannot find item with id \"' + id2 + '\"');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }
            if (!item1.owner.equals(user._id)) {
                let err = new Error('You are not the owner of this item');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }
            else {
                let ex = new exchange({
                    initiator: user,
                    responder: item2.author,
                    initiateItem: item1._id,
                    respondItem: item2._id,
                    status: "pending"
                });
                ex.save()
                    .then(result => {
                        console.log(result);
                        req.flash('success', 'Exchange request sent');
                        res.redirect('/users/profile');
                    }
                    )
                    .catch(err => next(err));
            }


        }
        )
        .catch(err => next(err));
}