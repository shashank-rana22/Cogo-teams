import { isEmpty } from '@cogoport/utils';

import conditions from '../utils/condition-constants';

const notMandatoryControls = [
	'margin_type',
	'addition_type',
	'agent_id',
	'partner_id',
	'organization_id',
	'organization_type',
	'service',

];
const AGENT_ARRAY = ['sales_agent_view', 'supply_agent_view', 'sales_team_members_view', 'supply_team_members_view'];
const TWO = 2;

const MARGIN_VALUES = {
	code      : true,
	type      : true,
	value     : true,
	currency  : true,
	min_value : true,
	max_value : true,
};

const getShowElements = ({
	allPresentControls = [], formValues = {}, item = {}, agent_view = [],
	isConditionMatches = () => {},
}) => {
	const SHOW_ELEMENTS = {};
	const NEW_VALUES = {};

	Object.keys(formValues).forEach((key) => { (NEW_VALUES[key] = (formValues?.[key] || item?.[key])); });
	notMandatoryControls.forEach((key) => { (SHOW_ELEMENTS[key] = true); });

	SHOW_ELEMENTS.trade_type = (!isEmpty(NEW_VALUES?.service));
	SHOW_ELEMENTS.origin_location_id = (!isEmpty(NEW_VALUES?.trade_type));
	SHOW_ELEMENTS.destination_location_id = (!isEmpty(NEW_VALUES?.origin_location_id));
	SHOW_ELEMENTS.shipping_line_id = (!isEmpty(NEW_VALUES?.destination_location_id));
	SHOW_ELEMENTS.transport_mode = (!isEmpty(NEW_VALUES?.destination_location_id));
	SHOW_ELEMENTS.container_size = (!isEmpty(NEW_VALUES?.shipping_line_id || NEW_VALUES?.location_id));
	SHOW_ELEMENTS.container_type = (!isEmpty(NEW_VALUES?.container_size));
	allPresentControls.forEach((control) => {
		if (control?.name === 'addition_type') {
			if (isConditionMatches(conditions?.ADD_CHANNEL_PARTNER_MARGIN)) {
				if (
					AGENT_ARRAY.includes(agent_view?.[TWO])

				) {
					SHOW_ELEMENTS.addition_type = false;
				} else {
					SHOW_ELEMENTS.addition_type = true;
				}
			} else {
				SHOW_ELEMENTS.addition_type = false;
			}
		}

		if (control?.name === 'partner_id') {
			if (
				isConditionMatches(conditions.SEE_ALL_MARGINS, 'or')
				|| NEW_VALUES?.addition_type === 'channel_partner'
			) {
				SHOW_ELEMENTS.partner_id = true;
			} else {
				SHOW_ELEMENTS.partner_id = false;
			}
		}

		if (
			control?.name === 'shipping_line_id'
			&& NEW_VALUES?.service === 'haulage_freight'
		) {
			if (NEW_VALUES?.haulage_type === 'carrier') {
				SHOW_ELEMENTS.shipping_line_id = true;
			} else {
				SHOW_ELEMENTS.shipping_line_id = false;
			}
		}
		if (control.name === 'transport_mode') {
			if (NEW_VALUES?.haulage_type) {
				SHOW_ELEMENTS.transport_mode = true;
			} else {
				SHOW_ELEMENTS.transport_mode = false;
			}
		}

		if (control.name === 'margin_values' && NEW_VALUES?.margin_values) {
			SHOW_ELEMENTS[control.name] = NEW_VALUES?.margin_values.map((itemValue) => {
				if (itemValue?.type !== 'percentage') {
					return { ...MARGIN_VALUES, min_value: false, max_value: false };
				}
				return MARGIN_VALUES;
			});
		}

		if (control.name === 'rate_type') {
			if (formValues?.margin_type === 'cogoport') {
				SHOW_ELEMENTS[control.name] = true;
			} else {
				SHOW_ELEMENTS[control.name] = false;
			}
		}

		if (control.name === 'organization_type') {
			if (formValues?.margin_type === 'cogoport') {
				SHOW_ELEMENTS[control.name] = true;
			} else {
				SHOW_ELEMENTS[control.name] = false;
			}
		}
	});

	return SHOW_ELEMENTS;
};
export default getShowElements;
