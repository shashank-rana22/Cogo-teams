import { IcMEdit } from '@cogoport/icons-react';
import { getByKey, isEmpty, startCase } from '@cogoport/utils';

const STATUSMAPPING = {
	active   : 'green',
	inactive : 'red',
	unmapped : 'blue',
};
const value = (item) => (item === null || item === undefined ? '---' : startCase(item));
const getValue = (itemData, itemField, onClick, shippingInfo) => {
	if (isEmpty(itemData) || isEmpty(itemField)) return '';

	const val = getByKey(itemData, itemField.key);

	switch (itemField.type) {
		case 'edit': {
			return <IcMEdit onClick={() => onClick(itemData)} />;
		}
		case 'status': {
			return <div style={{ color: STATUSMAPPING[val] }}>{value(val)}</div>;
		}
		case 'shpping_line': {
			return (
				<div>
					{value(shippingInfo.business_name)}
				</div>
			);
		}
		default:
			break;
	}
	return value(val);
};

export default getValue;
