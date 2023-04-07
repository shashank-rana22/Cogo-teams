/* eslint-disable max-len */
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
	// const [isRowVisible, setIsRowVisible] = useState(true);
	const isNonZero = filters?.rowCheck?.includes('nonZero');

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

		let isRowVisible = true;
		if (isNonZero && revenueFromOps === 0) {
			isRowVisible = false;
		}

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

				{/* ==== */}
				{true && (
					<div className={styles.data_sub}>
						<div className={styles.first_particular}>
							{isRowVisible && (
								<div className={styles.particular_data_review}>
									Revenue From Operations
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
							)}
							{dropDown?.revenue && (
								<div>
									{isRowVisible && <div>Booked Revenue</div>}
									{isRowVisible && <div>Accrued Revenue</div>}
								</div>
							) }

							{isRowVisible &&	(
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
							)}
							{dropDown?.operating && (
								<div>
									{isRowVisible &&	<div>Booked Expenses</div>}
									{isRowVisible &&	<div>Accrued Expenses</div>}
								</div>
							)}
						</div>

						{getRelevantData().map((itemData) => {
							const ratio = ratioData?.turnoverRatioDetails?.[itemData?.key] || 1;
							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									{isRowVisible &&	(
										<div className={styles.particular_data}>
											{(revenueFromOps * ratio).toFixed(2)}
										</div>
									)}
									{dropDown?.revenue && (
										<>
											{isRowVisible &&		<div>{(bookedRevenue * ratio).toFixed(2)}</div>}
											{isRowVisible &&		<div>{(accruedRevenue * ratio).toFixed(2)}</div>}
										</>
									) }
									{isRowVisible &&	(
										<div className={styles.particular_data}>
											{(operatingExpenses * ratio).toFixed(2)}
										</div>
									)}
									{dropDown?.operating && (
										<>
											{isRowVisible &&	<div>{(bookedExpense * ratio).toFixed(2)}</div>}
											{isRowVisible &&	<div>{(accruedExpense * ratio).toFixed(2)}</div>}
										</>
									)}
								</div>
							);
						})}

					</div>
				)}
				{/* ===== */}

				<div className={styles.data_sub}>
					{isRowVisible && <div className={styles.header_particular}>GROSS PROFIT</div>}
					{getRelevantData()?.map((itemVal) => {
						const ratio = ratioData?.turnoverRatioDetails?.[itemVal?.[key]] || 1;
						return (
							<div className={styles.header_ocean} style={{ width: calculateWidth }}>
								{isRowVisible ? (<span>{((revenueFromOps - operatingExpenses) * ratio).toFixed(2)}</span>) : null}
							</div>
						);
					})}

				</div>

				<div className={styles.data_sub}>
					<div className={styles.first_particular}>
						{isRowVisible && (
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
						)}
						{dropDown?.employee && (
							<>
								{isRowVisible && <div>ESOPs</div>}
								{isRowVisible && <div>Gratuity & Leave Encashment</div>}
								{isRowVisible && <div>Personnel Cost</div>}
								{isRowVisible && <div>Housekeeping, Security, Subscriptions, Travel, Stay and CC</div>}
								{isRowVisible && <div>Salaries, Bonus, Incentives and Staff Welfare Expenses</div>}
							</>
						) }

						{isRowVisible &&	(
							<div className={styles.depreciation}>
								(-) Depreciation and Amortization
							</div>
						)}

						{isRowVisible &&	(
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
						)}
						{dropDown?.finance && (
							<>
								{isRowVisible && <div>Foreign Exchange Gain (Net)</div>}
								{isRowVisible && <div>Interest on Loan, Discount on Bills and Bank Charges</div>}
								{isRowVisible && <div>Miscellaneous Income</div>}
								{isRowVisible && <div>Interest Income on FD</div>}
							</>
						) }

						{isRowVisible &&	(
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
						)}
						{dropDown?.other && (
							<>
								{isRowVisible && <div>Interest on Loan, Discount on Bills and Bank Charges</div> }
								{isRowVisible && <div>Legal, Compliance, Books and MIS</div> }
								{isRowVisible && <div>Marketing Expense</div> }
								{isRowVisible && <div>Personnel Cost</div> }
								{isRowVisible && <div>Provisions and Write-offs</div> }
								{isRowVisible && <div>Rates & Taxes</div> }
								{isRowVisible && <div>Rent & Taxes</div> }
								{isRowVisible && <div>Rent Electricity and Maintenance</div> }
								{isRowVisible && <div>Repairs and Maintenance</div> }
								{isRowVisible && <div>Salaries, Bonus, Incentives and Staff Welfare Expenses</div> }
								{isRowVisible && <div>Tech & Product Costs</div> }
								{isRowVisible && <div>Currency Suspense Account</div>}
								{isRowVisible && <div>Round off</div>}
								{isRowVisible && <div>Any other costs</div> }
							</>
						)}

						{isRowVisible && (
							<div className={styles.depreciation}>
								Other Income
							</div>
						)}
					</div>

					{getRelevantData()?.map((itemValue) => {
						const ratio = ratioData?.turnoverRatioDetails?.[itemValue?.key] || 1;
						return (
							<div className={styles.first_ocean} style={{ width: calculateWidth }}>
								{isRowVisible && (
									<div className={styles.particular_data}>
										{(totalEmployeeBenefitExpenses * ratio).toFixed(2)}
									</div>
								)}
								{dropDown?.employee && (
									<>
										{' '}
										{isRowVisible && <div>{(esops * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(gratuityLeaveEncashment * ratio).toFixed(2)}</div>}

										{isRowVisible && (
											<>
												<div>
													{(housekeepingSecuritySubscriptionsTravelStayAndCC
												* ratio).toFixed(2)}
												</div>

												<div>{(personnelCost * ratio).toFixed(2)}</div>

												<div>
													{(salariesBonusIncentivesAndStaffWelfareExpenses * ratio).toFixed(2)}
												</div>
											</>
										)}
									</>
								)}
								{isRowVisible && (
									<div className={styles.particular_data}>
										{(totalDepreciationAndAmortization * ratio).toFixed(2)}
									</div>
								)}
								{isRowVisible && (
									<div className={styles.particular_data}>
										{(totalFinanceCost
										* ratio).toFixed(2)}

									</div>
								)}
								{dropDown?.finance && (
									<>
										{isRowVisible && <div>{(foreignExchangeGainNet * ratio).toFixed(2)}</div>}

										{isRowVisible && (
											<div>
												{(interestOnLoanDiscountOnBillsAndBankCharges * ratio).toFixed(2)}
											</div>
										)}

										{isRowVisible && <div>{(miscelleneousIncome * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(interestIncomeOnFd * ratio).toFixed(2)}</div>}
									</>
								) }
								{isRowVisible &&	<div className={styles.particular_data}>{(totalOtherExpense * ratio).toFixed(2)}</div>}
								{dropDown?.other
								&& (
									<>
										{isRowVisible && (
											<div>
												{(interestOnLoanDiscountOnBillsAndBankChargesExpense * ratio).toFixed(2)}
											</div>
										)}

										{isRowVisible && <div>{(legalComplianceBooksAndMis * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(marketingExpense * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(personnelExpenseCost * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(provisionsAndWriteOffs * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(ratesAndTaxes * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(rentAndTaxes * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(rentElectricityAndMaintenance * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(repairsAndMaintenance * ratio).toFixed(2)}</div>}

										{isRowVisible && (
											<div>
												{(salariesBonusIncentivesAndStaffWelfareExpenses * ratio).toFixed(2)}
											</div>
										)}

										{isRowVisible && <div>{(techAndProductCosts * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(currencySuspenseAccount * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(roundOff * ratio).toFixed(2)}</div>}
										{isRowVisible && <div>{(anyOtherCosts * ratio).toFixed(2)}</div>}
									</>
								)}
								{isRowVisible && <div className={styles.particular_data}>{(totalOtherIncome * ratio).toFixed(2)}</div>}
							</div>
						);
					})}

				</div>

				<div className={styles.data_sub}>
					{isRowVisible && (
						<div className={styles.header_particular}>
							PROFIT BEFORE EXCEPTIONAL AND EXTRAORDINARY ITEMS (B)
						</div>
					)}
					{
						getRelevantData()?.map((Val) => {
							const ratio = ratioData?.[Val?.[key]] || 1;
							return (
								<div className={styles.header_ocean} style={{ width: calculateWidth }}>
									{isRowVisible
										? ((revenueFromOps
									- operatingExpenses
									- totalDepreciationAndAmortization - totalFinanceCost - totalOtherExpense
										) * ratio).toFixed(2) : null}
								</div>
							);
						})
						}
				</div>

				<div className={styles.data_sub}>
					<div className={styles.first_particular}>
						{isRowVisible && (
							<div className={styles.depreciation}>
								Exceptional Items
							</div>
						)}

						{isRowVisible && (
							<div className={styles.depreciation}>
								Extraordinary Items
							</div>
						)}
						{isRowVisible && (
							<div className={styles.depreciation}>
								Prior Period Item
							</div>
						)}

					</div>

					{
						getRelevantData()?.map((itemValue) => {
							const ratio = ratioData?.[itemValue[key]] || 1;
							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									{isRowVisible && <div className={styles.particular_data}>{(totalExceptionalItems * ratio).toFixed(2)}</div>}
									{isRowVisible && <div className={styles.particular_data}>{(totalExtraordinaryItems * ratio).toFixed(2)}</div>}
									{isRowVisible && <div className={styles.particular_data}>{(totalPriorPeriodItem * ratio).toFixed(2)}</div>}

								</div>
							);
						})
					}
				</div>
				<div className={styles.data_sub}>
					{isRowVisible && <div className={styles.header_particular}>PROFIT BEFORE TAX (C)</div>}
					{
						getRelevantData()?.map((value) => {
							const ratio = ratioData?.[value[key]] || 1;
							return (
								<div
									className={styles.header_ocean}
									style={{ width: calculateWidth }}
								>
									{isRowVisible ? ((revenueFromOps
								- operatingExpenses
								- totalDepreciationAndAmortization
								- totalFinanceCost
								- totalOtherExpense
								- totalExceptionalItems - totalExtraordinaryItems - totalPriorPeriodItem) * ratio).toFixed(2) : null}
								</div>
							);
						})
					}
				</div>

				<div className={styles.data_sub}>
					<div className={styles.first_particular}>
						{isRowVisible && (
							<div className={styles.particular_data_review}>
								(-) Tax Expense
							</div>
						)}

					</div>

					{
						getRelevantData()?.map((itemDataValue) => {
							const ratio = ratioData?.[itemDataValue?.key] || 1;

							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									{isRowVisible && <div className={styles.particular_data}>{(totalTaxExpense * ratio).toFixed(2)}</div>}
								</div>
							);
						})
}

				</div>
				<div className={styles.data_sub}>
					{isRowVisible && <div className={styles.header_particular}>PROFIT AFTER TAX (D)</div>}
					{
						getRelevantData()?.map((valData) => {
							const ratio = ratioData?.[valData?.key] || 1;
							return (
								<div className={styles.header_ocean} style={{ width: calculateWidth }}>
									{isRowVisible ? ((revenueFromOps - operatingExpenses
									- totalDepreciationAndAmortization
									- totalFinanceCost - totalOtherExpense
									- totalExceptionalItems - totalExtraordinaryItems
									- totalPriorPeriodItem - totalTaxExpense) * ratio).toFixed(2) : null}

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
