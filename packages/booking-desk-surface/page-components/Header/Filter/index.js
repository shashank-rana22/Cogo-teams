import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import Layout from '@cogoport/surface-modules/components/Layout';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import filterControls from '../../../constants/filter-common-controls';

import styles from './styles.module.css';

const CONTROLS = [...filterControls];

function Filter({
	serviceActiveTab = 'ftl_freight',
	setFilters = () => {},
	setFilterPopover = () => {},
}) {
	const { formState:{ errors }, control, reset, getValues } = useForm({ CONTROLS });

	const handleReset = () => {
		reset({
			tags                       : '',
			fault_alarms_raised        : '',
			trade_type                 : '',
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
			tags = '', importer_exporter_id = '', fault_alarms_raised = '', trade_type = '',
			triggered_pending_invoices = '', state = '', source = '',
		} = data || {};

		const empty_val = Object.values(data).some((item) => !isEmpty(item));

		setFilters(empty_val ? {
			tags                       : tags ? [tags] : undefined,
			fault_alarms_raised        : fault_alarms_raised || undefined,
			importer_exporter_id       : importer_exporter_id || undefined,
			triggered_pending_invoices : triggered_pending_invoices || undefined,
			source,
			[serviceName]              : {
				trade_type : trade_type || undefined,
				state      : state || undefined,
			},

		} : {});
		setFilterPopover(false);
	};

	useEffect(() => {
		reset({
			tags                 : '',
			fault_alarms_raised  : '',
			trade_type           : '',
			importer_exporter_id : '',
			state                : '',

		});
		setFilters({});
	}, [serviceActiveTab, reset, setFilters]);

	return (
		<div className={styles.filter_container}>
			<div className={styles.header}>
				<div className={styles.filter_header}>Filters</div>
				<IcMCross onClick={() => setFilterPopover(false)} className={styles.cross_icon} />
			</div>
			<Layout
				fields={CONTROLS}
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
