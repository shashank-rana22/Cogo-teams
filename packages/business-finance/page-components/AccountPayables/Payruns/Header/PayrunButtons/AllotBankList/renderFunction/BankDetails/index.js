import React from 'react';

import RenderTooltip from '../../../../../../../commons/RenderTooltip';

function BankDetails({ itemData = {} }) {
	const { bankname = '', bankAccountNo = '' } = itemData;
	return (
		<div>
			<RenderTooltip content={bankname} maxLength={28} />
			<RenderTooltip content={bankAccountNo} maxLength={28} />

		</div>
	);
}

export default BankDetails;
