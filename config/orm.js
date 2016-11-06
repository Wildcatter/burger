var connection = require('./connection.js');

function currentValues(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
		console.log(arr);
	}

	console.log(arr.toString());
	return arr.toString();

};

function objToSql(ob) {
	// column1=value, column2=value2,...
	arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
			console.log(arr);
		}
	}
	console.log(arr.toString());
	return arr.toString();
};


var orm = {
	selectAll: function(table, cb) {
		var queryString = "SELECT * FROM " + table + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},

	insertOne: function(table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += currentValues(vals.length);
		queryString += ') ';

		console.log(queryString);
		
		connection.query(queryString, vals, function (err,result) {
			if (err) throw err;
			cb(result);
		});
	},

	updateOne: function(table, colVals, condition, cb) {
		var queryString = 'UPDATE ' + table;
		queryString += ' SET ';
		queryString += objToSql(colVals);
		queryString += ' WHERE ';
		queryString += condition;

		console.log(queryString);

		connection.query(queryString, function (err,result) {
			if (err) throw err;
			cb(result);
		});
	}
};

module.exports = orm;