import filterCommonControls from '../constants/filter-common-controls';

const getFilterControls = ({ serviceActiveTab }) => {
	let controls = [];

	switch (serviceActiveTab) {
		default:
			controls = [...filterCommonControls];
	}
	return controls;
};
export default getFilterControls;
