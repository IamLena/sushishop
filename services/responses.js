module.exports = {
	ok_200: (res, m_data) => {
		return res.status(200).json({
			data: m_data
		});
	},
	nocontent_204: (res, location_path) => {
		return res.status(204).location(location_path);
	},
	bad_request_400: (res, error) => {
		return res.status(400).json({
			message: "Bad request, invalid body",
			error: error
		})
	},
	unauth_401: (res, error) => {
		return res.status(401).json({
			message: "Authorization required.",
			error: error
		})
	},
	notfound_404: (res, error) => {
		return res.status(404).json({
			message: "Resource not found. Probably wrong id.",
			error: error
		})
	},
	serunav_503: (res, error) => {
		return res.status(500).json({
			message: "Database connection error.",
			error: error
		});
	},
	error_500: (res, error) => {
		return res.status(500).json({
			message: "Internal server error",
			error: error
		});
	}
}
