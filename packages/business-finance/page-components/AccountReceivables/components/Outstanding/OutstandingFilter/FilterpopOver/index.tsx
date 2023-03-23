import { CheckboxGroup, Select, Button, Popover } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { companyType, DUE_IN, SALES_AGENT } from '../../../../constants/index';

import styles from './styles.module.css';

function FilterpopOver({
	filters,
	setFilters,
	clearFilter,
}) {
	const [show, setShow] = useState(false);
	const onChange = (val:string, name:string) => {
		setFilters((p) => ({ ...p, [name]: val }));
	};

	const content = (
		<div>
			<div className={styles.search_container}>
				<div className={styles.styled_search_text}>
					Search
				</div>
				<div className={styles.button_container}>
					<div className={styles.reset_button}>
						<Button
							themeType="primary"
							size="sm"
							onClick={() => {
								clearFilter();
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
						}}
					>
						APPLY
					</Button>

				</div>
			</div>
			<div className={styles.popover_content}>
				<AsyncSelect
					name="user_id"
					asyncKey="partner_users"
					valueKey="user_id"
					initialCall={false}
					onChange={(userId) => onChange(userId, 'salesAgentId')}
					value={filters.salesAgentId}
					placeholder="Select Sales Agent User"
					size="sm"
				/>
				<div className={styles.Margin} />
				<AsyncSelect
					name="credit_controller_id"
					asyncKey="list_locations"
					valueKey="user_id"
					initialCall={false}
					onChange={(userId) => onChange(userId, 'creditControllerId')}
					value={filters.salesAgentId}
					placeholder="Select Credit Controller User"
					size="sm"
				/>
				<div className={styles.Margin} />

				<Select
					value={filters.dueIn}
					onChange={(val:string) => onChange(val, 'ageingKey')}
					placeholder="Select Due In"
					options={DUE_IN}
					isClearable
					size="sm"
				/>
				<div className={styles.Margin} />

				<Select
					value={filters.companyType}
					onChange={(val:string) => onChange(val, 'companyType')}
					isClearable
					placeholder="Select Company Type"
					options={companyType}
					size="sm"
				/>
				<div className={styles.Margin} />

				<CheckboxGroup
					style={{ flexDirection: 'column', width: '100%' }}
					options={SALES_AGENT}
					onChange={(val:string) => onChange(val, 'checkBox')}
					value={filters.checkBox}
				/>
			</div>
		</div>
	);
	return (
		<div>
			<Popover
				visible={show}
				placement="bottom"
				render={content}
				interactive
				className={styles.popover_container}
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
					<IcMFilter />
				</Button>
			</Popover>

		</div>
	);
}

export default FilterpopOver;
