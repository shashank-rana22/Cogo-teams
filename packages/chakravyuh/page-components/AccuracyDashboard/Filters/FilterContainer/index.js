import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import { usePopupFilterControls } from '../../../../constants/popup_filter_controls';

import styles from './styles.module.css';

function FilterContainer({ globalFilters = {} }) {
	const { service_type = 'fcl' } = globalFilters;
	const {
		control,
		formState: { errors },
		reset,
		watch,
		setValue,
		// handleSubmit,
	} = useForm();

	const final_controls = usePopupFilterControls(service_type, watch('container_type'));
	const containerType = watch('container_type');

	useEffect(() => {
		if (containerType) {
			setValue('commodity_type', []);
		}
	}, [containerType, setValue]);

	return (
		<div className={styles.main_container}>
			<div className={styles.header_row}>
				<span className={styles.title}>Filters</span>
				<div className={styles.filter_action_buttons}>
					<Button themeType="secondary" onClick={reset}>Reset</Button>
					<Button themeType="accent">Apply</Button>
				</div>
			</div>
			<Layout className={styles.layout_container} fields={final_controls} errors={errors} control={control} />
		</div>
	);
}

export default FilterContainer;
