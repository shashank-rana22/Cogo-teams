import { Placeholder } from '@cogoport/components';
import React from 'react';

const placeholders = Array(4).fill().map(() => (
	<Placeholder width="300px" height="80px" margin="20px 26px" />
));

function Loader() {
	return (
		<div>
			{placeholders}
		</div>
	);
}
export default Loader;
