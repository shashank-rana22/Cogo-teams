import Layout from '@cogoport/air-modules/components/Layout';
import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import airControls from '../../../../configurations/air-freight-filters';
import fclControls from '../../../../configurations/fcl-freight-filters';
import mutateFields from '../../../../utils/mutate-fields';

import styles from './styles.module.css';

function FilterContainer({
	globalFilters = {}, setGlobalFilters = () => {}, showText = true,
	setVisible = () => {}, view = '',
}) {
	const { service_type = 'fcl', mode = null } = globalFilters;

	const {
		control,
		formState: { errors },
		reset,
		watch,
		setValue,
		handleSubmit,
	} = useForm();

	const controls = service_type === 'fcl' ? fclControls : airControls;
	const values = watch();

	const { newFields } = mutateFields({
		controls,
		containerType: values?.container_type,
		setGlobalFilters,
	});

	useEffect(() => {
		setValue('commodity', []);
	}, [values?.container_type, setValue]);

	useEffect(() => {
		setValue(
			'mode',
			mode,
		);
	}, [mode, setValue]);

	const onReset = () => {
		setGlobalFilters((prev) => ({ ...prev, mode: undefined }));
		reset();
	};

	const onSumbit = () => {
		setGlobalFilters((prev) => ({ ...prev, ...values }));
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
				key={service_type}
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
