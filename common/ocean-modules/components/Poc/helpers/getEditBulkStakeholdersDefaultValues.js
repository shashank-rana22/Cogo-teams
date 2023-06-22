const FIELD_ARRAY_KEY = 'new_stakeholders';

export default function getEditBulkStakeholdersDefaultValues({
	services = [],
	stakeholder_id = '',
}) {
	const DEFAULT_VALUES = {
		[FIELD_ARRAY_KEY]: [],
	};

	DEFAULT_VALUES[FIELD_ARRAY_KEY] = (services || []).map((service) => {
		const { id, service_type, trade_type } = service || {};

		return {
			is_checked      : true,
			new_stakeholder : stakeholder_id,
			service_id      : id,
			service_type,
			trade_type,
		};
	});

	return { DEFAULT_VALUES, FIELD_ARRAY_KEY };
}
