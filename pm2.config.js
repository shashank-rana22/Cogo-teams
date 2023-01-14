const { NODE_ENV } = process.env;

const ifProd = (valueIfProd, valueIfDev) => {
	if (NODE_ENV === 'production') {
		return valueIfProd;
	}
	return valueIfDev;
};

module.exports = {
	apps: [
		{
			name      : 'cogo-admin',
			instances : ifProd(1, 1),
			exec_mode : ifProd('cluster', 'fork'),
		},
	],
};
