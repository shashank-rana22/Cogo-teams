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
		reset({
			tags                       : '',
			fault_alarms_raised        : '',
			origin_airport_id          : '',
			destination_airport_id     : '',
			trade_type                 : '',
			airport_id                 : '',
			importer_exporter_id       : '',
			triggered_pending_invoices : '',
		});
		setFilters({});
		setFilterPopover(false);
	};

	const handleApplyFilters = () => {
		const serviceName = serviceActiveTab.concat('_service');
		const data = getValues();
		const {
			tags = '', importer_exporter_id = '',
			fault_alarms_raised = '', origin_airport_id = '',
			trade_type = '', destination_airport_id = '', airport_id = '',
			triggered_pending_invoices = '',
		} = data || {};

		setFilters({
			tags                       : tags ? [tags] : undefined,
			fault_alarms_raised        : fault_alarms_raised || undefined,
			importer_exporter_id       : importer_exporter_id || undefined,
			triggered_pending_invoices : triggered_pending_invoices || undefined,
			[serviceName]              : {
				origin_airport_id      : origin_airport_id || undefined,
				destination_airport_id : destination_airport_id || undefined,
				trade_type             : trade_type || undefined,
				airport_id             : airport_id || undefined,
			},

		});
		setFilterPopover(false);
	};

	useEffect(() => {
		reset({
			tags                   : '',
			fault_alarms_raised    : '',
			origin_airport_id      : '',
			destination_airport_id : '',
			trade_type             : '',
			airport_id             : '',
			importer_exporter_id   : '',

		});
		setFilters({});
	}, [serviceActiveTab, reset, setFilters]);

	return (
		<div>
			<div className={styles.filter_header}>Filters</div>
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
