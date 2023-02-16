import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import filterControls from '../../../configurations/filter-controls';

import Item from './Item';
import styles from './styles.module.css';

function getDefaultValues({ filters }) {
	let defaultValues = {};

	filterControls.forEach((item) => {
		defaultValues = {
			...defaultValues,
			[item.name]: filters[item.name] || '',
		};
	});

	return defaultValues;
}

function FilterComponents({
	setFilterVisible = () => { },
	filters = {},
}) {
	const defaultValues = getDefaultValues({ filters });
	const {
		control, formState: { errors },
	} = useForm({ defaultValues });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Filters (3)
				</div>

				<div className={styles.styled_icon}>
					<IcMCross width={20} height={20} onClick={() => setFilterVisible(false)} />
				</div>
			</div>

			{filterControls.map((field) => (
				<div className={styles.filter_container}>
					<Item
						{...field}
						control={control}
						error={errors[field.name]}
					/>
				</div>
			))}

			<div className={styles.actions}>
				<Button size="md" themeType="tertiary" onClick={() => setFilterVisible(false)}>Cancel</Button>
				<Button size="md" themeType="accent">Apply</Button>
			</div>
		</div>
	);
}

export default FilterComponents;
