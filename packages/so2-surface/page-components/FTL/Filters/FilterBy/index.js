import { Button, DateRangepicker } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { useContext, useState } from 'react';

import DocumentDeskContext from '../../../../context/DocumentDeskContext';

import styles from './styles.module.css';

function FilterBy({
	setPopoverFilter = () => {},
	popoverFilter = {},
	setShowPopover = () => {},
}) {
	const { filters = {}, setFilters } = useContext(DocumentDeskContext);

	const [formValue, setFormValue] = useState({});

	const handleCustomDateChange = (val) => {
		const { startDate, endDate } = val;
		setPopoverFilter({ ...popoverFilter, startDate, endDate });
		setFormValue((prev) => ({ ...prev, startDate, endDate }));
	};

	const handleReset = () => {
		setFormValue({});
		setFilters({});
		setShowPopover(false);
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
						setShowPopover(false);
					}}
				>
					<div className={styles.action_text}>Apply</div>
				</Button>
			</div>

			<div className={styles.filter_container}>
				<AsyncSelect
					value={formValue.service_ops2_id}
					onChange={(e) => setFormValue((prev) => ({ ...prev, service_ops2_id: e || undefined }))}
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
