const getSequenceOrderPayload = ({ data, draggedNode, parentNode }) => {
	const fromIndex = draggedNode.sequence_order - 1;
	const toIndex = parentNode.sequence_order - 1;

	const filteredIds = data.filter((item) => !item.isNew).map((item) => item.id);

	const element = filteredIds.splice(fromIndex, 1)[0];

	filteredIds.splice(toIndex, 0, element);

	const finalPayload = filteredIds.map((item, index) => ({
		id                 : item,
		new_sequence_order : index + 1,
	}));

	return finalPayload;
};

export default getSequenceOrderPayload;
