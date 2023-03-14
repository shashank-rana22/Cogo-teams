import { Skeleton } from '@cogoport/front/components/admin';
import React from 'react';

function Loader() {
	return (
		<>
			<div style={{ display: 'flex', margin: '12px 0 0 0' }}>
				<Skeleton width="200px" height="16px" />
			</div>
			<div style={{ display: 'flex', margin: '25px 0 0 0' }}>
				<Skeleton width="95%" height="20px" />
			</div>
			<div style={{ display: 'flex', margin: '10px 0 0 0' }}>
				<Skeleton width="95%" height="20px" />
			</div>
			<div style={{ display: 'flex', margin: '10px 0 0 0' }}>
				<Skeleton width="95%" height="20px" />
			</div>
			<div style={{ display: 'flex', margin: '10px 0 0 0' }}>
				<Skeleton width="70%" height="20px" />
			</div>
			<div style={{ display: 'flex', margin: '25px 0 0 0' }}>
				<Skeleton width="200px" height="16px" />
			</div>
		</>
	);
}

export default Loader;
