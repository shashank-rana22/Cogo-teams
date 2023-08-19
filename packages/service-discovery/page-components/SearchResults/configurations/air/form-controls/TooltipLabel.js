import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

function TooltipLabel({ labelText = '', tooltipText = '' }) {
	return (
		<div style={{ display: 'flex' }}>
			<span style={{ marginRight: '8px' }}>{labelText || ''}</span>

			<Tooltip
				content={tooltipText || ''}
				placement="top"
			>
				<IcMInfo height={12} width={12} />
			</Tooltip>
		</div>
	);
}

export default TooltipLabel;
