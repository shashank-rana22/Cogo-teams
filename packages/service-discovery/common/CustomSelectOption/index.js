import Airlines from './Airlines';
import Location from './Location';
import Organization from './Organization';
import ShippingLines from './ShippingLines';

const OPTIONS_MAPPING = {
	organizations    : Organization,
	locations        : Location,
	locations_v2     : Location,
	airlines         : Airlines,
	shipping_lines   : ShippingLines,
	'shipping-lines' : ShippingLines,
};

function CustomSelectOption({ key = '', option = {}, ...rest }) {
	const CustomOptions = OPTIONS_MAPPING[key];

	return <CustomOptions data={option} {...rest} />;
}

export default CustomSelectOption;
