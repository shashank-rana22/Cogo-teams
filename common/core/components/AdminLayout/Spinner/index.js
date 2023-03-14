import React from 'react';

import { DIV } from './styles';

function Spinner({
	size = 10,
	borderWidth = 2,
	outerBorderColor = '#FEF1DF',
	spinBorderColor = '#FBD69F',
}) {
	return (
		<DIV
			size={size}
			borderWidth={borderWidth}
			outerBorderColor={outerBorderColor}
			spinBorderColor={spinBorderColor}
		/>
	);
}

export default Spinner;
