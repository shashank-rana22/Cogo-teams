import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getFilterControls from '../../../utils/getControls';

import styles from './styles.module.css';

function Filter({ serviceActiveTab = 'air_freight', setFilters = () => {}, setFilterPopover }) {
	const getControls = getFilterControls({ serviceActiveTab });

	const { formState:{ errors }, control, reset, getValues } = useForm({ getControls });

	const handleReset = () => {
		reset();
		setFilters({});
		setFilterPopover(false);
	};

	const handleApplyFilters = () => {
		setFilters(getValues());
		setFilterPopover(false);
	};

	useEffect(() => {
		reset();
	}, [serviceActiveTab, reset]);

	return (
		<div>
			<div className={styles.filter_header}>Filter</div>
			<Layout
				fields={getControls}
				control={control}
				errors={errors}
			/>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.reset_button}
					onClick={() => handleReset()}
				>
					{' '}
					Reset

				</Button>
				<Button size="md" onClick={() => handleApplyFilters()}>Apply</Button>
			</div>

		</div>
	);
}
export default Filter;
