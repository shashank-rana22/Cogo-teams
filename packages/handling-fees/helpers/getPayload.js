import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import removeObjEmptyValue from './removeObjEmptyValue';

const getPayload = ({ values = {}, isUpdatable = false, activeService, handling_fee_id }) => {
	let containerSlabs = (values?.slab_details?.filter((s) => !!s?.slab_unit)?.map(
		(container_slab) => {
			const newSlab = removeObjEmptyValue(container_slab);
			newSlab.is_default = true;
			return (newSlab);
		},
	)) || [];

	const alternateContainerSlabs = (values?.alternate_slab_details?.filter((s) => !!s?.slab_unit)?.map(
		(container_slab) => {
			const newSlab = removeObjEmptyValue(container_slab);
			newSlab.is_default = false;
			return (newSlab);
		},
	)) || [];

	if (!isEmpty(alternateContainerSlabs[GLOBAL_CONSTANTS.zeroth_index])) {
		containerSlabs = [...containerSlabs, ...alternateContainerSlabs];
	}

	const payload = {
		slab_details : containerSlabs,
		...(!isUpdatable ? { status: 'active' } : {}),
		commodity    : values?.commodity || undefined,
		...(isUpdatable
			? { id: handling_fee_id, fee_unit: values?.fee_unit }
			: {
				service_type           : activeService,
				fee_unit               : values?.fee_unit || undefined,
				booking_source         : values?.booking_source || undefined,
				cogo_entity_id         : values?.cogo_entity_id || undefined,
				organization_type      : values?.organization_type || undefined,
				trade_type             : values?.trade_type || undefined,
				serviceable_country_id : values?.serviceable_country_id || undefined,
				organization_sub_type:
				values?.organization_sub_type || undefined,
				performed_by : values?.performed_by || undefined,
				rate_type    : values?.rate_type || undefined,
			}),
	};

	return payload;
};
export default getPayload;
