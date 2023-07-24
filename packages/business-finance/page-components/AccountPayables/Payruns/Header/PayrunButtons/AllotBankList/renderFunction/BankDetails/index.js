import React from 'react';

import RenderTooltip from '../../../../../../../commons/RenderTooltip';

const SHOW_TOOLTIP_REQUIRED_LENGTH = 28;
function BankDetails({ itemData = {} }) {
	const { bankname = '', bankAccountNo = '' } = itemData;
	return (
		<div>
			<RenderTooltip content={bankname} maxLength={SHOW_TOOLTIP_REQUIRED_LENGTH} />
			<RenderTooltip content={bankAccountNo} maxLength={SHOW_TOOLTIP_REQUIRED_LENGTH} />

		</div>
	);
}

export default BankDetails;
