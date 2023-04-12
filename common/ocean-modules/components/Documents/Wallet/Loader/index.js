import { Placeholder } from '@cogoport/components';
import React from 'react';

function Loader({ forModal }) {
	return (
		<>
			<Placeholder
				width={forModal ? '218px' : '582px'}
				height={forModal ? '146px' : '180px'}
			/>
			<Placeholder
				width={forModal ? '218px' : '582px'}
				height={forModal ? '146px' : '180px'}
			/>
			{forModal ? <Placeholder width="218px" height="146px" /> : null}
		</>
	);
}

export default Loader;
