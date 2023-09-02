import { Button, RadioGroup, SingleDateRange, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SERVICE_TYPE } from '../../constants';

import styles from './styles.module.css';

function Content({
	clearFilter = () => {},
	refetch = () => {},
	setShow = () => {},
	receivables = '',
	filters = {},
	handleChange = () => {},
	onChange = () => {},
}) {
	return (
		<div className={styles.filter_div_style}>
			<div className={styles.search_container}>
				<div className={styles.styled_search_text}>Filters</div>
				<div className={styles.button_container}>
					<div className={styles.reset_button}>
						<Button
							themeType="secondary"
							size="sm"
							onClick={() => {
								clearFilter();
								refetch();
								setShow(false);
							}}
						>
							RESET
						</Button>
					</div>
					<Button
						themeType="primary"
						size="sm"
						onClick={() => {
							setShow(false);
							refetch(filters);
						}}
					>
						APPLY
					</Button>
				</div>
			</div>
			<Tabs
				activeTab={receivables}
				onChange={handleChange}
				themeType="primary-vertical"
				style={{ display: 'flex', width: '440px' }}
			>
				<TabPanel name="services" title="Service type">
					<div className={styles.tabpanel_style}>
						<RadioGroup
							options={SERVICE_TYPE}
							value={filters?.services}
							onChange={(val) => onChange(val, 'services')}
							className={styles.style_radio}
						/>
					</div>
				</TabPanel>
				<TabPanel name="invoiceDate" title="Invoice Date">
					<div className={styles.tabpanel_style}>
						<SingleDateRange
							name="invoiceDate"
							placeholder="Invoice Date"
							value={filters?.invoiceDate}
							onChange={(val) => onChange(val, 'invoiceDate')}
							isPreviousDaysAllowed
							style={{ width: '200px' }}
						/>
					</div>
				</TabPanel>
				<TabPanel name="dueDate" title="Due Date">
					<div className={styles.tabpanel_style}>
						<SingleDateRange
							name="dueDate"
							placeholder="Due Date"
							value={filters?.dueDate}
							onChange={(val) => onChange(val, 'dueDate')}
							isPreviousDaysAllowed
							style={{ width: '200px' }}
						/>
					</div>
				</TabPanel>
				<TabPanel name="currency" title="Currency">
					<div className={styles.tabpanel_style}>
						<RadioGroup
							options={Object.keys(
								GLOBAL_CONSTANTS.currency_code,
							).map((currencyCode) => ({
								name  : currencyCode,
								label : currencyCode,
								value : currencyCode,
							}))}
							value={filters?.currency}
							onChange={(val) => onChange(val, 'currency')}
							className={styles.style_radio}
						/>
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Content;
