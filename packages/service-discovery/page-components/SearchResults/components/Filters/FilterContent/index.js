import { Button, Accordion } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import getElementController from '../../../../../configs/getElementController';
import getFilterControls from '../getControls';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

function FilterItem({ controls, control, watch }) {
	const formValues = watch();

	return (
		<>
			{controls.map((controlItem) => {
				const { label, type, name } = controlItem;

				if (type === 'field-array') {
					return (
						<div className={styles.field_array} key={name}>
							<FieldArray
								formValues={formValues}
								control={control}
								watch={watch}
								{...controlItem}
							/>
						</div>
					);
				}

				const Element = getElementController(type);

				return (
					<div key={`${name}_${label}`} className={styles.form_item}>
						<div className={styles.label}>
							{label || ''}
							{' '}
							{controlItem?.rules ? (
								<div className={styles.required_mark}>*</div>
							) : null}
						</div>

						<Element
							{...controlItem}
							name={name}
							label={label}
							control={control}
						/>

					</div>
				);
			})}
		</>
	);
}

function FilterContent() {
	const { control, watch } = useForm();

	const controls = getFilterControls();

	console.log('FORM Values', watch());

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const { label, controls: itemControls } = controlItem;

					return (
						<div className={styles.filter_item} key={controlItem?.label}>
							<Accordion type="text" title={label} style={{ width: '100%' }}>
								<FilterItem
									controls={itemControls}
									control={control}
									watch={watch}
								/>
							</Accordion>
						</div>
					);
				})}
			</div>
			<div className={styles.button}>
				<Button
					size="xl"
					themeType="accent"
					style={{ width: '90%' }}
					className={styles.button}
				>
					Apply Filters
				</Button>
			</div>
		</div>
	);
}

export default FilterContent;
