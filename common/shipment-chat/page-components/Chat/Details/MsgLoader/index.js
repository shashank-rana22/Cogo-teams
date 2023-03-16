import React from 'react';
import { SkeletonV1 } from '@cogoport/front/components';

const MsgLoader = () => {
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<SkeletonV1 width="240px" height="50px" margin="16px 12px" />
			</div>
		</>
	);
};
export default MsgLoader;
