import React from 'react';

function NoDataFound() {
	return (
		<div
			style={{
				display        : 'flex',
				justifyContent : 'center',
				alignItems     : 'center',
				height         : '0px',
				marginTop      : '20px',
			}}
		>
			<h2>No Data Found</h2>
		</div>
	);
}

export default NoDataFound;
