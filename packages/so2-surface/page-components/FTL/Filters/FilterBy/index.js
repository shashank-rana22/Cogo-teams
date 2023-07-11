import { Button, DateRangepicker, MultiSelect } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useContext, useState } from 'react';

import DashboardContext from '../../../../context/DashboardContext';

import styles from './styles.module.css';

const SHIPMENT_STATES = [
	{
		label : 'Awaiting Service Provider Confirmation',
		value : 'Awaiting Service Provider Confirmation',
	},

	{
		label : 'Confirmed by Service Provider',
		value : 'Confirmed by Service Provider',
	},

	{
		label : 'Cargo Picked Up',
		value : 'Cargo Picked Up',
	},

	{
		label : 'Cargo dropped',
		value : 'Cargo dropped',
	},

	{
		label : 'Completed',
		value : 'Completed',
	},

	{
		label : 'Aborted',
		value : 'Aborted',
	},

	{
		label : 'Cancelled',
		value : 'Cancelled',
	},
];

function FilterBy({
	setPopoverFilter = () => {},
	popoverFilter = {},
	setShowFilterPopover = () => {},
}) {
	const { filters = {}, setFilters } = useContext(DashboardContext);

	const [formValue, setFormValue] = useState({});

	const handleCustomDateChange = (val) => {
		const { startDate, endDate } = val;
		setPopoverFilter({ ...popoverFilter, startDate, endDate });
		setFormValue((prev) => ({ ...prev, startDate, endDate }));
	};

	const handleReset = () => {
		setFormValue({});
		setFilters({});
		setShowFilterPopover(false);
	};

	return (
		<div>
			<div className={styles.action_buttons}>
				<Button
					size="sm"
					onClick={handleReset}
					themeType="tertiary"
				>
					<div className={styles.action_text}>Reset</div>
				</Button>

				<Button
					size="sm"
					onClick={() => {
						setFilters({ ...filters, ...popoverFilter, ...formValue });
						setShowFilterPopover(false);
					}}
				>
					<div className={styles.action_text}>Apply</div>
				</Button>
			</div>

			<div className={styles.filter_container}>
				<AsyncSelect
					value={formValue.service_ops_two_id}
					onChange={(e) => setFormValue((prev) => ({ ...prev, service_ops_two_id: e || undefined }))}
					placeholder="Assigned SO2"
					asyncKey="partner_users_ids"
					params={{
						filters: {
							stakeholder_types: 'service_ops2',
						},
					}}
					size="sm"
					isClearable
				/>
			</div>
			<div style={{ padding: 16, width: '100%' }}>
				<AsyncSelect
					value={formValue.ground_ops_id}
					onChange={(e) => setFormValue((prev) => ({ ...prev, ground_ops_id: e || undefined }))}
					placeholder="Assigned SO2 Ground Ops"
					asyncKey="partner_users_ids"
					params={{
						filters: {
							stakeholder_types: 'ground_ops',
						},
					}}
					isClearable
					size="sm"
				/>
			</div>

			<div className={styles.filter_container}>
				<AsyncSelect
					value={formValue.importer_exporter_id}
					onChange={(e) => setFormValue((prev) => ({ ...prev, importer_exporter_id: e || undefined }))}
					placeholder="Customer"
					isClearable
					size="sm"
					asyncKey="organizations"
					params={{
						filters: {
							account_type : 'importer_exporter',
							status       : 'active',

						},
					}}

				/>
			</div>
			<div className={styles.filter_container}>
				<AsyncSelect
					value={formValue?.ftl_freight_services?.service_provider_id}
					isClearable
					size="sm"
					onChange={(e) => setFormValue((prev) => ({
						...prev,
						ftl_freight_services: { service_provider_id: e || undefined },
					}))}
					placeholder="Service Provider"
					asyncKey="organizations"
					params={{
						filters: {
							account_type : 'service_provider',
							status       : 'active',

						},
					}}

				/>
			</div>
			<div className={styles.filter_container}>
				<MultiSelect
					placeholder="Select Shipment states"
					options={SHIPMENT_STATES}
					onChange={(e) => setFormValue((prev) => ({
						...prev,
						ftl_freight_services: { state: isEmpty(e) ? undefined : e },
					}))}
					value={formValue?.ftl_freight_services?.state}
					isClearable
					size="sm"
					prefix={<div />}
				/>

			</div>
			<div className={styles.filter_container}>
				<DateRangepicker
					value={popoverFilter}
					isClearable
					size="sm"
					onChange={handleCustomDateChange}
					isPreviousDaysAllowed
				/>
			</div>

		</div>
	);
}
export default FilterBy;
