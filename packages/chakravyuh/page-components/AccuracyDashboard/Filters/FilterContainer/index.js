import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useCallback, useEffect } from 'react';

import Layout from '../../../../common/Layout';
import airControls from '../../../../configurations/air-freight-filters';
import fclControls from '../../../../configurations/fcl-freight-filters';
import getDefaultValues from '../../../../utils/getDefaultValues';
import mutateFields from '../../../../utils/mutate-fields';

import styles from './styles.module.css';

function FilterContainer({
	globalFilters = {}, setGlobalFilters = () => {}, showText = true,
	setVisible = () => {},
}) {
	const { service_type = 'fcl' } = globalFilters;
	const controls = service_type === 'air' ? airControls : fclControls;

	const { defaultValues, fields } = getDefaultValues(controls);

	const {
		control,
		formState: { errors, dirtyFields },
		reset,
		watch,
		setValue,
		handleSubmit,
	} = useForm({ defaultValues });

	const values = watch();

	const { newFields } = mutateFields({
		fields,
		containerType: values?.container_type,
		setGlobalFilters,
		globalFilters,
	});

	useEffect(() => {
		if (dirtyFields?.container_type) {
			setValue('commodity', []);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values?.container_type]);

	const onReset = useCallback(() => {
		const obj = Object.keys(values).reduce((acc, key) => {
			acc[key] = null;
			return acc;
		}, {});

		reset(obj);
	}, [reset, values]);

	const onSumbit = () => {
		setGlobalFilters((prev) => ({
			...prev,
			...values,
			service_type,
			parent_mode: values?.source || values?.parent_mode,
		}));
		setVisible(false);
	};

	return (
		<div className={cl`${styles.main_container} ${!showText ? styles.small_view : ''}`}>
			<div className={styles.header_row}>
				<span className={styles.title}>Filters</span>
				<div className={styles.filter_action_buttons}>
					<Button themeType="secondary" onClick={onReset}>Reset</Button>
					<Button themeType="accent" onClick={handleSubmit(onSumbit)}>Apply</Button>
				</div>
			</div>
			<Layout
				className={styles.layout_container}
				fields={newFields}
				errors={errors}
				control={control}
			/>
		</div>
	);
}

export default FilterContainer;
