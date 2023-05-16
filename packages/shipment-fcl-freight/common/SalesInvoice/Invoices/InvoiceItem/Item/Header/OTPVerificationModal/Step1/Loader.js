import { Skeleton } from '@cogoport/components';
import React from 'react';

function Loader() {
	return (
		<div>
			<div style={{ margin: '16px' }}>
				<Skeleton width="200px" margin="16px" />
				<Skeleton width="250px" margin="16px" />
			</div>

			<div style={{ margin: '16px' }}>
				<Skeleton width="200px" margin="16px" />
				<Skeleton width="250px" margin="16px" />
			</div>

			<div style={{ margin: '16px' }}>
				<Skeleton width="200px" margin="16px" />
				<Skeleton width="250px" margin="16px" />
			</div>
		</div>
	);
}

export default Loader;
