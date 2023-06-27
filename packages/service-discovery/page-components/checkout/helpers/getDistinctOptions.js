const getDistinctOptions = (list = [], valueKey = 'user_id') => list.reduce((acc, cur) => {
	if (!acc.map((item) => item[valueKey]).includes(cur[valueKey])) {
		return [...acc, cur];
	}

	return acc;
}, []);

export default getDistinctOptions;
