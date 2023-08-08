const FIELD_ARRAY_KEY = 'new_stakeholders_field';

export default function getEditBulkStakeholdersDefaultValues({ modifiedServicesList = [] }) {
	const DEFAULT_VALUES = {
		[FIELD_ARRAY_KEY]: [],
	};

	DEFAULT_VALUES[FIELD_ARRAY_KEY] = (modifiedServicesList || []).map((service) => {
		const {
			service_id,
			service_type,
			trade_type,
			container_size,
			container_type,
			commodity,
			shipment_type,
			new_stakeholder_id,
		} = service || {};

		return {
			is_checked      : true,
			new_stakeholder : new_stakeholder_id,
			service_id,
			service_type,
			trade_type,
			container_size,
			container_type,
			commodity,
			shipment_type,
		};
	});

	return { DEFAULT_VALUES, fieldArrayKey: FIELD_ARRAY_KEY };
}
