import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import SegmentedControl from '../../../commons/SegmentedControl';
import {
	ALL_INR_USD,
	ALL_REQUEST,
	CURRENCY,
	VIEW_BY,
} from '../Constants';

import styles from './styles.module.css';

function SelectFilters({
	filters,
	setFilters,
}) {
	const { search = '' } = filters || {};
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				{filters?.activeEntity === 'reports' ? (
					<div className={styles.toggle_container}>
						<div className={styles.label}>View By</div>
						<SegmentedControl
							options={VIEW_BY}
							activeTab={filters?.reportTime}
							setActiveTab={(val) => (
								setFilters({ ...filters, reportTime: val }))}
						/>
						<div className={styles.currency_toggle}>
							<SegmentedControl
								options={CURRENCY}
								activeTab={filters?.reportCurrency}
								setActiveTab={(val) => (
									setFilters({ ...filters, reportCurrency: val }))}
							/>
						</div>
					</div>
				) : (
					<div className={styles.toggle_container}>
						<SegmentedControl
							options={ALL_REQUEST}
							activeTab={filters?.entityRequest}
							setActiveTab={(val) => (
								setFilters({ ...filters, entityRequest: val }))}
						/>
						<div className={styles.currency_toggle}>
							<SegmentedControl
								options={ALL_INR_USD}
								activeTab={filters?.entityCurrency}
								setActiveTab={(val) => (
									setFilters({ ...filters, entityCurrency: val }))}

							/>
						</div>
					</div>
				)}
			</div>
			<div className={styles.filter_container}>
				<div className={styles.search_container}>
					{ filters?.activeEntity === 'reports'
						? (
							<Input
								value={search || ''}
								onChange={(value) => setFilters({
									...filters,
									search: value || undefined,
								})}
								placeholder="Search by Shipment ID/Incident No."
								size="sm"
								style={{ width: '340px' }}
								suffix={(
									<IcMSearchlight
										height={20}
										width={20}
										color="#CACACA"
										className={styles.search_icon}
									/>
								)}
							/>
						) : null}
				</div>
			</div>
		</div>
	);
}
export default SelectFilters;
