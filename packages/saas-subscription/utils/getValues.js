import { isEmpty } from '@cogoport/utils';

const getValues = ({ itemData = {}, config, itemFunction = {} }) => {
	if (isEmpty(itemData)) return null;

	let val = itemData?.[config?.key];

	if (config?.renderFunc && !isEmpty(itemFunction)) {
		val = itemFunction?.[config?.renderFunc](itemData, config);
	}

	return val;
};

export default getValues;
