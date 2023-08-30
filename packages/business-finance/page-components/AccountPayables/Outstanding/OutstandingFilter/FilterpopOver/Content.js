import { Button, RadioGroup, TabPanel, Tabs } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';

import styles from './styles.module.css';

function Content({
	clearFilter = () => {},
	refetch = () => {},
	setShow = () => {},
	filters = {},
	receivables = '',
	onChange = () => {},
	setReceivables = () => {},
	companyType = '',
}) {
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
					onChange={(val) => setReceivables(val)}
					themeType="primary-vertical"
					style={{ display: 'flex', width: '440px' }}
				>
					<TabPanel name="salesAgent" title="Sales Agent">
						<div className={styles.tabpanel_style}>
							<AsyncSelect
								name="user_id"
								asyncKey="partner_users"
								valueKey="user_id"
								initialCall={false}
								onChange={(userId) => onChange(userId, 'salesAgentId')}
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
								onChange={(userId) => onChange(userId, 'creditControllerId')}
								value={filters.creditControllerId}
								placeholder="Select Credit Controller User"
								size="sm"
								isClearable
							/>
						</div>
					</TabPanel>
					<TabPanel name="companyType" title="Company Type">
						<div className={styles.style_radio}>
							<RadioGroup
								options={companyType}
								value={filters?.companyType}
								onChange={(val) => onChange(val, 'companyType')}
								className={styles.style_radio}
							/>
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default Content;
