import { Select, Button, Popover } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { companyType } from '../../../../constants/index';

import styles from './styles.module.css';

function FilterpopOver({
	filters,
	setFilters,
	clearFilter,
}) {
	const [show, setShow] = useState(false);
	const onChange = (val:any | string, name:string) => {
		setFilters((p:object) => ({ ...p, [name]: val }));
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
				<div style={{ marginTop: '12px' }} />

				<div style={{
					fontSize   : '14px',
					fontWeight : 600,
				}}
				>
					{' '}
					Sales Agent

				</div>
				<AsyncSelect
					name="user_id"
					asyncKey="partner_users"
					valueKey="user_id"
					initialCall={false}
					onChange={(userId:any) => onChange(userId, 'salesAgentId')}
					value={filters.salesAgentId}
					placeholder="Select Sales Agent User"
					size="sm"
				/>
				<div style={{ marginTop: '12px' }} />
				<div style={{
					fontSize   : '14px',
					fontWeight : 600,
				}}
				>
					{' '}
					Credit Controller Agent

				</div>

				<AsyncSelect
					name="credit_controller_id"
					asyncKey="partner_users"
					valueKey="user_id"
					initialCall={false}
					onChange={(userId) => onChange(userId, 'creditControllerId')}
					value={filters.creditControllerId}
					placeholder="Select Credit Controller User"
					size="sm"
				/>
				<div style={{ marginTop: '12px' }} />
				<div style={{
					fontSize   : '14px',
					fontWeight : 600,
				}}
				>
					Company Type

				</div>
				<Select
					value={filters.companyType}
					onChange={(val?:any) => onChange(val, 'companyType')}
					isClearable
					placeholder="Select Company Type"
					options={companyType}
					size="sm"
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
				className={styles.popOverStyle}
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
