import { Button } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMUnlock, IcMLock } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import ValuePercentage from './ValuePercentage';

export const ARCHIVE_MONTH_BOOKED = [
	{
		Header   : 'SID',
		accessor : 'sid',
		id       : 'sid',
		Cell     : ({ row: { original } }) => {
			const { jobNumber = '', serviceType = '' } = original || {};
			return (

				<div className={styles.job_number}>
					<div className={styles.job_number_data}>{ jobNumber || '-' }</div>
					<div>{startCase(serviceType || '-')}</div>
				</div>

			);
		},
	},
	{
		Header   : 'Transaction Date',
		accessor : 'etd',
		id       : 'etd',
		Cell     : ({ row: { original } }) => {
			const { etd } = original || {};
			return <span>{ format(etd, 'dd/MM/yyy') || '-' }</span>;
		},
	},
	{
		Header   : 'Expense Booked',
		accessor : 'expenseBooked',
		id       : 'expenseBooked',
		Cell     : ({ row: { original } }) => {
			const { expenseBooked, expenseCurrency } = original || {};
			return <span>{getFormattedPrice(expenseBooked, expenseCurrency) || '-' }</span>;
		},
	},
	{
		Header   : 'Income Booked',
		accessor : 'incomeBooked',
		id       : 'incomeBooked',
		Cell     : ({ row: { original } }) => {
			const { incomeBooked, incomeCurrency } = original || {};
			return <span>{getFormattedPrice(incomeBooked, incomeCurrency) || '-' }</span>;
		},
	},
	{
		Header   : 'Booked Profit',
		accessor : 'bookedProfit',
		id       : 'bookedProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="bookedProfit" />,
	},
	{
		Header   : 'Actual Profit',
		accessor : 'actualProfit',
		id       : 'actualProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="actualProfit" />,
	},
	{
		Header   : 'Variance',
		accessor : 'variance',
		id       : 'variance',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="variance" />,
	},
];

export const ARCHIVE_MONTH_ACCRUED = [
	{
		Header   : 'SID',
		accessor : 'sid',
		id       : 'sid',
		Cell     : ({ row: { original } }) => {
			const { jobNumber = '', serviceType = '' } = original || {};
			return (

				<div className={styles.job_number}>
					<div className={styles.job_number_data}>{ jobNumber || '-' }</div>
					<div>{startCase(serviceType || '-')}</div>
				</div>

			);
		},
	},
	{
		Header   : 'Transaction Date',
		accessor : 'etd',
		id       : 'etd',
		Cell     : ({ row: { original } }) => {
			const { etd } = original || {};
			return <span>{ format(etd, 'dd/MM/yyy') || '-' }</span>;
		},
	},
	{
		Header   : 'Expense Booked',
		accessor : 'expenseBooked',
		id       : 'expenseBooked',
		Cell     : ({ row: { original } }) => {
			const { expenseBooked, expenseCurrency } = original || {};
			return <span>{getFormattedPrice(expenseBooked, expenseCurrency) || '-' }</span>;
		},
	},
	{
		Header   : 'Income Booked',
		accessor : 'incomeBooked',
		id       : 'incomeBooked',
		Cell     : ({ row: { original } }) => {
			const { incomeBooked, incomeCurrency } = original || {};
			return <span>{getFormattedPrice(incomeBooked, incomeCurrency) || '-' }</span>;
		},
	},
	{
		Header   : 'Booked Profit',
		accessor : 'bookedProfit',
		id       : 'bookedProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="bookedProfit" />,
	},
	{
		Header   : 'Actual Profit',
		accessor : 'actualProfit',
		id       : 'actualProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="actualProfit" />,
	},
	{
		Header   : 'Variance',
		accessor : 'variance',
		id       : 'variance',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="variance" />,
	},
];

export const ARCHIVE_DECLARED = (
	setMonthData,
	particularMonth,
	setParticularMonth,
	getDrillDownArchive,
	setShowTab,
) => [
	{
		Header   : '',
		accessor : 'isLocked',
		id       : 'isLocked',
		Cell     : ({ row: { original } }) => {
			const { isLocked } = original || {};
			return <span>{isLocked ? <IcMLock /> : <IcMUnlock /> || '-' }</span>;
		},
	},
	{
		Header   : 'Month',
		accessor : 'periodName',
		id       : 'periodName',
		Cell     : ({ row: { original } }) => {
			const { periodName } = original || {};
			return <span>{periodName || '-' }</span>;
		},
	},
	{
		Header   : 'Expense Booked',
		accessor : 'expenseBooked',
		id       : 'expenseBooked',
		Cell     : ({ row: { original } }) => {
			const { expenseBooked, expenseCurrency } = original || {};
			return <span>{getFormattedPrice(expenseBooked, expenseCurrency) || '-' }</span>;
		},
	},
	{
		Header   : 'Expense Accrued',
		accessor : 'expenseAccrued',
		id       : 'expenseAccrued',
		Cell     : ({ row: { original } }) => {
			const { expenseAccrued, expenseCurrency } = original || {};
			return <span>{getFormattedPrice(expenseAccrued, expenseCurrency) || '-' }</span>;
		},
	},
	{
		Header   : 'Income Booked',
		accessor : 'incomeBooked',
		id       : 'incomeBooked',
		Cell     : ({ row: { original } }) => {
			const { incomeBooked, incomeCurrency } = original || {};
			return <span>{getFormattedPrice(incomeBooked, incomeCurrency) || '-' }</span>;
		},
	},
	{
		Header   : 'Income Accrued',
		accessor : 'incomeAccrued',
		id       : 'incomeAccrued',
		Cell     : ({ row: { original } }) => {
			const { incomeAccrued, incomeCurrency } = original || {};
			return <span>{getFormattedPrice(incomeAccrued, incomeCurrency) || '-' }</span>;
		},
	},
	{
		Header   : 'Booked Profit',
		accessor : 'bookedProfit',
		id       : 'bookedProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="bookedProfit" />,
	},
	{
		Header   : 'Actual Profit',
		accessor : 'actualProfit',
		id       : 'actualProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="actualProfit" />,
	},
	{
		Header   : 'Variance',
		accessor : 'variance',
		id       : 'variance',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="variance" />,
	},
	{
		Header   : '',
		accessor : 'view',
		id       : 'view',
		Cell     : ({ row: { original } }) => {
			const clickHandle = () => {
				setMonthData(original);
				setParticularMonth(!particularMonth);
				getDrillDownArchive(original);
				setShowTab(false);
			};
			return (
				<div className={styles.button}>
					<Button className="arrow" onClick={clickHandle} themeType="secondary"> View Button</Button>
				</div>
			);
		},
	},
];
