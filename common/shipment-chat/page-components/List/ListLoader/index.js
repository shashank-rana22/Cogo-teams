import { Placeholder } from '@cogoport/components';
import React from 'react';

const placeholders = Array(5).fill().map(() => (
	<Placeholder width="240px" height="50px" margin="16px 12px" />
));

function Loader() {
	return (
		<div>
			{placeholders}
		</div>
	);
}
export default Loader;
