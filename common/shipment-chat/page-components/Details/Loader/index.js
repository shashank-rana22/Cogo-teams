import { Placeholder } from '@cogoport/components';
import React from 'react';

function Loader() {
	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
			<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
				<Placeholder width="220px" height="50px" margin="16px 8px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Placeholder width="220px" height="50px" margin="16px 8px" />
			</div>
		</div>
	);
}

export default Loader;
