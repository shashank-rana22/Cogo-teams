import conditions from '../utils/condition-constants';

const notMandatoryControls = [
	'margin_type',
	'addition_type',
	'agent_id',
	'partner_id',
	'organization_id',
	'transport_mode',
	'organization_type',
	'service',
];
const TWO = 2;

const getShowElements = ({
	allPresentControls = [], formValues = {}, item = {}, agent_view = [],
	isConditionMatches = () => {},
}) => {
	const SHOW_ELEMENTS = {};
	let showControl = true;

	const newValues = {
		margin_type       : formValues?.margin_type || item?.margin_type,
		rate_type         : formValues?.rate_type || item?.rate_type,
		organization_type : formValues?.organization_type || item?.organization_type,
		addition_type     : formValues?.addition_type,
		partner_id        : formValues?.partner_id || item?.partner_id,
		service           : formValues?.service || item?.service,
		organization_id   : formValues?.organization_id || item?.organization_id,
		trade_type        : formValues?.trade_type || item?.filters?.trade_type,
		origin_location_id:
			formValues?.origin_location_id || item?.origin_location_id,
		location_id: formValues?.location_id || item?.location_id,
		destination_location_id:
			formValues?.destination_location_id || item?.destination_location_id,
		shipping_line_id : formValues?.shipping_line_id || item?.shipping_line_id,
		airline_id       : formValues?.airline_id || item?.airline_id,
		container_size   : formValues?.container_size || item?.container_size,
		container_type   : formValues?.container_type || item?.container_type,
		commodity        : formValues?.commodity || item?.commodity,
		haulage_type     : formValues?.haulage_type || item?.haulage_type,
		transport_mode   : formValues?.transport_mode || item?.transport_mode,
		truck_type       : formValues?.truck_type || item?.truck_type,
		margin_values    : formValues?.margin_values || item?.margin_values,
	};

	allPresentControls.forEach((control) => {
		if (control.name !== 'margin_values') {
			SHOW_ELEMENTS[control.name] =				showControl || notMandatoryControls.includes(control.name);
			if (
				!newValues[control.name]
				&& !notMandatoryControls.includes(control.name)
			) {
				showControl = false;
			}
		}

		if (control.name === 'addition_type') {
			if (isConditionMatches(conditions.ADD_CHANNEL_PARTNER_MARGIN)) {
				if (
					agent_view[TWO] === 'sales_agent_view'
					|| agent_view[TWO] === 'supply_agent_view'
					|| agent_view[TWO] === 'sales_team_members_view'
					|| agent_view[TWO] === 'supply_team_members_view'
				) {
					SHOW_ELEMENTS.addition_type = false;
				} else {
					SHOW_ELEMENTS.addition_type = true;
				}
			} else {
				SHOW_ELEMENTS.addition_type = false;
			}
		}

		if (control.name === 'partner_id') {
			if (
				isConditionMatches(conditions.SEE_ALL_MARGINS, 'or')
				|| newValues?.addition_type === 'channel_partner'
			) {
				SHOW_ELEMENTS.partner_id = true;
			} else {
				SHOW_ELEMENTS.partner_id = false;
			}
		}

		if (
			control.name === 'shipping_line_id'
			&& newValues?.service === 'haulage_freight'
		) {
			if (newValues?.haulage_type === 'carrier') {
				SHOW_ELEMENTS.shipping_line_id = true;
			} else {
				SHOW_ELEMENTS.shipping_line_id = false;
			}
		}
		if (control.name === 'transport_mode') {
			if (newValues?.haulage_type) {
				SHOW_ELEMENTS.transport_mode = true;
			} else {
				SHOW_ELEMENTS.transport_mode = false;
			}
		}

		if (control.name === 'margin_values' && newValues?.margin_values) {
			SHOW_ELEMENTS[control.name] = newValues.margin_values.map((itemValue) => {
				if (itemValue?.type === 'percentage') {
					return {
						code      : true,
						type      : true,
						value     : true,
						currency  : true,
						min_value : true,
						max_value : true,
					};
				}
				return {
					code      : true,
					type      : true,
					value     : true,
					currency  : true,
					min_value : false,
					max_value : false,
				};
			});
		}

		if (control.name === 'rate_type') {
			if (formValues.margin_type === 'cogoport') {
				SHOW_ELEMENTS[control.name] = true;
			} else {
				SHOW_ELEMENTS[control.name] = false;
			}
		}

		if (control.name === 'organization_type') {
			if (formValues.margin_type === 'cogoport') {
				SHOW_ELEMENTS[control.name] = true;
			} else {
				SHOW_ELEMENTS[control.name] = false;
			}
		}
	});
	return SHOW_ELEMENTS;
};
export default getShowElements;
