import {
	Button, Tabs, TabPanel, RadioGroup, SingleDateRange,
} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { serviceType } from '../../../utils/constants/filterOptions';
import { walletType } from '../../../utils/constants/walletOptions';

import styles from './styles.module.css';

const tabData = [
	{ name: 'IMPORT', title: 'Import' },
	{ name: 'EXPORT', title: 'Export' },
	{ name: 'LOCAL', title: 'Local' },
	{ name: 'DOMESTIC', title: 'Domestic' },
];

function Content({
	filters = {},
	setFilters = () => {},
	receivables = '',
	setReceivables = () => {},
	refetch = () => {},
	tradeTab = '',
	setTradeTab = () => {},
	setShow = () => {},
}) {
	const onChange = (val = '', name = '') => {
		setFilters((p) => ({ ...p, [name]: val }));
	};

	const handleChange = (val = '') => {
		setReceivables(val);
	};

	const handleTradeTabChange = (val = '') => {
		setTradeTab(val);
		setFilters((p) => ({ ...p, tradeType: val }));
	};

	return (
		<div className={styles.filter_div_style}>
			<div className={styles.tab_container}>
				<div className={styles.search_container}>
					<div className={styles.styled_search_text}>Filters</div>
					<div className={styles.button_container}>
						<div className={styles.reset_button}>
							<Button
								themeType="secondary"
								size="sm"
								onClick={() => {
									setFilters({
										Service               : null,
										Entity                : null,
										walletUsed            : null,
										operationalClosedDate : null,
										creationDate          : null,
										tradeType             : '',
									});
									setTradeTab('');
									refetch({ setShow });
								}}
							>
								RESET
							</Button>
						</div>
						<Button
							themeType="primary"
							size="sm"
							onClick={() => {
								refetch({ setShow });
							}}
						>
							APPLY
						</Button>
					</div>
				</div>
				<Tabs
					activeTab={receivables}
					onChange={(val) => handleChange(val)}
					themeType="primary-vertical"
					style={{ display: 'flex', width: '440px' }}
				>
					<TabPanel name="Service" title="Service">
						<div className={styles.style_radio}>
							<Tabs
								activeTab={tradeTab}
								onChange={(val) => handleTradeTabChange(val)}
								themeType="primary-horizontal"
							>
								{tabData.map((tab) => (
									<TabPanel key={tab.name} name={tab.name} title={tab.title} />
								))}
							</Tabs>
							<RadioGroup
								options={serviceType}
								value={filters?.Service}
								onChange={(val) => onChange(val, 'Service')}
								className={styles.style_radio}
							/>
						</div>
					</TabPanel>
					<TabPanel name="Wallet Used" title="Wallet Used">
						<div className={styles.style_radio}>
							<RadioGroup
								options={walletType}
								value={filters?.walletUsed}
								onChange={(val) => onChange(val, 'walletUsed')}
								className={styles.style_radio}
							/>
						</div>
					</TabPanel>
					<TabPanel name="Operational Closed Date" title="Operational Closed Date">
						<div className={styles.style_radio}>
							<SingleDateRange
								placeholder="Select Date"
								dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
								name="date"
								isPreviousDaysAllowed
								onChange={(val) => onChange(val, 'operationalClosedDate')}
								value={filters?.operationalClosedDate}
								maxDate={new Date()}
							/>
						</div>
					</TabPanel>
					<TabPanel name="Creation Date" title="Creation Date">
						<div className={styles.style_radio}>
							<SingleDateRange
								placeholder="Select Date"
								dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
								name="date"
								isPreviousDaysAllowed
								onChange={(val) => onChange(val, 'creationDate')}
								value={filters?.creationDate}
								maxDate={new Date()}
							/>
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}
export default Content;
