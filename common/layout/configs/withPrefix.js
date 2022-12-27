const withPrefix = (routes) => Object.keys(routes).reduce(
	(prev, current) => ({
		...prev,
		[`/[partner_id]${current}`]: routes[current],
	}),
	{},
);

module.exports = withPrefix;
