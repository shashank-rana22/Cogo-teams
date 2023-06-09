const VALUE_TO_INDEX_DIFF = 1;

const FIRST_INDEX = 0;

const TO_INDEX = 1;

const getSequenceOrderPayload = ({ data, draggedNode, parentNode }) => {
	const fromIndex = draggedNode.sequence_order - VALUE_TO_INDEX_DIFF;
	const toIndex = parentNode.sequence_order - VALUE_TO_INDEX_DIFF;

	const filteredIds = data.filter((item) => !item.isNew).map((item) => item.id);

	const element = filteredIds.splice(fromIndex, TO_INDEX)[FIRST_INDEX];

	filteredIds.splice(toIndex, FIRST_INDEX, element);

	const finalPayload = filteredIds.map((item, index) => ({
		id                 : item,
		new_sequence_order : index + VALUE_TO_INDEX_DIFF,
	}));

	return finalPayload;
};

export default getSequenceOrderPayload;
