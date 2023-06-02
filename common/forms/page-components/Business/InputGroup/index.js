import { Input } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function InputGroup({ value = {}, inputControls = [], onChange = () => {}, id, disabled = false, ...rest }) {
	const [objs, setObjs] = useState({});
	const newControls = inputControls.map((control) => ({
		...control,
		value: (value || {})[control.name],
		disabled,
	}));

	const handleChange = (name, newValue, obj) => {
		const newObjs = { ...objs, [name]: obj || {} };
		setObjs(newObjs);
		onChange({ ...(value || {}), [name]: newValue }, newObjs);
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{newControls.map((control) => (
					<Input
						{...rest}
						{...control}
						id={`${id || control.name}_${control.name}`}
						onChange={(e) => handleChange(control.name, e, {})}
					/>
				))}
			</div>
		</div>
	);
}

export default InputGroup;
