import { useFieldArray, useForm } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import { LEVELS_CONFIG } from '../../Config/levels-config';
import Header from '../../Header';

import Column from './Column';
import styles from './styles.module.css';

function LevelForm({ background = '#f3fafa' }, ref) {
	const {
		control,
		// watch,
		handleSubmit,
		formState: { errors = {} },
	} = useForm({ defaultValues: { levels: [{}] } });

	useImperativeHandle(ref, () => ({ handleSubmit }));
	const { fields = [], append, remove } = useFieldArray({ control, name: 'levels' });
	return (
		<div className={styles.container} style={{ backgroundColor: background }}>
			<Header config={LEVELS_CONFIG} />
			<div className={styles.paddingbottom}>
				{fields.map((field, index) => (
					<Column
						key={field.id}
						config={LEVELS_CONFIG}
						control={control}
						remove={remove}
						append={append}
						index={index}
						errors={errors}
						totalLength={fields.length}
					/>
				))}
			</div>
		</div>
	);
}

export default forwardRef(LevelForm);
