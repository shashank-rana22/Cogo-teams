import React from 'react';
import { SkeletonV1 } from '@cogoport/front/components';

const Loader = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
			</div>
		</div>
	);
};
export default Loader;
