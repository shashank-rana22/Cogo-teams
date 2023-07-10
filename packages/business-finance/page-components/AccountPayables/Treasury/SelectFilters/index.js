import { Input, SingleDateRange } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import { IcMSearchlight } from '@cogoport/icons-react';

import SegmentedControl from '../../../commons/SegmentedControl/index.tsx';
import {
	ALL_REQUEST,
	VIEW_BY,
} from '../Constants';

import styles from './styles.module.css';

const geo = getGeoConstants();

const CURRENCY_OPTIONS = geo?.navigations.business_finance
	.account_payables.treasury.allowed_currency.map((currency) => (
		{
			label : currency,
			value : currency,
		}
	));

const ENTITY_OPTION_CURRENCY = geo?.navigations.business_finance
	.account_payables.treasury.entity_option_currency.map((currency) => (
		{
			label : currency,
			value : currency.toLowerCase(),
		}
	));

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
						<div className={styles.currency_toggle}>
							<SegmentedControl
								options={ENTITY_OPTION_CURRENCY}
								activeTab={filters?.entityCurrency}
								setActiveTab={(val) => (
									setFilters((prev) => ({ ...prev, entityCurrency: val })))}
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
