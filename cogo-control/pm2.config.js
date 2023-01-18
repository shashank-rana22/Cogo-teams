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
			name      : 'project-admin',
			script    : 'node_modules/.bin/next',
			args      : ['start', '-p', '4160'],
			instances : ifProd(2, 1),
			exec_mode : ifProd('cluster', 'fork'),
		},
	],
};
