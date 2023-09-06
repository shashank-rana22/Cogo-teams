import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../../../common/Layout';

import styles from './styles.module.css';

function FilterContent({ filterValues = () => {}, setFilterValues = () => {}, controls = [] }) {
	const DEFAULT_VALUES = filterValues;

	const { control, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES });
	const handleFilterSubmit = (value) => {
		// console.log(value);
		setFilterValues(value);
	};
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.form_header}>
					<Button themeType="tertiary">Clear Filters</Button>

					<Button themeType="primary" onClick={handleSubmit(handleFilterSubmit)}>Apply</Button>

				</div>
				<Layout controls={controls} control={control} />
			</div>
		</div>
	);
}

export default FilterContent;
