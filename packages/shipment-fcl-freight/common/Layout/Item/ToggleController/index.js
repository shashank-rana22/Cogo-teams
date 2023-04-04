import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

function ToggleController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	const [toggleState, setToggleState] = useState(false);

	return (
		<Toggle
			{...rest}
			name={name}
			onChange={() => setToggleState(!toggleState)}
			value={toggleState}
		/>
	);
}
export default ToggleController;
