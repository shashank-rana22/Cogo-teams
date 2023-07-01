import { Button, Popover } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowBack, IcMUnlock, IcMLock, IcMArrowRotateDown } from '@cogoport/icons-react';

import ValuePercentage from '../ValuePercentage';

import styles from './styles.module.css';

interface MonthInterface {
	data?:{
		periodName?:string
		expenseCurrency?:string
		expenseBooked?:number
		isLocked?:boolean
		expenseAccrued?:string
		incomeCurrency?:string
		incomeBooked?:number
		incomeAccrued?:string
		actualExpense?:number
		actualIncome?:number
	}
	handleClick?: () => void
	loading?:boolean
}

function MonthInfo({ data, handleClick, loading }:MonthInterface) {
	const {
		periodName,
		expenseCurrency,
		expenseBooked = 0,
		expenseAccrued,
		incomeCurrency,
		incomeBooked = 0,
		incomeAccrued,
		actualExpense = 0,
		actualIncome = 0,
		isLocked,
	} = data || {};

	const renderContent = () => (
		<div className={styles.variance_styles}>
			<div>
				<div className={styles.expense}>Expense Variation</div>
				<div>
					Amount :
					{' '}
					<span className={styles.amount}>
						{formatAmount({
							amount   :	(expenseBooked - actualExpense) as any,
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
							amount   :	(incomeBooked - actualIncome) as any,
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
		<div>

			<div className={styles.container}>
				<div className={styles.button_container}>
					<Button
						onClick={handleClick}
						disabled={loading}
						className={styles.secondary_button}
						themeType="secondary"
					>
						<IcMArrowBack />
					</Button>
				</div>

				<div className={styles.info_container} style={{ width: '236px' }}>
					<span>{isLocked ? <IcMLock /> : <IcMUnlock /> || '-' }</span>

					<div>
						<div className={styles.para_data}>Month</div>
						<div className={styles.para}>{periodName}</div>
					</div>
				</div>

				<div className={styles.info_container_border}>
					<div>
						<div className={styles.para_data}>Expense Booked</div>
						<div className={styles.para}>
							{formatAmount({
								amount   :	(expenseBooked || actualExpense) as any,
								currency : expenseCurrency,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})}
						</div>
					</div>

					<div>
						<div className={styles.para_data}>Expense Accrued</div>
						<div className={styles.para}>
							{formatAmount({
								amount   :	expenseAccrued,
								currency : expenseCurrency,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})}
						</div>
					</div>
				</div>

				<div className={styles.info_container_border}>
					<div>
						<div className={styles.para_data}>Income Booked</div>
						<div className={styles.para}>
							{formatAmount({
								amount   :	(incomeBooked || actualIncome) as any,
								currency : incomeCurrency,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})}
						</div>
					</div>

					<div>
						<div className={styles.para_data}>Income Accrued</div>
						<div className={styles.para}>
							{formatAmount({
								amount   :	incomeAccrued,
								currency : incomeCurrency,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})}
						</div>
					</div>
				</div>

				<div className={styles.info_container_border} style={{ width: '432px' }}>
					<div>
						<div className={styles.para_data}>Booked Profit</div>
						<div className={styles.para}>
							<ValuePercentage data={data} keys="bookedProfit" flag />
						</div>
					</div>

					<div>
						<div className={styles.para_data}>Actual Profit</div>
						<div className={styles.para}>
							<ValuePercentage data={data} keys="actualProfit" flag />
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<Popover
							placement="bottom"
							render={renderContent()}
						>
							<div>
								<div className={styles.variance_data}>
									Variance
									<IcMArrowRotateDown />
								</div>

							</div>
						</Popover>
						<div className={styles.para}>
							<ValuePercentage data={data} keys="variance" flag />
						</div>
					</div>

				</div>

			</div>
		</div>
	);
}
export default MonthInfo;
