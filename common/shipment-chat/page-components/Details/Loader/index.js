import { Placeholder } from '@cogoport/components';
import React from 'react';

function Loader() {
	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
			<Placeholder width="220px" height="50px" margin="16px 8px" />
			<Placeholder width="220px" height="50px" margin="16px 8px" />
		</div>
	);
}

export default Loader;
