import React from 'react';

import Location from './Location';
import Organization from './Organization';

const OPTIONS_MAPPING = {
	organizations : Organization,
	locations     : Location,
	locations_v2  : Location,
};

function CustomSelectOption({ key = '', option = '', ...rest }) {
	const CustomOptions = OPTIONS_MAPPING[key];

	return <CustomOptions data={option} {...rest} />;
}

export default CustomSelectOption;
