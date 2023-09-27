import { isEmpty } from '@cogoport/utils';

const getOriginDestination = ({ type = '', idValues = {}, data = {} }) => {
	const origin = () => {
		if (type === 'edit') {
			if (
				!isEmpty(data?.filters?.location)
                || !isEmpty(idValues?.location_id?.name)
			) {
				return idValues?.location_id?.name || data?.filters?.location?.name;
			}
			if (
				!isEmpty(data?.filters?.origin_location)
                || !isEmpty(idValues?.origin_location_id?.name)
			) {
				return (
					idValues?.origin_location_id?.name
                    || data?.filters?.origin_location?.name
				);
			}
		}
		if (type === 'create') {
			return idValues?.location_id?.name || idValues?.origin_location_id?.name;
		}
		return null;
	};

	const destination = () => {
		if (type === 'edit') {
			return idValues?.organization_id?.business_name
            || data?.organization?.business_name;
		} return idValues?.organization_id?.business_name;
	};
	const organization = () => {
		if (type === 'edit') {
			return idValues?.organization_id?.business_name
        || data?.organization?.business_name;
		}
		return idValues?.organization_id?.business_name;
	};
	const shippingLine = () => {
		if (type === 'edit') {
			return idValues?.shipping_line?.business_name
            || data?.filters?.shipping_line?.business_name;
		}
		return idValues?.shipping_line?.business_name;
	};

	const airline = () => {
		if (type === 'edit') {
			return idValues?.airline?.business_name
            || data?.filters?.airline?.business_name;
		}
		return idValues?.airline?.business_name;
	};
	return {
		origin        : origin(),
		airline       : airline(),
		shipping_line : shippingLine(),
		destination   : destination(),
		organization  : organization(),
	};
};
export default getOriginDestination;
