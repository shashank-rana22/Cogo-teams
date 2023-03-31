import React from 'react';

import LoaderConfigurationCard from './LoaderConfigurationCard';

function LoadingState() {
	return (
		<div>
			{[1, 2].map(() => (
				<LoaderConfigurationCard />
			))}
		</div>
	);
}

export default LoadingState;
