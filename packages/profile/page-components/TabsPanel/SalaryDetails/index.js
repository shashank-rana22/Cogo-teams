import { Button } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../common/StyledTable';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function PersonalDetails() {
	const columns = [
		{
			Header   : 'Sl. NO',
			accessor : (item) => (<div className={styles.table_item}>{item.slno}</div>),
			id       : 'slno',
		},
		{
			Header   : 'CTC EFFECTIVE FROM',
			accessor : (item) => (<div className={styles.table_item}>{item.ctc_effective_from}</div>),
			id       : 'ctc_effective_from',
		},
		{
			Header   : 'CTC EFFECTIVE TO',
			accessor : (item) => (<div className={styles.table_item}>{item.ctc_effective_to}</div>),
			id       : 'ctc_effective_to',
		},
		{
			Header   : 'MONTHLY GROSS',
			accessor : (item) => (<div className={styles.table_item}>{item.monthly_gross}</div>),
			id       : 'monthly_gross',
		},
		{
			Header   : 'MONTHLY CTC',
			accessor : (item) => (<div className={styles.table_item}>{item.monthly_ctc}</div>),
			id       : 'monthly_ctc',
		},
		{
			Header   : 'ACTION',
			accessor : (item) => (
				<div className={styles.table_item}>
					<Button size="md" themeType="accent">{item.action}</Button>
				</div>
			),
			id: 'action',
		},
	];

	const data = [{
		slno               : 1,
		ctc_effective_from : '12/09/2022',
		ctc_effective_to   : '-',
		monthly_gross      : '79654',
		monthly_ctc        : '82999',
		action             : 'View',
	}];

	const otherInfo = [
		{ label: 'Monthly Gross', value: '79654' },
		{ label: 'Monthly CTC', value: '82999' },
		{ label: 'Annual CTC', value: '1000000' },
		{ label: 'Tax Regime', value: 'Old Regime' },
	];

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>SALARY DETAILS</span>
					<span className={styles.detail}>View and manage salary details</span>
				</div>
				<div className={styles.info_container}>
					<StyledTable columns={columns} data={data} />
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} />
		</div>
	);
}

export default PersonalDetails;
