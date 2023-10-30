import { Button, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMUnlock, IcMLock, IcMArrowRotateDown } from '@cogoport/icons-react';
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
		accessor : 'expenseBilled',
		id       : 'expenseBilled',
		Cell     : ({ row: { original } }) => {
			const { expenseBilled, expenseCurrency } = original || {};
			return (
				<span>
					{formatAmount({
						amount   :	expenseBilled,
						currency : expenseCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Income Booked',
		accessor : 'incomeBilled',
		id       : 'incomeBilled',
		Cell     : ({ row: { original } }) => {
			const { incomeBilled, incomeCurrency } = original || {};
			return (
				<span>
					{formatAmount({
						amount   :	incomeBilled,
						currency : incomeCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Booked Profit',
		accessor : 'billedProfit',
		id       : 'billedProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="billedProfit" />,
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
		Cell     : ({ row: { original } }) => {
			const {
				expenseBilled = 0,
				actualExpense = 0,
				incomeBilled = 0,
				actualIncome = 0,
				expenseUnbilled = 0,
				incomeUnbilled = 0,
				expenseCurrency,
			} = original || {};

			const renderContent = () => (
				<div className={styles.variance_styles}>
					<div>
						<div className={styles.expense}>Expense Variation</div>
						<div>
							Amount :
							{' '}
							<span className={styles.amount}>
								{formatAmount({
									amount   :	(actualExpense - (expenseBilled + expenseUnbilled)),
									currency : expenseCurrency,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}

							</span>
						</div>
					</div>
					<div>
						<div className={styles.income}>Income Variation</div>
						<div>
							Amount :
							{' '}
							<span className={styles.amount}>
								{formatAmount({
									amount   :	(actualIncome - (incomeBilled + incomeUnbilled)),
									currency : expenseCurrency,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}

							</span>
						</div>
					</div>
				</div>
			);

			return (
				<Tooltip
					placement="bottom"
					content={renderContent()}
				>
					<div className={styles.cursor}>
						<ValuePercentage data={original} keys="variance" />
						<div><IcMArrowRotateDown /></div>
					</div>
				</Tooltip>
			);
		},
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
		accessor : 'expenseBilled',
		id       : 'expenseBilled',
		Cell     : ({ row: { original } }) => {
			const { expenseBilled, expenseCurrency } = original || {};
			return (
				<span>
					{formatAmount({
						amount   :	expenseBilled,
						currency : expenseCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Expense Accrued',
		accessor : 'expenseUnbilled',
		id       : 'expenseUnbilled',
		Cell     : ({ row: { original } }) => {
			const { expenseUnbilled, expenseCurrency } = original || {};
			return (
				<span>
					{formatAmount({
						amount   :	expenseUnbilled,
						currency : expenseCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Income Booked',
		accessor : 'incomeBilled',
		id       : 'incomeBilled',
		Cell     : ({ row: { original } }) => {
			const { incomeBilled, incomeCurrency } = original || {};
			return (
				<span>
					{formatAmount({
						amount   :	incomeBilled,
						currency : incomeCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},

					}) || '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Income Accrued',
		accessor : 'incomeUnbilled',
		id       : 'incomeUnbilled',
		Cell     : ({ row: { original } }) => {
			const { incomeUnbilled, incomeCurrency } = original || {};
			return (
				<span>
					{formatAmount({
						amount   :	incomeUnbilled,
						currency : incomeCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Booked Profit',
		accessor : 'billedProfit',
		id       : 'billedProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="billedProfit" />,
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
					<Button className="arrow" onClick={clickHandle} themeType="secondary"> View</Button>
				</div>
			);
		},
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
		Header   : 'Expense Accrued',
		accessor : 'expenseUnbilled',
		id       : 'expenseUnbilled',
		Cell     : ({ row: { original } }) => {
			const { expenseUnbilled, expenseCurrency } = original || {};
			return (
				<span>
					{formatAmount({
						amount   :	expenseUnbilled,
						currency : expenseCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Income Accrued',
		accessor : 'incomeUnbilled',
		id       : 'incomeUnbilled',
		Cell     : ({ row: { original } }) => {
			const { incomeUnbilled, incomeCurrency } = original || {};
			return (
				<span>
					{formatAmount({
						amount   :	incomeUnbilled,
						currency : incomeCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Booked Profit',
		accessor : 'billedProfit',
		id       : 'billedProfit',
		Cell     : ({ row: { original } }) => <ValuePercentage data={original} keys="billedProfit" />,
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
		Cell     : ({ row: { original } }) => {
			const {
				expenseBilled = 0,
				actualExpense = 0,
				incomeBilled = 0,
				actualIncome = 0,
				expenseUnbilled = 0,
				incomeUnbilled = 0,
				expenseCurrency,
			} = original || {};

			const renderContent = () => (
				<div className={styles.variance_styles}>
					<div>
						<div className={styles.expense}>Expense Variation</div>
						<div>
							Amount :
							{' '}
							<span className={styles.amount}>

								{formatAmount({
									amount:	(
										actualExpense - (expenseBilled + expenseUnbilled)),
									currency : expenseCurrency,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}

							</span>
						</div>
					</div>
					<div>
						<div className={styles.income}>Income Variation</div>
						<div>
							Amount :
							{' '}
							<span className={styles.amount}>
								{formatAmount({
									amount   :	(actualIncome - (incomeBilled + incomeUnbilled)),
									currency :	expenseCurrency,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}

							</span>
						</div>
					</div>
				</div>
			);

			return (
				<Tooltip
					placement="bottom"
					content={renderContent()}
				>
					<div className={styles.cursor}>
						<ValuePercentage data={original} keys="variance" />
						<div><IcMArrowRotateDown /></div>
					</div>
				</Tooltip>
			);
		},
	},
];
