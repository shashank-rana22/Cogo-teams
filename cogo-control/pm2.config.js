const NODE_ENV = 'production';

const ifProd = (valueIfProd, valueIfDev) => {
	if (NODE_ENV === 'production') {
		return valueIfProd;
	}
	return valueIfDev;
};

module.exports = {
	apps: [
		{
			name      : 'project-new-admin',
			script    : 'yarn',
			args      : ['start', '-p', '4160'],
			instances : ifProd(1, 1),
			exec_mode : ifProd('cluster', 'fork'),
		},
	],
};
