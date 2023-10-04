import { Input, Select, SingleDateRange } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';

import SegmentedControl from '../../../commons/SegmentedControl/index.js';
import {
	ALL_REQUEST,
	VIEW_BY,
} from '../Constants';

import styles from './styles.module.css';

const CURRENCY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.currency_code).map((currencyCode) => ({
	label : currencyCode,
	value : currencyCode,
}));

const ENTITY_OPTION_CURRENCY = GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service.treasury
	.currencies.map((currencyCode) => ({
		label : currencyCode,
		value : currencyCode.toLowerCase(),
	}));

function SelectFilters({
	filters = {},
	setFilters = () => {},
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
								setFilters((prev) => ({ ...prev, reportTime: val })))}
							background="#FDEBE9"
							color="#ED3726"
						/>
						<div className={styles.currency_toggle}>
							<SegmentedControl
								options={CURRENCY_OPTIONS}
								activeTab={filters?.reportCurrency}
								setActiveTab={(val) => (
									setFilters((prev) => ({ ...prev, reportCurrency: val })))}
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
								setFilters((prev) => ({ ...prev, entityRequest: val })))}
							background="#FDEBE9"
							color="#ED3726"
						/>
						<div className={styles.curency_select}>
							<Select
								options={ENTITY_OPTION_CURRENCY}
								value={filters?.entityCurrency}
								placeholder="Select Currency"
								onChange={(val) => (
									setFilters((prev) => ({ ...prev, entityCurrency: val })))}
								background="#FDEBE9"
								color="#ED3726"
								isClearable
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
								onChange={(value) => setFilters((prev) => ({
									...prev,
									search: value || undefined,
								}))}
								placeholder="Search by Account Number"
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
								onChange={(value) => setFilters((prev) => ({
									...prev,
									date: value || undefined,
								}))}
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
