import { isEmpty } from '@cogoport/utils';

const getPayloadCustomConfigs = ({
	values = {}, handling_fee_id = '', defaultConfigFeeUnit = '', activeList = 'active', item_id = '',
}) => {
	const { organization_ids = [], custom_config_slab = [] } = values;

	const deleted_organization_ids = (values?.organization_ids || []).filter(
		(id) => !(values?.organization_ids || []).includes(id),
	);

	const containerSlabs = custom_config_slab.map((container_slab) => ({
		fee_currency      : container_slab?.fee_currency || undefined,
		fee_unit          : container_slab.fee_unit || undefined,
		fee_value         : container_slab.fee_value || undefined,
		slab_lower_limit  : container_slab.slab_lower_limit || undefined,
		maximum_fee_value : container_slab.maximum_fee_value || undefined,
		minimum_fee_value : container_slab.minimum_fee_value || undefined,
		slab_unit         : container_slab.slab_unit || undefined,
		slab_upper_limit  : container_slab.slab_upper_limit || undefined,
		is_default        : container_slab.fee_unit === defaultConfigFeeUnit,
	}));

	const payload = {
		deleted_organization_ids,
		slab_details                  : containerSlabs,
		status                        : activeList,
		id                            : item_id,
		...(!isEmpty(organization_ids) ? { organization_ids } : {}),
		handling_fee_configuration_id : handling_fee_id || undefined,
	};
	return payload;
};
export default getPayloadCustomConfigs;
