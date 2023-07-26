import Layout from '@cogoport/air-modules/components/Layout';
import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import airControls from '../../../../configurations/air-freight-filters';
import fclControls from '../../../../configurations/fcl-freight-filters';
import mutateFields from '../../../../utils/mutate-fields';

import styles from './styles.module.css';

function FilterContainer({ globalFilters = {}, setGlobalFilters = () => {}, showText = true, modeOptions = [] }) {
	const { service_type = 'fcl', rate_type = null } = globalFilters;
	const {
		control,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm();

	const controls = service_type === 'fcl' ? fclControls : airControls;
	const containerType = watch('container_type');
	const { newFields } = mutateFields({ controls, containerType, setGlobalFilters, modeOptions });

	useEffect(() => {
		setValue('commodity', []);
	}, [containerType, setValue]);

	useEffect(() => {
		setValue(
			'mode',
			rate_type,
		);
	}, [rate_type, setValue]);

	const resetPopover = () => {
		setGlobalFilters((prev) => ({ ...prev, rate_type: undefined }));
		reset();
	};

	return (
		<div className={cl`${styles.main_container} ${!showText ? styles.small_view : ''}`}>
			<div className={styles.header_row}>
				<span className={styles.title}>Filters</span>
				<div className={styles.filter_action_buttons}>
					<Button themeType="secondary" onClick={resetPopover}>Reset</Button>
					<Button themeType="accent">Apply</Button>
				</div>
			</div>
			<Layout
				key={service_type}
				className={styles.layout_container}
				fields={newFields}
				errors={errors}
				control={control}
			/>
		</div>
	);
}

export default FilterContainer;
