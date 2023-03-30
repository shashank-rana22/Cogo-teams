const getLastMileAddtionalMethods = ({ activeTab }) => {
	const additional_methods = ['pagination'];
	if (['vessel_arrived', 'container_gated_out'].includes(activeTab)) {
		additional_methods.push('documents');
	}

	return additional_methods;
};

export default getLastMileAddtionalMethods;
