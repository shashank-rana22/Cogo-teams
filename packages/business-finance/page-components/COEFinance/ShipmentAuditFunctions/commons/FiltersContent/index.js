import {
	Button, Tabs, TabPanel, RadioGroup, SingleDateRange,
} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { entityType } from '../../Constants/EntityOptions';
import { serviceType } from '../../Constants/FilterOptions';
import { walletType } from '../../Constants/WalletOptions';

import styles from './styles.module.css';

function Content({
	filters,
	setFilters = () => {},
	receivables,
	setReceivables = () => {},
	// setShow,
	refetch = () => {},
	tradeTab,
	setTradeTab = () => {},
}) {
	const onChange = (val, name) => {
		setFilters((p) => ({ ...p, [name]: val }));
	};

	const handleChange = (val) => {
		setReceivables(val);
	};

	const handleTradeTabChange = (val) => {
		setTradeTab(val);
		setFilters((p) => ({ ...p, tradeType: val }));
	};

	const clearFilter = () => {
		setFilters({
			Service               : null,
			Entity                : null,
			walletUsed            : null,
			operationalClosedDate : null,
			creationDate          : null,
			tradeType             : '',
		});
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
									clearFilter();
									setTradeTab('');
									refetch();
								}}
							>
								RESET
							</Button>
						</div>
						<Button
							themeType="primary"
							size="sm"
							onClick={() => {
								// setShow(false);
								refetch(filters);
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
					{/* <TabPanel name="kamOwner" title="KAM Owner">
                        <div className={styles.tabpanel_style}>
                            <AsyncSelect
                                name="user_id"
                                asyncKey="partner_users"
                                valueKey="user_id"
                                initialCall={false}
                                onChange={(userId: string) => onChange(userId, 'kamId')}
                                value={filters.kamId}
                                placeholder="Select Kam Owner"
                                size="sm"
                                isClearable
                            />
                        </div>
                    </TabPanel>
                    <TabPanel name="salesAgent" title="Sales Agent">
                        <div className={styles.tabpanel_style}>
                            <AsyncSelect
                                name="user_id"
                                asyncKey="partner_users"
                                valueKey="user_id"
                                initialCall={false}
                                onChange={(userId: string) => onChange(userId, 'salesAgentId')}
                                value={filters.salesAgentId}
                                placeholder="Select Sales Agent User"
                                size="sm"
                                isClearable
                            />
                        </div>
                    </TabPanel>
                    <TabPanel
                        name="creditController"
                        title="Credit Controller"
                    >
                        <div className={styles.tabpanel_style}>
                            <AsyncSelect
                                name="credit_controller_id"
                                asyncKey="partner_users"
                                valueKey="user_id"
                                initialCall={false}
                                onChange={(userId: string) => onChange(userId, 'creditControllerId')}
                                value={filters.creditControllerId}
                                placeholder="Select Credit Controller User"
                                size="sm"
                                isClearable
                            />
                        </div>
                    </TabPanel> */}
					<TabPanel name="Service" title="Service">
						<div className={styles.style_radio}>
							<Tabs
								activeTab={tradeTab}
								onChange={(val) => handleTradeTabChange(val)}
								themeType="primary-horizontal"
							>
								<TabPanel name="IMPORT" title="Import" />
								<TabPanel name="EXPORT" title="Export" />
								<TabPanel name="LOCAL" title="Local" />
								<TabPanel name="DOMESTIC" title="Domestic" />
								{/* <TabPanel name="Local" title="Local" />
								<TabPanel name="Domestic" title="Domestic" /> */}
							</Tabs>
							<RadioGroup
								options={serviceType}
								value={filters?.Service}
								onChange={(val) => onChange(val, 'Service')}
								className={styles.style_radio}
							/>
						</div>
					</TabPanel>
					<TabPanel name="Entity" title="Entity">
						<div className={styles.style_radio}>
							<RadioGroup
								options={entityType}
								value={filters?.Entity}
								onChange={(val) => onChange(val, 'Entity')}
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
							{/* <Datepicker
								placeholder="Select Date"
								dateFormat="MM/dd/yyyy"
								name="date"
								onChange={(val) => onChange(val, 'operationalClosedDate')}
								value={filters?.operationalClosedDate}
							/> */}
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
							{/* <Datepicker
								placeholder="Select Date"
								dateFormat="MM/dd/yyyy"
								name="date"
								onChange={(val) => onChange(val, 'creationDate')}
								value={filters?.creationDate}
							/> */}
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
