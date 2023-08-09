import getAsyncFields from '../Item/getAsyncKeys';

const ASYNC_SELECT_TYPE = ['select', 'creatable-select', 'location-select'];

export default function getNewControls(item = {}) {
	let newProps = { ...item };

	const { type } = item;
	const isAsyncSelect = ASYNC_SELECT_TYPE.includes(type) && Object.keys(item).includes('optionsListKey');

	if (!isAsyncSelect) {
		return newProps;
	}

	const asyncKey = item?.optionsListKey;

	const asyncFields = getAsyncFields(asyncKey) || {};

	const finalParams = item?.params || asyncFields?.defaultParams;

	if (Object.keys(asyncFields)?.includes('defaultParams')) { delete asyncFields?.defaultParams; }

	newProps = {
		...newProps,
		...asyncFields,
		params : finalParams,
		type   : 'async-select',
	};
	return newProps;
}
