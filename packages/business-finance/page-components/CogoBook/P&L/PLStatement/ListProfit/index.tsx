import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import { mappingData } from '../constant';

import styles from './styles.module.css';

function ListProfit({
	ratiosData,
	// reportTriggerLoading,
	// ratiosTriggerLoading,
	reportData,
	filters,
}) {
	const [dropDown, setDropDown] = useState({
		revenue   : true,
		operating : true,
		employee  : true,
		finance   : true,
		other     : true,
		tax       : true,
	});

	// if (!reportTriggerLoading && !ratiosTriggerLoading) {
	// 	return null;
	// }

	console.log({ ratiosData, reportData }, 'reportData');

	const getMapData = () => (reportData?.list || [{}]).map((item) => {
		const {
			revenueFromOps = 0,
			bookedRevenue = 0,
			accruedRevenue = 0,
			operatingExpenses = 0,
			bookedExpense = 0,
			accruedExpense = 0,
			totalEmployeeBenefitExpenses = 0,
			employeeBenefitExpenses,
			totalDepreciationAndAmortization = 0,
			totalFinanceCost = 0,
			financeCost,
			totalOtherExpense = 0,
			otherExpense,
			totalOtherIncome = 0,
			// otherIncome,
			totalExceptionalItems = 0,
			totalExtraordinaryItems = 0,
			totalPriorPeriodItem = 0,
			// priorPeriodItems,
			totalTaxExpense = 0,
		} = item;

		const ratioData = (ratiosData?.list || [{}])?.find((itemRatio) => itemRatio.ratioBasis === filters?.ratio);

		const {
			esops = 0,
			gratuityLeaveEncashment = 0,
			personnelCost = 0,
			housekeepingSecuritySubscriptionsTravelStayAndCC = 0,
			salariesBonusIncentivesAndStaffWelfareExpenses = 0,
		} = employeeBenefitExpenses || {};

		const {
			foreignExchangeGainNet = 0,
			interestIncomeOnFd = 0,
			interestOnLoanDiscountOnBillsAndBankCharges = 0,
			miscelleneousIncome = 0,
		} = financeCost || {};

		const {
			provisionsAndWriteOffs = 0,
			marketingExpense = 0,
			roundOff = 0,
			salariesBonusIncentivesAndStaffWelfareExpenses:
			// salariesBonusIncentivesAndStaffWelfareExpensesExpoense = 0,
			// operating_expenses = 0,
			repairsAndMaintenance = 0,
			techAndProductCosts = 0,
			anyOtherCosts = 0,
			currencySuspenseAccount = 0,
			rentElectricityAndMaintenance = 0,
			personnelCost: personnelExpenseCost = 0,
			legalComplianceBooksAndMis = 0,
			ratesAndTaxes = 0,
			rentAndTaxes = 0,
			interestOnLoanDiscountOnBillsAndBankCharges:
			interestOnLoanDiscountOnBillsAndBankChargesExpense = 0,
		} = otherExpense || {};

		const key = filters?.radio ? filters?.radio : 'nothing';
		const mode = filters?.mode ? 'ON' : 'OFF';

		const getRelevantData = () => {
			if (filters?.mode) {
				const relevantData = mappingData(filters)[mode] || [{}];
				return relevantData;
			}
			const relevantData = mappingData(filters)[mode][key] || [{}];
			return relevantData;
		};

		const ArrayLength = getRelevantData().length;
		const calculateWidth = `${50 / ArrayLength}%`;

		return (
			<div>
				<div className={styles.data_sub}>

					<div className={styles.header_particular}>PARTICULARS</div>
					{
						getRelevantData().map((itemHeader) => (
							<div
								className={styles.header_ocean}
								style={{ width: calculateWidth }}
								id={itemHeader?.key}
							>
								{itemHeader?.name}
							</div>
						))
					}
				</div>
				<div className={styles.data_sub}>
					<div className={styles.first_particular}>
						<div className={styles.particular_data_review}>
							(-) Revenue From Operations
							<div
								className={styles.icon_data}
								onClick={() => {
									setDropDown((prev) => ({ ...prev, revenue: !dropDown?.revenue }));
								}}
								role="presentation"
							>
								<IcMArrowDown />
							</div>
						</div>
						{dropDown?.revenue && <div>Booked Revenue</div>}
						{dropDown?.revenue && <div>Accrued Revenue</div>}

						<div className={styles.particular_data_review}>
							(-) Operating Expenses
							<div
								className={styles.icon_data}
								onClick={() => {
									setDropDown((prev) => ({ ...prev, operating: !dropDown?.operating }));
								}}
								role="presentation"
							>
								<IcMArrowDown />
							</div>
						</div>
						{dropDown?.operating && <div>Booked Expenses</div>}
						{dropDown?.operating && <div>Accrued Expenses</div>}
					</div>

					{getRelevantData().map((itemData) => {
						const ratio = ratioData?.turnoverRatioDetails?.[itemData?.key] || 1;
						return (
							<div className={styles.first_ocean} style={{ width: calculateWidth }}>
								<div className={styles.particular_data}>
									{(revenueFromOps * ratio).toFixed(2)}
								</div>
								{dropDown?.revenue && <div>{bookedRevenue * ratio}</div>}
								{dropDown?.revenue && <div>{accruedRevenue * ratio}</div>}
								<div className={styles.particular_data}>
									{(operatingExpenses * ratio).toFixed(2)}
								</div>
								{dropDown?.operating && <div>{(bookedExpense * ratio).toFixed(2)}</div>}
								{dropDown?.operating && <div>{(accruedExpense * ratio).toFixed(2)}</div>}
							</div>
						);
					})}

				</div>

				<div className={styles.data_sub}>
					<div className={styles.header_particular}>GROSS PROFIT</div>
					{getRelevantData()?.map((itemVal) => {
						const ratio = ratioData?.turnoverRatioDetails?.[itemVal?.[key]] || 1;
						return (
							<div className={styles.header_ocean} style={{ width: calculateWidth }}>
								{((revenueFromOps - operatingExpenses) * ratio).toFixed(2)}
							</div>
						);
					})}

				</div>

				<div className={styles.data_sub}>
					<div className={styles.first_particular}>
						<div className={styles.particular_data_review}>
							(-) Employee Benefit Expenses
							<div
								className={styles.icon_data}
								onClick={() => {
									setDropDown((prev) => ({ ...prev, employee: !dropDown?.employee }));
								}}
								role="presentation"
							>
								<IcMArrowDown />
							</div>
						</div>
						{dropDown?.employee && <div>ESOPs</div>}
						{dropDown?.employee && <div>Gratuity & Leave Encashment</div>}
						{dropDown?.employee && <div>Personnel Cost</div>}
						{dropDown?.employee && <div>Housekeeping, Security, Subscriptions, Travel, Stay and CC</div>}
						{dropDown?.employee && <div>Salaries, Bonus, Incentives and Staff Welfare Expenses</div>}

						<div className={styles.depreciation}>
							(-) Depreciation and Amortization
						</div>

						<div className={styles.particular_data_review}>
							(-) Finance Cost
							<div
								className={styles.icon_data}
								onClick={() => {
									setDropDown((prev) => ({ ...prev, finance: !dropDown?.finance }));
								}}
								role="presentation"
							>
								<IcMArrowDown />
							</div>
						</div>
						{dropDown?.finance && <div>Foreign Exchange Gain (Net)</div>}
						{dropDown?.finance && <div>Interest on Loan, Discount on Bills and Bank Charges</div>}
						{dropDown?.finance && <div>Miscellaneous Income</div>}
						{dropDown?.finance && <div>Interest Income on FD</div>}

						<div className={styles.particular_data_review}>
							(-) Other Expenses
							<div
								className={styles.icon_data}
								onClick={() => {
									setDropDown((prev) => ({ ...prev, other: !dropDown?.other }));
								}}
								role="presentation"
							>
								<IcMArrowDown />
							</div>
						</div>
						{dropDown?.other && <div>Interest on Loan, Discount on Bills and Bank Charges</div>}
						{dropDown?.other && <div>Legal, Compliance, Books and MIS</div>}
						{dropDown?.other && <div>Marketing Expense</div>}
						{dropDown?.other && <div>Personnel Cost</div>}
						{dropDown?.other && <div>Provisions and Write-offs</div>}
						{dropDown?.other && <div>Rates & Taxes</div>}
						{dropDown?.other && <div>Rent & Taxes</div>}
						{dropDown?.other && <div>Rent Electricity and Maintenance</div>}
						{dropDown?.other && <div>Repairs and Maintenance</div>}
						{dropDown?.other && <div>Salaries, Bonus, Incentives and Staff Welfare Expenses</div>}
						{dropDown?.other && <div>Tech & Product Costs</div>}
						{dropDown?.other && <div>Currency Suspense Account</div>}
						{dropDown?.other && <div>Round off</div>}
						{dropDown?.other && <div>Any other costs</div>}

						<div className={styles.depreciation}>
							Other Income
						</div>
					</div>

					{
						getRelevantData()?.map((itemValue) => {
							const ratio = ratioData?.turnoverRatioDetails?.[itemValue?.key] || 1;
							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									<div className={styles.particular_data}>
										{(totalEmployeeBenefitExpenses * ratio).toFixed(2)}
									</div>
									{dropDown?.employee && <div>{(esops * ratio).toFixed(2)}</div>}
									{dropDown?.employee && <div>{(gratuityLeaveEncashment * ratio).toFixed(2)}</div>}
									{dropDown?.employee && (
										<div>
											{(housekeepingSecuritySubscriptionsTravelStayAndCC
												* ratio).toFixed(2)}
										</div>
									)}
									{dropDown?.employee && <div>{(personnelCost * ratio).toFixed(2)}</div>}
									{dropDown?.employee && (
										<div>
											{(salariesBonusIncentivesAndStaffWelfareExpenses * ratio).toFixed(2)}
										</div>
									)}
									<div className={styles.particular_data}>
										{(totalDepreciationAndAmortization * ratio).toFixed(2)}
									</div>
									<div className={styles.particular_data}>
										{(totalFinanceCost
										* ratio).toFixed(2)}

									</div>
									{dropDown?.finance && <div>{foreignExchangeGainNet * ratio}</div>}
									{dropDown?.finance && (
										<div>
											{interestOnLoanDiscountOnBillsAndBankCharges * ratio}
										</div>
									)}
									{dropDown?.finance && <div>{miscelleneousIncome * ratio}</div>}
									{dropDown?.finance && <div>{interestIncomeOnFd * ratio}</div>}
									<div className={styles.particular_data}>{totalOtherExpense * ratio}</div>
									{dropDown?.other && (
										<div>
											{interestOnLoanDiscountOnBillsAndBankChargesExpense * ratio}
										</div>
									)}
									{dropDown?.other && <div>{legalComplianceBooksAndMis * ratio}</div>}
									{dropDown?.other && <div>{marketingExpense * ratio}</div>}
									{dropDown?.other && <div>{personnelExpenseCost * ratio}</div>}
									{dropDown?.other && <div>{provisionsAndWriteOffs * ratio}</div>}
									{dropDown?.other && <div>{ratesAndTaxes * ratio}</div>}
									{dropDown?.other && <div>{rentAndTaxes * ratio}</div>}
									{dropDown?.other && <div>{rentElectricityAndMaintenance * ratio}</div>}
									{dropDown?.other && <div>{repairsAndMaintenance * ratio}</div>}
									{dropDown?.other && (
										<div>
											{salariesBonusIncentivesAndStaffWelfareExpenses * ratio}
										</div>
									)}
									{dropDown?.other && <div>{techAndProductCosts * ratio}</div>}
									{dropDown?.other && <div>{currencySuspenseAccount * ratio}</div>}
									{dropDown?.other && <div>{roundOff * ratio}</div>}
									{dropDown?.other && <div>{anyOtherCosts * ratio}</div>}
									<div className={styles.particular_data}>{totalOtherIncome * ratio}</div>
								</div>
							);
						})
					}

				</div>

				<div className={styles.data_sub}>
					<div className={styles.header_particular}>
						PROFIT BEFORE EXCEPTIONAL AND EXTRAORDINARY ITEMS (B)
					</div>
					{
						getRelevantData()?.map((Val) => {
							const ratio = ratioData?.[Val?.[key]] || 1;
							return (
								<div className={styles.header_ocean} style={{ width: calculateWidth }}>
									{
								(revenueFromOps
									- operatingExpenses
									- totalDepreciationAndAmortization - totalFinanceCost - totalOtherExpense
								) * ratio
								}
								</div>
							);
						})
						}
				</div>

				<div className={styles.data_sub}>
					<div className={styles.first_particular}>
						<div className={styles.depreciation}>
							Exceptional Items
						</div>

						<div className={styles.depreciation}>
							Extraordinary Items
						</div>
						<div className={styles.depreciation}>
							Prior Period Item
						</div>

					</div>

					{
						getRelevantData()?.map((itemValue) => {
							const ratio = ratioData?.[itemValue[key]] || 1;
							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									<div className={styles.particular_data}>{totalExceptionalItems * ratio}</div>
									<div className={styles.particular_data}>{totalExtraordinaryItems * ratio}</div>
									<div className={styles.particular_data}>{totalPriorPeriodItem * ratio}</div>

								</div>
							);
						})
					}
				</div>
				<div className={styles.data_sub}>
					<div className={styles.header_particular}>PROFIT BEFORE TAX (C)</div>
					{
						getRelevantData()?.map((value) => {
							const ratio = ratioData?.[value[key]] || 1;
							return (
								<div
									className={styles.header_ocean}
									style={{ width: calculateWidth }}
								>
									{(revenueFromOps
								- operatingExpenses
								- totalDepreciationAndAmortization
								- totalFinanceCost
								- totalOtherExpense
								- totalExceptionalItems - totalExtraordinaryItems - totalPriorPeriodItem) * ratio}
								</div>
							);
						})
					}
				</div>

				<div className={styles.data_sub}>
					<div className={styles.first_particular}>
						<div className={styles.particular_data_review}>
							(-) Tax Expense
						</div>

					</div>

					{
						getRelevantData()?.map((itemDataValue) => {
							const ratio = ratioData?.[itemDataValue?.key] || 1;

							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									<div className={styles.particular_data}>{totalTaxExpense * ratio}</div>
								</div>
							);
						})
}

				</div>
				<div className={styles.data_sub}>
					<div className={styles.header_particular}>PROFIT AFTER TAX (D)</div>
					{
						getRelevantData()?.map((valData) => {
							const ratio = ratioData?.[valData?.key] || 1;
							return (
								<div className={styles.header_ocean} style={{ width: calculateWidth }}>
									{(revenueFromOps - operatingExpenses
									- totalDepreciationAndAmortization
									- totalFinanceCost - totalOtherExpense
									- totalExceptionalItems - totalExtraordinaryItems
									- totalPriorPeriodItem - totalTaxExpense) * ratio}

								</div>
							);
						})
					}
				</div>
			</div>
		);
	});

	return (
		<div className={styles.container}>
			{getMapData()}
		</div>

	);
}
export default ListProfit;
