import { useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcM0, IcC1, IcC2, IcC3, IcC4, IcC5, IcC6, IcC7, IcC9, IcC8,
} from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import Child from './child';
import styles from './styles.module.css';

const ONE = 1;
function FieldArray({
	name,
	control,
	controls,
	showElements,
	disabled = false,
	value,
	error,
	total = 0,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const [prevTotal, setPrevTotal] = useState(GLOBAL_CONSTANTS.zeroth_index);

	useEffect(() => {
		const CHILD_EMPTY_VALUES = {};
		if (prevTotal > total && total > GLOBAL_CONSTANTS.zeroth_index) {
			Array.from({ length: prevTotal }, (index) => remove(index, ONE));
			const newFields = Array.from({ length: total }, () => CHILD_EMPTY_VALUES);

			append(newFields);

			setPrevTotal(total);
		}
		if (total > prevTotal && total > GLOBAL_CONSTANTS.zeroth_index) {
			const newFields = Array.from({ length: total - prevTotal }, () => CHILD_EMPTY_VALUES);
			append(newFields);
		}
		if (total > GLOBAL_CONSTANTS.zeroth_index) {
			setPrevTotal(total);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [total]);
	const ICONS_MAPPINGS = {
		0 : <IcM0 className={styles.number_icon} />,
		1 : <IcC1 className={styles.number_icon} />,
		2 : <IcC2 className={styles.number_icon} />,
		3 : <IcC3 className={styles.number_icon} />,
		4 : <IcC4 className={styles.number_icon} />,
		5 : <IcC5 className={styles.number_icon} />,
		6 : <IcC6 className={styles.number_icon} />,
		7 : <IcC7 className={styles.number_icon} />,
		8 : <IcC8 className={styles.number_icon} />,
		9 : <IcC9 className={styles.number_icon} />,
	};

	return (

		<div className={styles.child}>
			{(fields || []).map((field, index) => (

				<div key={field.id} style={{ padding: '2px' }}>
					{String(index + ONE).split('').map((digit) => ICONS_MAPPINGS[parseInt(digit, 10)])}
					<Child
						{...rest}
						key={field.id}
						field={field}
						index={index}
						control={control}
						controls={controls}
						name={name}
						remove={remove}
						disabled={disabled}
						error={error?.[index]}
						length={fields.length}
					/>
				</div>
			))}

		</div>
	);
}

export default FieldArray;
