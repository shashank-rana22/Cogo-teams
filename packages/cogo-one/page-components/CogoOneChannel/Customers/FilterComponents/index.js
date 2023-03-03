import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import filterControls from '../../../../configurations/filter-controls';

import Item from './Item';
import styles from './styles.module.css';

function getDefaultValues({ filters }) {
	let defaultValues = {};

	filterControls.forEach((item) => {
		defaultValues = {
			...defaultValues,
			[item.name]: filters[item.name] || (item.name === 'channels' ? [] : ''),
		};
	});

	return defaultValues;
}

function FilterComponents({
	setFilterVisible = () => {},
	setAppliedFilters = () => {},
	appliedFilters = {},
	setActiveCardId = () => {},
}) {
	const defaultValues = getDefaultValues({ filters: appliedFilters });
	const {
		control, formState: { errors }, watch, setValue,
	} = useForm({ defaultValues });

	const formValues = watch();
	let filterValues = {};

	Object.keys(formValues).forEach((item) => {
		if (!isEmpty(formValues[item])) {
			filterValues = { ...filterValues, [item]: formValues[item] };
		}
	});

	const checkFiltersCount = Object.keys(filterValues).length;

	const resetForm = () => {
		filterControls.forEach((item) => {
			setValue(item.name, item.name === 'channels' ? [] : '');
		});
	};

	const handleClick = () => {
		setActiveCardId('');
		setAppliedFilters(filterValues);
		setFilterVisible(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Filters
					{checkFiltersCount ? ` (${checkFiltersCount})` : ''}

				</div>

				<div className={styles.styled_icon}>
					{checkFiltersCount
						? (
							<Button
								size="md"
								themeType="tertiary"
								onClick={() => { resetForm(); }}
							>
								Clear All
							</Button>
						) : null}
				</div>
			</div>

			{filterControls.map((field) => (
				<div className={styles.filter_container} key={field.name}>
					<Item
						{...field}
						control={control}
						value={formValues[field.name]}
						setValue={setValue}
						error={errors[field.name]}
					/>
				</div>
			))}

			<div className={styles.actions}>
				<Button size="md" themeType="tertiary" onClick={() => setFilterVisible(false)}>Cancel</Button>
				<Button size="md" themeType="accent" onClick={() => handleClick()}>Apply</Button>
			</div>
		</div>
	);
}

export default FilterComponents;
