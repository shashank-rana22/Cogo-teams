import { Placeholder } from '@cogoport/components';
import React from 'react';

function Loader() {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>
				<Placeholder width="200px" height="50px" margin="16px 12px" />
				<Placeholder width="200px" height="50px" margin="16px 12px" />
				<Placeholder width="200px" height="50px" margin="16px 12px" />
				<Placeholder width="200px" height="50px" margin="16px 12px" />
				<Placeholder width="200px" height="50px" margin="16px 12px" />
				<Placeholder width="200px" height="50px" margin="16px 12px" />
				<Placeholder width="200px" height="50px" margin="16px 12px" />
			</div>
		</div>
	);
}
export default Loader;
