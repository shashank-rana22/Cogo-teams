import { useFieldArray, useForm } from '@cogoport/forms';
import React from 'react';

import { LEVELS_CONFIG } from '../../Config/levels-config';
import Header from '../../Header';

import Column from './Column';
import styles from './styles.module.css';

export function LevelForm() {
	const {
		control,
		// watch,
		// handleSubmit,
		// formState: { errors = {} },
	} = useForm({ defaultValues: { levels: [{}] } });

	const { fields = [], append, remove } = useFieldArray({ control, name: 'levels' });
	return (
		<div className={styles.container}>
			<Header config={LEVELS_CONFIG} />
			{fields.map((field, index) => (
				<Column
					key={field.id}
					config={LEVELS_CONFIG}
					remove={remove}
					append={append}
					length={index}
					totalLength={fields.length}
				/>
			))}
		</div>
	);
}
