import { Placeholder } from '@cogoport/components';
import React from 'react';

function Loader() {
	return (
		<div>
			{Array(2).fill().map(() => (
				<div style={{ margin: '16px' }} key="e">
					{' '}
					{Array(2).fill().map((j, idx) => (
						<Placeholder width={idx === 1 ? '250px' : '200'} margin="16px" key="d" />))}
					{' '}
				</div>
			))}
		</div>
	);
}

export default Loader;
