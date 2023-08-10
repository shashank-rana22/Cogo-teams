import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getFilterControls from '../../../utils/getControls';

import styles from './styles.module.css';

const STORAGE_KEY = 'air_booking_desk';

const applyFilterValues = ({
	filter = {},
	prevServiceActiveTab = 'air_freight_service',
	setValue = () => {},
}) => {
	Object.keys(filter || {}).forEach((item) => {
		if (item !== prevServiceActiveTab) {
			setValue(item, filter?.[item]);
		} else {
			Object.keys(filter[item] || {}).forEach((itm) => {
				setValue(itm, filter?.[item]?.[itm]);
			});
		}
	});
};

function Filter({
	serviceActiveTab = 'air_freight',
	setFilters = () => {},
	setFilterPopover = () => {},
}) {
	const getControls = getFilterControls({ serviceActiveTab });

	const { formState:{ errors }, control, reset, getValues, setValue } = useForm({ getControls });

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
			state                      : '',
		});
		setFilters({});
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ serviceActiveTab, filters: {} }));
		setFilterPopover(false);
	};

	const handleApplyFilters = () => {
		const serviceName = serviceActiveTab.concat('_service');
		const data = getValues();
		const {
			tags = '', importer_exporter_id = '',
			fault_alarms_raised = '', origin_airport_id = '',
			trade_type = '', destination_airport_id = '', airport_id = '',
			triggered_pending_invoices = '', state = '',
		} = data || {};

		const empty_val = Object.values(data).some((item) => !isEmpty(item));

		const filteredFilters = (empty_val ? {
			tags                       : tags ? [tags] : undefined,
			fault_alarms_raised        : fault_alarms_raised || undefined,
			importer_exporter_id       : importer_exporter_id || undefined,
			triggered_pending_invoices : triggered_pending_invoices || undefined,
			[serviceName]              : {
				origin_airport_id      : origin_airport_id || undefined,
				destination_airport_id : destination_airport_id || undefined,
				trade_type             : trade_type || undefined,
				airport_id             : airport_id || undefined,
				state                  : state || undefined,
			},

		} : {});
		setFilters(filteredFilters);
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ serviceActiveTab, filters: filteredFilters }));
		setFilterPopover(false);
	};

	useEffect(() => {
		const storageData = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
		const {
			serviceActiveTab: storageServiceActiveTab = 'air_freight',
			filters: filter = {},
		} = storageData || {};

		if (serviceActiveTab !== storageServiceActiveTab) {
			reset({
				tags                       : '',
				fault_alarms_raised        : '',
				origin_airport_id          : '',
				destination_airport_id     : '',
				trade_type                 : '',
				airport_id                 : '',
				importer_exporter_id       : '',
				triggered_pending_invoices : '',
				state                      : '',
			});
			setFilters({});
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ serviceActiveTab, filters: {} }));
			return;
		}
		const prevServiceActiveTab = serviceActiveTab.concat('_service');
		applyFilterValues({ filter, prevServiceActiveTab, setValue });
		setValue('tags', filter?.tags?.[GLOBAL_CONSTANTS.zeroth_index]);
		setFilters(filter);
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ serviceActiveTab, filters: filter }));
	}, [reset, serviceActiveTab, setFilters, setValue]);

	return (
		<div className={styles.filter_container}>
			<div className={styles.header}>
				<div className={styles.filter_header}>Filters</div>
				<IcMCross onClick={() => setFilterPopover(false)} className={styles.cross_icon} />
			</div>
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
