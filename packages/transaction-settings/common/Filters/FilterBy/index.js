import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../Layout';

import styles from './styles.module.css';

function FilterBy({ controls = [], filters = {}, setFilters = () => {}, setIsFilterVisible = () => {} }, ref) {
	const { page, ...restFilters } = filters || {};

	const { control, handleSubmit, reset } = useForm({ defaultValues: restFilters });

	useImperativeHandle(ref, () => ({
		onReset() {
			reset();
		},
	}));

	const onReset = () => {
		setFilters({ page: 1 });
		setIsFilterVisible(false);
		reset();
	};

	const onSubmit = (values) => {
		setFilters({ ...restFilters, ...(values || {}), page: 1 });
		setIsFilterVisible(false);
	};

	return (
		<div>
			<div className={styles.action_buttons}>
				<Button onClick={onReset} themeType="secondary" size="md" ref={ref}>
					Reset
				</Button>
				<Button onClick={handleSubmit(onSubmit)} themeType="primary" size="md">
					Apply
				</Button>
			</div>
			<div>
				<Layout controls={controls} control={control} />
			</div>
		</div>
	);
}

export default forwardRef(FilterBy);
