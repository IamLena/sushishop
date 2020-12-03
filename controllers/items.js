const itemService = require("../services/items");
const responses = require("../services/responses");
const url = require('url');

function fullUrl(req) {
	return url.format({
		protocol: req.protocol,
		host: req.get('host'),
		pathname: req.originalUrl
	});
}

const itemController = {
	addItem: (req, res) => {
		itemService.addItem(req.body, (error) => {
			if (error.code == "ER_BAD_FIELD_ERROR")
				return responses.bad_request_400(res, error);
			if (error.code == "ECONNREFUSED")
				return responses.serunav_503(res, error);
			if (error.code == "NOTFOUND")
				return responses.notfound_404(res, error);
			// if (error.code == "ER_PARSE_ERROR")
			if (error)
				return responses.error_500(res, error);
			return responses.ok_204(res, ``);
		});
	},
	getItems: (req, res) => {
		const filters = req.query;
		itemService.getItems(filters, (error, results) => {
			if (error.code == "ECONNREFUSED")
				return responses.serunav_503(res, error);
			if (error)
				return responses.error_500(res, error); //how to distinguish between 503???
			return responses.ok_200(res, results);
		});
	},
	getItemById: (req, res) => {

	},
	updateItemById: (req, res) => {

	},
	deleteItemById: (req, res) => {

	}
};

module.exports = itemController;
