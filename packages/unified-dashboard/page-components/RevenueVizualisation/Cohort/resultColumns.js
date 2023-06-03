import React, { useMemo } from 'react';

import styles from './styles.module.css';

function ResultColumns() {
	const renderPercentage = (data) => (data === '-' ? '' : '%');

	const renderColor = (num) => {
		if (num === '-') {
			return '#fff';
		}

		if (Number(num) >= 75) {
			return '#FCDC00';
		}
		if (Number(num) >= 50) {
			return '#FDE74D';
		}

		if (Number(num) >= 25) {
			return '#FEF199';
		}

		return '#FFFCE6';
	};

	return useMemo(
		() => [
			{
				Header   : <div className={styles.head}>Months</div>,
				accessor : (item) => <div className={styles.data}>{item.signup_date}</div>,
				key      : 'signup_date',
				id       : 'signup_date',
			},
			{
				Header   : <div className={styles.head}>Signup Cust.</div>,
				accessor : (item) => <div className={styles.data}>{item.customers}</div>,
				key      : 'customers',
				id       : 'customers',
			},
			{
				Header   : <div className={styles.head}>Transacting Cust.</div>,
				accessor : (item) => <div className={styles.data}>{item.transacting_customers}</div>,
				key      : 'transacting_customers',
				id       : 'transacting_customers',
			},
			{
				Header: (
					<div className={styles.head}>
						1
						<sup>st</sup>
&nbsp;month
					</div>
				),
				accessor: (item) => (
					<div
						className={styles.data}
						style={{
							background : renderColor(item['1st_month']),
							color      : '#ee3425',
						}}
					>
						{item['1st_month']}
						{' '}
						{renderPercentage(item['1st_month'])}
					</div>
				),
				key : '1st_month',
				id  : '1st_month',
			},
			{
				Header: (
					<div className={styles.head}>
						2
						<sup>nd</sup>
&nbsp;month
					</div>
				),
				accessor: (item) => (
					<div
						className={styles.data}
						style={{
							background : renderColor(item['2nd_month']),
							color      : '#ee3425',
						}}
					>
						{item['2nd_month']}
						{' '}
						{renderPercentage(item['2nd_month'])}
						{' '}
					</div>
				),
				key : '2nd_month',
				id  : '2nd_month',
			},
			{
				Header: (
					<div className={styles.head}>
						3
						<sup>rd</sup>
&nbsp;month
					</div>
				),
				accessor: (item) => (
					<div
						className={styles.data}
						style={{
							background : renderColor(item['3rd_month']),
							color      : '#ee3425',
						}}
					>
						{item['3rd_month']}
						{' '}
						{renderPercentage(item['3rd_month'])}
					</div>
				),
				key : '3rd_month',
				id  : '3rd_month',
			},
			{
				Header: (
					<div className={styles.head}>
						4
						<sup>th</sup>
&nbsp;month
					</div>
				),
				accessor: (item) => (
					<di
						className={styles.data}
						style={{
							background : renderColor(item['4th_month']),
							color      : '#ee3425',
						}}
					>
						{item['4th_month']}
						{' '}
						{renderPercentage(item['4th_month'])}
					</di>
				),
				key : '4th_month',
				id  : '4th_month',
			},
		],
		[],
	);
}

export default ResultColumns;
