import { Popover } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';

import UpdatedByAmount from './UpdatedByAmount';

function IconPopover({ itemData }) {
	const { fundAllotmentTimeline, currency } = itemData || {};
	return (
		<Popover
			placement="bottom-start"
			trigger="mouseenter"
			content={(
				<UpdatedByAmount
					fundAllotmentTimeline={fundAllotmentTimeline}
					currency={currency}
				/>
			)}
		>
			<div>
				<IcMProvision
					height={20}
					width={20}
					style={{ cursor: 'pointer', color: '#F68B21' }}
				/>
			</div>
		</Popover>
	);
}
export default IconPopover;
