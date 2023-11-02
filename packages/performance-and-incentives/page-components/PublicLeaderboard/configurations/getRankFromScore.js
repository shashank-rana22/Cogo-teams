const getRankFromScore = ({ score = {} }) => {
	const dataArray = Object.entries(score).map(([location, value]) => ({ location, value }));

	dataArray.sort((a, b) => b.value - a.value);

	const RESULT = dataArray.map((item, index) => ({
		[item.location]: {
			value : item.value,
			rank  : index + 1,
		},
	})).reduce((result, item) => ({ ...result, ...item }), {});

	return RESULT;
};
export default getRankFromScore;
