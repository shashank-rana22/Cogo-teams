import React from 'react';

import LoaderConfigurationCard from './LoaderConfigurationCard';

function LoadingState() {
	return (
		<div>
			{[1, 2].map((item) => (
				<LoaderConfigurationCard key={item} />
			))}
		</div>
	);
}

export default LoadingState;
