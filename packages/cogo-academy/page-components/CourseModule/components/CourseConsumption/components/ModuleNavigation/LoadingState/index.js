import { Placeholder } from '@cogoport/components';
import React from 'react';

function LoadingState() {
	return (
		<div>
			{
                Array(7).fill(7).map(() => <Placeholder height="40px" width="300px" margin="0px 0px 20px 0px" />)
            }
		</div>
	);
}

export default LoadingState;
