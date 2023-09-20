import React from 'react';

import DropDownItem from '..';

function RenderPaidAccordian({
	dropDownData = [],
	loadingDropDown = false,
	viewId = null,
	singleitem = {},
	country_code = '',
}) {
	if (viewId !== singleitem?.singleitem?.objectId) {
		return null;
	}
	return (
		<DropDownItem
			data={dropDownData}
			loadingDropDown={loadingDropDown}
			country_code={country_code}
		/>
	);
}

export default RenderPaidAccordian;
