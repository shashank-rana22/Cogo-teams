import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../../../common/Layout';

import styles from './styles.module.css';

const ZERO = 0;
function FilterContent({
	filterValues = {}, setFilterValues = () => {},
	controls = [], visible = false, setVisible = () => {},
}) {
	const DEFAULT_VALUES = filterValues;

	const { control, handleSubmit, reset } = useForm({ defaultValues: DEFAULT_VALUES });

	const handleFilterSubmit = (value) => {
		const arr = Object.keys(value || {}).filter((item) => (value[item] !== ''));

		if (arr.length !== ZERO) {
			const NEW_VALUE = {};
			arr.forEach((obj) => {
				(NEW_VALUE[obj] = value[obj]);
				return true;
			});

			setFilterValues(NEW_VALUE);
		}
		setVisible(!visible);
	};
	const onReset = () => {
		setFilterValues({});
		reset();
		setVisible(!visible);
	};
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.form_header}>
					<Button themeType="tertiary" onClick={onReset}>
						Clear Filters

					</Button>

					<Button
						themeType="primary"
						onClick={handleSubmit(handleFilterSubmit)}

					>
						Apply

					</Button>

				</div>
				<Layout controls={controls} control={control} />
			</div>
		</div>
	);
}

export default FilterContent;
