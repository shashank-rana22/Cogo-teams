import { Toast, Select } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import React from 'react';

import controls from './getFilterControls.json';
import styles from './styles.module.css';

function FclRevenueFilters({
	hookSetters,
	setShowFilters = () => {},
	activeTab,

}) {
	const {
		handleSubmit, control, reset,
	} = useForm();

	const selectLocationOptions = useGetAsyncOptions({
		...controls[1],
	});

	const [originValue, setOriginValue] = React.useState('');
	const [destinationValue, setDestinationValue] = React.useState('');
	const [tradeValue, setTradeValue] = React.useState('');

	const handleApply = async () => {
		let filters = {};
		const filled_filters = {};

		await handleSubmit(() => {
			filters = {
				...filters, origin_port_id: originValue, destination_port_id: destinationValue, trade_type: tradeValue,
			};
		})();

		let isEmpty = true;
		Object.keys(filters || {}).forEach((key) => {
			if (filters[key]) {
				filled_filters[key] = filters[key];
				isEmpty = false;
			}
		});

		if (isEmpty) {
			Toast.warn('Please Apply filters');
		} else {
			setShowFilters(false);

			filled_filters.state = activeTab === 'pending' ? 'awaiting_service_provider_confirmation'
				: 'confirmed_by_service_provider';

			hookSetters.setFilters({ fcl_freight_service: filled_filters });
		}
	};

	const clearFilters = () => {
		reset();
		hookSetters.setFilters({
			fcl_freight_service: {
				state:
					activeTab === 'pending'
						? 'awaiting_service_provider_confirmation'
						: 'confirmed_by_service_provider',
			},
		});
		setShowFilters(false);
	};

	return (
		<div className={styles.form_container}>
			<div className={styles.form_item}>
				<label className={styles.label}>Trade Type</label>

				<Select
					value={tradeValue}
					control={control}
					name="trade_type"
					options={controls[0]?.options}
					placeholder="Trade Type"
					onChange={(val) => setTradeValue(val)}
				/>
			</div>
			<div className={styles.form_item}>
				<label className={styles.label}>Origin Port</label>
				<Select
					value={originValue}
					name="name"
					placeholder="Select"
					isClearable
					onChange={setOriginValue}
					{...selectLocationOptions}
				/>
			</div>
			<div className={styles.form_item}>
				<label className={styles.label}>Destination Port</label>
				<Select
					value={destinationValue}
					name="name"
					placeholder="Select"
					isClearable
					onChange={setDestinationValue}
					{...selectLocationOptions}
				/>
			</div>
			<div className={styles.button_container}>
				<button
					onClick={() => clearFilters()}
					style={{ marginRight: '10px' }}
					className={styles.button_primary}
				>
					Reset
				</button>

				<button
					onClick={() => handleApply()}
					className={styles.button_secondary}
				>
					Apply
				</button>

			</div>
		</div>
	);
}

export default FclRevenueFilters;
