import { Placeholder } from '@cogoport/components';
import React from 'react';

function LoadingState() {
	return (
		<div>
			{
                Array(3).fill(3).map(() => <Placeholder height="40px" width="100%" />)
            }
		</div>
	);
}

export default LoadingState;
