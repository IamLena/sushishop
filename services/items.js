const pool = require("../database/connection");
const { v4: uuidv4 } = require('uuid');

class Item {
	constructor(body) {
		this.id = uuidv4();
		this.name = body.name;
		this.price = body.price;
		this.img = body.img;
		this.composition = body.composition;
		this.ingredients = body.ingredients;
		this.weight = body.weight;
		this.quantity = body.quantity;
		this.spicy = body.spicy;
		this.hot = body.hot;
		this.category_id = body.category;
		this.popularity = body.popularity;
	}
};

const itemService = {
	addItem: (data, callback) => {
		pool.query(`select id from category where name = '${data.category}'`, (err, res) => {
			if (err)
				return callback(err);
			if (res.length == 0)
			{
				let e = new Error();
				e.code = "NOTFOUND"
				e.message = "no category with such name"
				return callback(e);
			}
			data.category = res[0].id;
			const newitem = new Item(data);
			pool.query(`insert into items set`, newitem, (error, results) => {
				if (error)
					return callback(error);
				return callback(null, results);
			});
		})
	},
	getItems: (filters, callback) => {
		let whereclauseflag = 0;
		let query = `select * from items`; // join with categories as category_id, category_name
		if (typeof filters.minprice !== 'undefined')
		{
			query += ` WHERE price > ${filters.minprice}`;
			whereclauseflag = 1;
		}
		if (typeof filters.maxprice !== 'undefined')
		{
			if (whereclauseflag)
				query += ` AND price < ${filters.maxprice}`;
			else
			{
				query += ` WHERE price < ${filters.maxprice}`;
				whereclauseflag = 1;
			}
		}
		if (typeof filters.ingredients !== 'undefined')
		{
			if (whereclauseflag)
				query += ` AND ingredients LIKE '%${filters.ingredients}%'`;
			else
			{
				query += ` WHERE ingredients LIKE '%${filters.ingredients}%'`;
				whereclauseflag = 1;
			}
		}
		if (typeof filters.spicy !== 'undefined')
		{
			if (whereclauseflag)
				query += ` AND spicy = ${filters.spicy}`;
			else
			{
				query += ` WHERE spicy = ${filters.spicy}`;
				whereclauseflag = 1;
			}
		}
		if (typeof filters.hot !== 'undefined')
		{
			if (whereclauseflag)
				query += ` AND hot = ${filters.hot}`;
			else
			{
				query += ` WHERE hot = ${filters.hot}`;
				whereclauseflag = 1;
			}
		}
		if (typeof filters.offset !== 'undefined')
			query += `OFFSET ${filters.offset}`;
		if (typeof filters.limit !== 'undefined')
			query += `LIMIT ${filters.limit}`;
		pool.query(query, (error, results) => {
			if (error)
				return callback(error);
			return callback(null, results);
		});
	},
	getItemById: (id, callback) => {
		pool.query(`select * from item where id = '${id}' inner join category on items.category_id = category.id`,
		(err, results) => {
			if (err)
				return callback(err);
			if (results.length == 0)
			{
				let e = new Error();
				e.code = "NOTFOUND";
				e.message = "no item with such id";
				return callback(e);
			}
			callback(null, results[0]);
		});
	},
	deleteItemById: (id, callback) => { //disable do not delete because of FK
		pool.query(
			`delete from items where id = '${id}'`,
			(error, results, fields) => {
				if (error) {
					return callback(error);
				}
				return callback(null, results);
			}
		);
	},
	updateItemById: (id, data, callback) => {
		// this.getItemById(id, (error, results) => {
		// 	if (error)
		// 		return callback(error);
		// 	this.addItem(?, callback)
		// 	this.deleteItemById(id, callback)
		// });
		pool.query(`select id from category where name = '${data.category}'`, (err, res) => {
			if (err)
				return callback(err);
			if (res.length == 0)
			{
				let e = new Error();
				e.code = "NOTFOUND";
				e.message = "no category with such name";
				return callback(e);
			}
			data.category = res[0].id;
			const newitem = new Item(data);
			pool.query(`update items set ${newitem} where id = '${id}'`, (err, results) => {
				if (err)
					return callback(err);
				return callback(null, results);
			});
		})
	}
};

module.exports = itemService;
