const getDeleteSequenceOrderPayload = ({ idToDelete, filteredIds }) => {
	const finalPayload = filteredIds.filter((item) => item !== idToDelete).map((item, index) => ({
		new_sequence_order : index + 1,
		id                 : item,
	}));

	return finalPayload;
};

export default getDeleteSequenceOrderPayload;
