import { Placeholder } from '@cogoport/components';
import React from 'react';

const customStyle = { height: '14px' };

function Loader() {
	return (
		<>

			<Placeholder style={{ marginRight: '50px' }} />

			<Placeholder className="circle" width="45px" height="45px" />

			<Placeholder style={{ ...customStyle, margin: '0 0 10px 0' }} />
			<Placeholder style={customStyle} />

			<Placeholder style={{ ...customStyle, margin: '0 0 10px 0' }} />
			<Placeholder style={customStyle} />

			<Placeholder style={{ marginRight: '16px' }} />
			<Placeholder style={{ marginRight: '16px' }} />
			<Placeholder style={{ marginRight: '16px' }} />
			<Placeholder style={{ marginRight: '16px' }} />

			<Placeholder width="100%" height="30px" />
		</>
	);
}

export default Loader;
