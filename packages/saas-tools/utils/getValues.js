import { IcMEdit } from '@cogoport/icons-react';
import { getByKey, isEmpty, startCase } from '@cogoport/utils';

const STATUSMAPPING = {
	active   : 'green',
	inactive : 'red',
	unmapped : 'blue',
};
const getValue = (itemData, itemField, onClick, shippingInfo) => {
	if (isEmpty(itemData) || isEmpty(itemField)) return '';

	const val = getByKey(itemData, itemField.key);
	switch (itemField.type) {
		case 'edit': {
			return <IcMEdit onClick={() => onClick(itemData)} />;
		}
		case 'status': {
			return <div style={{ color: STATUSMAPPING[val] }}>{startCase(val)}</div>;
		}
		case 'shpping_line': {
			return <div>{shippingInfo.business_name}</div>;
		}
		default:
			break;
	}
	return val === null || val === undefined ? '-' : startCase(val);
};

export default getValue;
