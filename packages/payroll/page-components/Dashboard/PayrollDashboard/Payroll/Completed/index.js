import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCross, IcMLocation, IcMArrowRight } from '@cogoport/icons-react';
import { getMonth, getYear, startCase } from '@cogoport/utils';
import React from 'react';

import { MONTHS } from '../../../../../utils/constants';

import styles from './styles.module.css';

const tabData = {
	paid      : { name: 'paid', title: 'Completed', background: ' #849e4c', color: '#FFFFFF' },
	approved  : { name: 'approved', title: 'Approved', background: ' #849e4c', color: '#FFFFFF' },
	pending   : { name: 'pending', title: 'Pending', background: ' #fef199', color: '#221F20' },
	cancelled : { name: 'cancelled', title: 'Failed', background: ' #ee3425', color: '#FFFFFF' },
};

const CIRCLE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Clock_orange.svg';
const PROFILE_SHADOW = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/profile_shadow.svg';

function GetStatus(activeTab, status) {
	if (activeTab === null) {
		return <div />;
	}
	const item = tabData[activeTab];
	return (
		<div className={styles.progress_btn} style={{ background: item.background }}>
			<span style={{ color: item.color }}>{startCase(status)}</span>
		</div>
	);
}

function CompletedTab({
	activeTab = '', data = {},
	handleSetup = () => {}, setId = () => {}, setFromPayroll = () => {},
}) {
	const handleClickText = (id) => {
		if (activeTab === 'pending') {
			setFromPayroll('pending');
			handleSetup('run_payroll');
		} else if (activeTab === 'approved' || activeTab === 'paid') {
			setFromPayroll('paid');
			handleSetup('run_payroll');
		}
		setId(id);
	};

	return (
		<div className={styles.flex}>
			<div className={styles.toast_msg}>
				<div className={styles.section1}>
					<img
						src={CIRCLE}
						alt="yellow_circle"
					/>
					<span className={styles.text}>
						{data?.pending_count}
						{' '}
						Employees not paid yet
					</span>

				</div>

				<div className={styles.section1}>
					<Button
						size="lg"
						className={styles.header_button}
						themeType="secondary"
						onClick={() => handleSetup('run_payroll')}
					>
						Run Payroll for
						{' '}
						{data?.pending_count}
						{' '}
						employees

					</Button>
					<IcMCross />

				</div>

			</div>

			{
	data?.payroll_detail?.map((item) => (
		<div
			key={item.payroll_date}
			className={styles.completed_card}
			style={{ cursor: activeTab === 'cancelled' ? 'auto' : 'pointer' }}
			aria-hidden
			onClick={() => handleClickText(item.id)}
		>
			<div className={styles.text_section}>
				<span className={styles.head_text}>
					{MONTHS[getMonth(new Date(item?.paid_on))]}
					{' '}
					{getYear(new Date(item?.paid_on))}
					{' '}
					{item.batch_name ? '-' : ''}
					{' '}
					{item?.batch_name}
				</span>
				<span className={styles.subhead_text}>
					Ran by
					{' '}
					{data?.employee_name}
					{' '}
					{formatDate({
						date       : item?.processed_on,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : ' ',
					})}
				</span>
			</div>

			<div className={styles.section1}>
				<img
					src={PROFILE_SHADOW}
					alt="profile_shadow"
					width="16px"
					height="16px"
				/>
				<span className={styles.text_right}>{item.employee_count}</span>
				<IcMLocation
					width="16px"
					height="16px"
				/>
				<span className={styles.text_right}>Mumbai, Gurgoan</span>
				<span className={styles.text_right}>
					{' '}
					₹
					{' '}
					{item.total_payout}
				</span>
				{
						GetStatus(activeTab, item.status)
					}
				<IcMArrowRight
					width="16px"
					height="16px"
				/>

			</div>
		</div>
	))
}

		</div>

	);
}

export default CompletedTab;
