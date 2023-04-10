import { Placeholder } from '@cogoport/components';
import React from 'react';

function MsgLoader() {
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
				<Placeholder width="220px" height="32px" margin="16px 8px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Placeholder width="220px" height="32px" margin="16px 8px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
				<Placeholder width="220px" height="32px" margin="16px 8px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Placeholder width="220px" height="32px" margin="16px 8px" />
			</div>
		</>
	);
}
export default MsgLoader;
