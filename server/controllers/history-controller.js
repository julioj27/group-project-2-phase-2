const { History } = require('../models/index');

class HistoryController {
    static async getPlayerHistoryHandler(req, res, next) {
        const userId = req.userLogin.id;

        try {
            const history = await History.findAll({
                where: {
                    UserId: userId
                }
            });

            res.status(200).json(history);
        } catch (error) {
            next(error);
        }
    }

    static async postPlayerHistoryHandler(req, res, next) {
        const objHistory = {
            UserId: req.userLogin.id,
            score: req.body.score
        };

        try {
            const history = await History.create(objHistory);

            res.status(201).json(history);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = HistoryController;