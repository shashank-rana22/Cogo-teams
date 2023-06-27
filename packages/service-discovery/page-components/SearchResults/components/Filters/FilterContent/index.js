import { Button, Accordion } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import FilterItem from './FilterItem';
import getFilterControls from './getControls';
import styles from './styles.module.css';

function FilterContent({ data = {}, setShow }) {
	const { control, watch, formState: { errors }, handleSubmit, setValue } = useForm();

	const controls = getFilterControls(data, 'search_type');

	const handleApply = () => {
		setShow(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const { label: itemLabel, controls: itemControls } = controlItem;

					return (
						<div className={styles.filter_item} key={controlItem?.label}>
							<Accordion type="text" title={itemLabel} style={{ width: '100%' }}>
								<FilterItem
									controls={itemControls}
									control={control}
									watch={watch}
									errors={errors}
									handleSubmit={handleSubmit}
									setValue={setValue}
								/>
							</Accordion>
						</div>
					);
				})}
			</div>

			<div className={styles.button}>
				<Button
					type="button"
					size="xl"
					themeType="accent"
					className={styles.button}
					onClick={handleSubmit(handleApply)}
				>
					Apply Filters
				</Button>
			</div>
		</div>
	);
}

export default FilterContent;
