import dynamic from 'next/dynamic';
import React from 'react';

const SpotSearch = dynamic(() => import('./SpotSearch'), {
	ssr     : false,
	loading : () => <div />,
});

function ServiceDiscovery() {
	return (<SpotSearch />);
}

export default ServiceDiscovery;
