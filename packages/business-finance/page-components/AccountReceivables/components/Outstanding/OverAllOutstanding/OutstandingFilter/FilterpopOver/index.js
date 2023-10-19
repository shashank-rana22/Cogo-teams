import {
	Button,
	Popover,
	Tabs,
	TabPanel,
	RadioGroup,
} from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { companyType } from '../../../../../constants/index';

import styles from './styles.module.css';

function FilterpopOver({
	filters = {},
	setFilters = () => {},
	clearFilter = () => {},
	refetch = () => {},
}) {
	const [show, setShow] = useState(false);
	const [receivables, setReceivables] = useState('kamOwner');

	const onChange = (val, name) => {
		setFilters((p) => ({ ...p, [name]: val }));
	};
	const rest = { onClickOutside: () => setShow(false) };

	const handleChange = (val) => {
		setReceivables(val);
	};

	function Content() {
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
						onChange={(val) => handleChange(val)}
						themeType="primary-vertical"
						style={{ display: 'flex', width: '440px' }}
					>
						<TabPanel name="kamOwner" title="KAM Owner">
							<div className={styles.tabpanel_style}>
								<AsyncSelect
									name="user_id"
									asyncKey="partner_users"
									valueKey="user_id"
									initialCall
									onChange={(userId) => onChange(userId, 'kamId')}
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
									initialCall
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
									initialCall
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
	return (
		<div>
			<Popover
				visible={show}
				placement="bottom"
				render={show ? <Content /> : null}
				className={styles.pop_over_style}
				{...rest}
			>
				<Button
					themeType="secondary"
					size="lg"
					onClick={() => {
						setShow(!show);
					}}
				>
					Filters
					{' '}
					<IcMFilter className={styles.style_filter_button} />
				</Button>
			</Popover>
		</div>
	);
}

export default FilterpopOver;
