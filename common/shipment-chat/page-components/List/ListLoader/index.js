import React from 'react';
import { Placeholder } from '@cogoport/components';

const Loader = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>
				<Placeholder width="240px" height="50px" margin="16px 12px" />
				<Placeholder width="240px" height="50px" margin="16px 12px" />
				<Placeholder width="240px" height="50px" margin="16px 12px" />
				<Placeholder width="240px" height="50px" margin="16px 12px" />
				<Placeholder width="240px" height="50px" margin="16px 12px" />
				<Placeholder width="240px" height="50px" margin="16px 12px" />
				<Placeholder width="240px" height="50px" margin="16px 12px" />
			</div>
		</div>
	);
};
export default Loader;
