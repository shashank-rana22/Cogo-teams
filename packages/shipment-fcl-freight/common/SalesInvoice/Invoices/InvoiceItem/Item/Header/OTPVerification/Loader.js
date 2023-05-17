import { Placeholder } from '@cogoport/components';
import React from 'react';

function Loader() {
	return (
		<div>
			<div style={{ margin: '16px' }}>
				<Placeholder width="200px" margin="16px" />
				<Placeholder width="250px" margin="16px" />
			</div>

			<div style={{ margin: '16px' }}>
				<Placeholder width="200px" margin="16px" />
				<Placeholder width="250px" margin="16px" />
			</div>
		</div>
	);
}

export default Loader;
