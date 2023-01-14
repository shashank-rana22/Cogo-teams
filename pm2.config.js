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
			script    : 'cogo-control/node_modules/.bin/next',
			args      : ['start', '-p', '4073'],
			instances : ifProd(2, 1),
			exec_mode : ifProd('cluster', 'fork'),
		},
	],
};
