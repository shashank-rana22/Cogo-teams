const getCreateUpdateTncPayload = ({ values = {}, editFormValue = {}, organizationId = null }) => {
	const isUpdatable = editFormValue?.id;
	const {
		service,
		shipping_line_id,
		airline_id,
		trade_type,
		country_id,
		status,
		paying_party_country_ids,
		description = [],
	} = values || {};

	const formValues = {
		id                      	: isUpdatable || undefined,
		service                  : service || undefined,
		trade_type               : trade_type || undefined,
		airline_id               : airline_id || undefined,
		shipping_line_id         : shipping_line_id || undefined,
		organization_id          : organizationId,
		country_id               : country_id || undefined,
		status                   : status === 'active' ? 'inactive' : 'active',
		paying_party_country_ids : paying_party_country_ids || undefined,
	};

	const descriptionNew = description?.map((item) => item?.terms_and_condition);

	const payload = {
		...(isUpdatable ? { id: isUpdatable } : { ...formValues }),
		description: descriptionNew,
	};

	return payload;
};

export default getCreateUpdateTncPayload;
