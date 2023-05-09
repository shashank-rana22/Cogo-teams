import React from 'react';
import { Skeleton } from '@cogoport/front/components/admin';

const Loader = () => {
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
};

export default Loader;
