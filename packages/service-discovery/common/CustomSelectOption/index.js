import React from 'react';

import Airlines from './Airlines';
import Location from './Location';
import Organization from './Organization';

const OPTIONS_MAPPING = {
	organizations : Organization,
	locations     : Location,
	locations_v2  : Location,
	airlines      : Airlines,
};

function CustomSelectOption({ key = '', option = {}, ...rest }) {
	const CustomOptions = OPTIONS_MAPPING[key];

	return <CustomOptions data={option} {...rest} />;
}

export default CustomSelectOption;
