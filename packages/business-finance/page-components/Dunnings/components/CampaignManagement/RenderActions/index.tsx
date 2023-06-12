import { Toggle } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';

function RenderActions() {
	return (
		<div style={{ display: 'flex' }}>
			<Toggle name="isActive" size="md" showOnOff disabled={false} checked />
			<button style={{ border: 'none', cursor: 'pointer' }} aria-label="edit"><IcMEdit /></button>
			<button style={{ border: 'none', cursor: 'pointer' }} aria-label="delete"><IcMDelete /></button>
		</div>
	);
}

export default RenderActions;
