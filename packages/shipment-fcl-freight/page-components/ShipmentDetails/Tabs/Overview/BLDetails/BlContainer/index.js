import { Button, Input, Select } from '@cogoport/components';
import { useState } from 'react';

import useBlContainerMappings from '../../../../../../hooks/useBlContainerMappings';

import styles from './styles.module.css';

function BlContainer({
	data,
	shipment_data,
	setMappingModal = () => { },
	refetch = () => {},
}) {
	const {
		// updateDetails,
		// onError,
		errors,
		// handleSubmit,
		// containerLoading,
		// controls,
		control,
		// fields,
		// showElements,
	} = useBlContainerMappings({
		data,
		shipment_data,
		setMappingModal,
		refetch,
	});
	const [filters, setFilters] = useState({ blNo: '', containerNo: '' });
	return (
		<div className={styles.content}>
			<div className={styles.row_div}>
				<div>
					<div className={styles.text}>BL Number</div>
					<Input
						size="sm"
						className={styles.search_input}
						value={filters.name}
						placeholder="Enter BL Number"
						onChange={(e) => setFilters({ name: e })}
					/>

				</div>
				<div>
					<div className={styles.text}>Container Number</div>
					<Select
						className={styles.select_input}
						value={filters?.service_type}
				// onChange={(e) => setFilters({ service_type: e })}
						placeholder="Choose Container Number"
						isClearable
						size="sm"
					/>

				</div>
			</div>

			<div className={styles.button_div}>
				<Button
					onClick={() => {
						setMappingModal(false);
						// reset();
					}}
					size="md"
					themeType="primary"
					style={{ marginRight: 10 }}
				>
					Cancel
				</Button>
				<Button
						// disabled={loading}
					// onClick={handleSubmit(handleFormSubmit)}
					size="md"
					themeType="primary"
				>
					Update Details
				</Button>
			</div>
		</div>
	);
}

export default BlContainer;
