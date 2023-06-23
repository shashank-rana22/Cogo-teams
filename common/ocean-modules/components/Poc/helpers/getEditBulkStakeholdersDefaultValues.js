const FIELD_ARRAY_KEY = 'new_stakeholders_field';

export default function getEditBulkStakeholdersDefaultValues({ services = [], stakeholder_type = '' }) {
	const DEFAULT_VALUES = {
		[FIELD_ARRAY_KEY]: [],
	};

	DEFAULT_VALUES[FIELD_ARRAY_KEY] = (services || []).map((service) => {
		const {
			id,
			service_type,
			trade_type,
			container_size,
			container_type,
			commodity,
			shipment_type,
		} = service || {};

		return {
			is_checked      : true,
			new_stakeholder : service?.[stakeholder_type]?.id,
			service_id      : id,
			service_type,
			trade_type,
			container_size,
			container_type,
			commodity,
			shipment_type,
		};
	});

	return { DEFAULT_VALUES, FIELD_ARRAY_KEY };
}
