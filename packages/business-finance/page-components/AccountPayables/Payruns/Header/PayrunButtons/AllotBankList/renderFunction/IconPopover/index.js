import { Tooltip } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import React from 'react';

import RemarkContent from './RemarkContent';

function IconPopover({ itemData = {} }) {
	const { fundAllotmentTimeline = [], currency = '' } = itemData;
	return (
		<div>
			<Tooltip
				maxWidth={500}
				placement="bottom-start"
				interactive
				content={(
					<RemarkContent
						fundAllotmentTimeline={fundAllotmentTimeline}
						currency={currency}
					/>
				)}
			>
				<div>
					<IcMProvision height={20} width={20} style={{ cursor: 'pointer' }} />
				</div>
			</Tooltip>
		</div>
	);
}

export default IconPopover;
