import React from 'react';

import DropDownItem from '..';

function RenderPaidAccordian({ dropDownData = [], loadingDropDown = false, viewId = null, singleitem = {} }) {
	if (viewId !== singleitem?.objectId) {
		return null;
	}
	return (
		<div>
			<DropDownItem
				data={dropDownData}
				loadingDropDown={loadingDropDown}
			/>
		</div>
	);
}

export default RenderPaidAccordian;
