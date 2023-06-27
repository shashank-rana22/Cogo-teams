import React from 'react';

const COLOR_MAPPING = {
	NORMAL          : '#FEF1DF',
	OVERSEAS        : '#CDF7D4',
	OVERHEADS       : '#7DD6FF',
	ADVANCE_PAYMENT : '#C4DC91',
};
function RibbonData({ itemData }) {
	const { type = '' } = itemData || {};
	let value;
	if (type === 'NORMAL') {
		value = 'DOMESTIC';
	} else if (type === 'ADVANCE_PAYMENT') {
		value = 'Adv.Payment';
	} else if (type === 'OVERSEAS') {
		value = 'OVERSEAS';
	}

	return (
		<div>

			{
			type ? (
				<div style={{ background: COLOR_MAPPING[type] }}>
					<div className="ribbon">{value}</div>
				</div>
			) : null
		}
		</div>
	);
}

export default RibbonData;
