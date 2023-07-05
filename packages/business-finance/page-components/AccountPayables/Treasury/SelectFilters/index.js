import { Input, SingleDateRange } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import SegmentedControl from '../../../commons/SegmentedControl/index.tsx';
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
	const { search = '', date = '' } = filters || {};
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
							background="#FDEBE9"
							color="#ED3726"
						/>
						<div className={styles.currency_toggle}>
							<SegmentedControl
								options={CURRENCY}
								activeTab={filters?.reportCurrency}
								setActiveTab={(val) => (
									setFilters({ ...filters, reportCurrency: val }))}
								background="#FDEBE9"
								color="#ED3726"
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
							background="#FDEBE9"
							color="#ED3726"
						/>
						<div className={styles.currency_toggle}>
							<SegmentedControl
								options={ALL_INR_USD}
								activeTab={filters?.entityCurrency}
								setActiveTab={(val) => (
									setFilters({ ...filters, entityCurrency: val }))}
								background="#FDEBE9"
								color="#ED3726"

							/>
						</div>
					</div>
				)}
			</div>
			<div className={styles.filter_container}>
				<div className={styles.search_container}>
					{ filters?.activeEntity !== 'reports'
						? (
							<Input
								value={search || ''}
								onChange={(value) => setFilters({
									...filters,
									search: value || undefined,
								})}
								placeholder="Search by account Number"
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
						) : (
							<SingleDateRange
								placeholder="Enter Date Range"
								name="date"
								onChange={(value) => setFilters({
									...filters,
									date: value || undefined,
								})}
								value={date}
								maxDate={new Date()}
								isPreviousDaysAllowed
								style={{ width: '300px' }}
							/>
						)}
				</div>
			</div>
		</div>
	);
}
export default SelectFilters;
