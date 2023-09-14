import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../../../common/Layout';
import airControls from '../../../../configurations/air-freight-filters';
import fclControls from '../../../../configurations/fcl-freight-filters';
import mutateFields from '../../../../utils/mutate-fields';

import styles from './styles.module.css';

function FilterContainer({
	globalFilters = {}, setGlobalFilters = () => {}, showText = true,
	setVisible = () => {}, view = '',
}) {
	const { service_type = 'fcl', parent_mode = null } = globalFilters;

	const {
		control,
		formState: { errors },
		reset,
		watch,
		setValue,
		handleSubmit,
	} = useForm({ defaultValues: { service_type: 'fcl' } });

	const controls = service_type === 'air' ? airControls : fclControls;

	const values = watch();

	const { newFields } = mutateFields({
		controls,
		containerType: values?.container_type,
		setGlobalFilters,
		globalFilters,
	});

	useEffect(() => {
		setValue('commodity', []);
	}, [values?.container_type, setValue]);

	useEffect(() => {
		setValue(
			'parent_mode',
			parent_mode,
		);
	}, [parent_mode, setValue]);

	const onReset = () => {
		setGlobalFilters((prev) => ({ ...prev, parent_mode: undefined }));
		reset();
	};

	const onSumbit = () => {
		setGlobalFilters((prev) => ({ ...prev, ...values, parent_mode: values?.parent_mode }));
		setVisible(false);
	};

	const showElements = {
		service_type: view === 'map_view',
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
				showElements={showElements}
			/>
		</div>
	);
}

export default FilterContainer;
