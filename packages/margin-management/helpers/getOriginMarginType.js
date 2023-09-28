import { isEmpty } from '@cogoport/utils';

const getOriginMarginType = ({ location = {}, origin_location = {}, data = {} }) => {
	const origin = () => {
		if (!isEmpty(location)) {
			return location?.display_name;
		}
		if (!isEmpty(origin_location)) {
			return origin_location?.display_name;
		}
		return null;
	};
	const marginType = () => {
		if (data?.margin_type === 'demand') {
			return 'sales';
		}
		return data?.margin_type;
	};
	return { margin_type: marginType(), origin: origin() };
};
export default getOriginMarginType;
