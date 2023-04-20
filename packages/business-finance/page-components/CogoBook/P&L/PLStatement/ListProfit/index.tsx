import { Tooltip } from '@cogoport/components';
import { IcMArrowDown, IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import { mappingData } from '../constant';

import styles from './styles.module.css';

function ListProfit({
	ratiosData,
	reportData,
	filters,
}) {
	const isNonZero = filters?.rowCheck?.includes('nonZero');

	const [dropDown, setDropDown] = useState({
		revenue   : true,
		operating : true,
		employee  : true,
		finance   : true,
		other     : true,
		tax       : true,
	});

	const getMapData = () => (reportData?.list || [{}]).map((item) => {
		const {
			revenueFromOps = 0,
			operatingExpenses = 0,
			totalEmployeeBenefitExpenses = 0,
			employeeBenefitExpenses,
			totalDepreciationAndAmortization = 0,
			totalFinanceCost = 0,
			financeCost,
			totalOtherExpense = 0,
			otherExpense,
			totalOtherIncome = 0,
			totalExceptionalItems = 0,
			totalExtraordinaryItems = 0,
			totalPriorPeriodItem = 0,
		} = item;

		const ratioData = (ratiosData?.list || [{}])?.find((itemRatio) => itemRatio.ratioBasis === filters?.ratio);

		const {
			esops = 0,
			gratuityLeaveEncashment = 0,
			personnelCost = 0,
			housekeepingSecuritySubscriptionsTravelStayAndCc = 0,
			salariesBonusIncentivesAndStaffWelfareExpenses = 0,
		} = employeeBenefitExpenses || {};

		const {
			foreignExchangeGainNet = 0,
			interestIncomeOnFd = 0,
			interestOnLoanDiscountOnBillsAndBankCharges = 0,
			miscellaneousIncome = 0,
		} = financeCost || {};

		const {
			provisionsAndWriteOffs = 0,
			marketingExpense = 0,
			roundOff = 0,
			salariesBonusIncentivesAndStaffWelfareExpenses:
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

		let isRowVisible = true;
		if (isNonZero && revenueFromOps === 0) {
			isRowVisible = false;
		}

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
		const calculateWidth = `${59 / ArrayLength}%`;

		const options = { style: 'decimal', maximumFractionDigits: 2 };
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
							<div className={styles.row_vis_data}>
								{isRowVisible && (
									<div style={{ display: 'flex' }}>
										Billed Revenue
										<Tooltip
											content={(
												<div className={styles.font_size_tooltip}>
													Invoiced revenue w.r.t
													<br />
													current month SIDs +
													<br />
													Invoiced revenue w.r.t
													<br />
													previous months SIDs
													<br />
													in freeze state
												</div>
											)}
											placement="top"
										>
											<div className={styles.info_icon_container}>
												<IcMInfo />
											</div>
										</Tooltip>
									</div>
								)}
								{isRowVisible && (
									<div style={{ display: 'flex' }}>
										Unbilled Revenue
										<Tooltip
											content={(
												<div className={styles.font_size_tooltip}>
													Accrued Revenue w.r.t
													{' '}
													<br />
													{' '}
													current month SIDs
												</div>
											)}
											placement="top"
										>
											<div className={styles.info_icon_container}>
												<IcMInfo />
											</div>
										</Tooltip>
									</div>
								)}
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
							<div className={styles.row_vis_data}>
								{isRowVisible &&	<div>Billed Expense</div>}
								{isRowVisible &&	<div>Accrued Expense</div>}
							</div>
						)}
					</div>

					{getRelevantData().map((itemData) => {
						const segmentType = item[itemData?.type.toLowerCase()];
						const bookedRevenue = segmentType?.[itemData?.keys?.bookedRevenue] || 0;
						const accruedRevenue = segmentType?.[itemData?.keys?.accruedRevenue] || 0;
						const bookedExpense = segmentType?.[itemData?.keys?.bookedExpense] || 0;
						const accruedExpense = segmentType?.[itemData?.keys?.accruedExpense] || 0;

						if (itemData?.type !== 'total') {
							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									{isRowVisible &&	(
										<div className={styles.particular_data}>
											{(bookedRevenue + accruedRevenue)?.toLocaleString('en-IN', options)}
										</div>
									)}
									{dropDown?.revenue && (
										<>
											{isRowVisible
												&& (
													<div>
														{(bookedRevenue)?.toLocaleString('en-IN', options)}
													</div>
												)}
											{isRowVisible
												&& (
													<div>
														{(accruedRevenue)?.toLocaleString('en-IN', options)}
													</div>
												)}
										</>
									) }
									{isRowVisible &&	(
										<div className={styles.particular_data}>
											{(bookedExpense + accruedExpense)?.toLocaleString('en-IN', options)}
										</div>
									)}
									{dropDown?.operating && (
										<>
											{isRowVisible
												&& <div>{(bookedExpense)?.toLocaleString('en-IN', options)}</div>}
											{isRowVisible
												&& <div>{(accruedExpense)?.toLocaleString('en-IN', options)}</div>}
										</>
									)}
								</div>
							);
						}

						const {
							bookedRevenue:totalBookedRevenue,
							accruedRevenue:totalAccruedRevenue,
							bookedExpense:totalBookedExpense,
							accruedExpense:totalAccruedExpense,
						} = item || {};

						return (
							<div className={styles.first_ocean} style={{ width: calculateWidth }}>
								{isRowVisible &&	(
									<div className={styles.particular_data}>
										{(totalBookedRevenue + totalAccruedRevenue)?.toLocaleString('en-IN', options)}
									</div>
								)}
								{dropDown?.revenue && (
									<>
										{isRowVisible
											&& (
												<div>
													{(totalBookedRevenue)?.toLocaleString('en-IN', options)}
												</div>
											)}
										{isRowVisible
											&& (
												<div>
													{(totalAccruedRevenue)?.toLocaleString('en-IN', options)}
												</div>
											)}
									</>
								) }
								{isRowVisible &&	(
									<div className={styles.particular_data}>
										{(totalBookedExpense + totalAccruedExpense)?.toLocaleString('en-IN', options)}
									</div>
								)}
								{dropDown?.operating && (
									<>
										{isRowVisible
											&& <div>{(totalBookedExpense)?.toLocaleString('en-IN', options)}</div>}
										{isRowVisible
											&& <div>{(totalAccruedExpense)?.toLocaleString('en-IN', options)}</div>}
									</>
								)}
							</div>
						);
					})}

				</div>

				<div className={styles.data_sub}>
					{isRowVisible && <div className={styles.header_particular}>GROSS PROFIT</div>}
					{getRelevantData()?.map((itemData) => {
						const segmentType = item[itemData?.type.toLowerCase()];
						const bookedRevenue = segmentType?.[itemData?.keys?.bookedRevenue] || 0;
						const accruedRevenue = segmentType?.[itemData?.keys?.accruedRevenue] || 0;
						const bookedExpense = segmentType?.[itemData?.keys?.bookedExpense] || 0;
						const accruedExpense = segmentType?.[itemData?.keys?.accruedExpense] || 0;

						if (itemData?.type !== 'total') {
							return (
								<div className={styles.header_ocean} style={{ width: calculateWidth }}>
									{isRowVisible
										? (
											<span>
												{(((bookedRevenue + accruedRevenue) - (bookedExpense + accruedExpense)))
													.toLocaleString('en-IN', options)}
											</span>
										) : null}
								</div>
							);
						}
						return (
							<div className={styles.header_ocean} style={{ width: calculateWidth }}>
								{isRowVisible
									? (
										<span>
											{((revenueFromOps - operatingExpenses))
												.toLocaleString('en-IN', options)}
										</span>
									) : null}
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
							<div className={styles.row_vis_data}>
								{isRowVisible && <div>ESOPs</div>}
								{isRowVisible && <div>Gratuity & Leave Encashment</div>}
								{isRowVisible && <div>Personnel Cost</div>}
								{isRowVisible && <div>Housekeeping, Security, Subscriptions, Travel, Stay and CC</div>}
								{isRowVisible && <div>Salaries, Bonus, Incentives and Staff Welfare Expenses</div>}
							</div>
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
							<div className={styles.row_vis_data}>
								{isRowVisible && <div>Foreign Exchange Gain (Net)</div>}
								{isRowVisible && <div>Interest on Loan, Discount on Bills and Bank Charges</div>}
								{isRowVisible && <div>Miscellaneous Income</div>}
								{isRowVisible && <div>Interest Income on FD</div>}
							</div>
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
							<div className={styles.row_vis_data}>
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
							</div>
						)}

						{isRowVisible && (
							<div className={styles.depreciation}>
								Other Income
							</div>
						)}
					</div>

					{getRelevantData()?.map((itemValue) => {
						const ratio = ratioData?.turnoverRatioDetails?.[itemValue?.key];
						if (itemValue?.type === 'total') {
							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									{isRowVisible && (
										<div className={styles.particular_data}>
											{(totalEmployeeBenefitExpenses).toLocaleString('en-IN', options)}
										</div>
									)}
									{dropDown?.employee && (
										<>
											{' '}
											{isRowVisible && <div>{(esops).toLocaleString('en-IN', options)}</div>}
											{isRowVisible && (
												<div>
													{(gratuityLeaveEncashment).toLocaleString('en-IN', options)}
												</div>
											)}

											{isRowVisible && (
												<>
													<div>
														{(personnelCost).toLocaleString('en-IN', options)}
													</div>

													<div>
														{(housekeepingSecuritySubscriptionsTravelStayAndCc
														).toLocaleString('en-IN', options)}

													</div>

													<div>
														{(salariesBonusIncentivesAndStaffWelfareExpenses
														).toLocaleString('en-IN', options)}
													</div>
												</>
											)}
										</>
									)}
									{isRowVisible && (
										<div className={styles.particular_data}>
											{(totalDepreciationAndAmortization).toLocaleString('en-IN', options)}
										</div>
									)}
									{isRowVisible && (
										<div className={styles.particular_data}>
											{(totalFinanceCost
											).toLocaleString('en-IN', options)}

										</div>
									)}
									{dropDown?.finance && (
										<>
											{isRowVisible
											&& (
												<div>
													{(foreignExchangeGainNet
													).toLocaleString('en-IN', options)}
												</div>
											)}

											{isRowVisible && (
												<div>
													{(interestOnLoanDiscountOnBillsAndBankCharges
													).toLocaleString('en-IN', options)}
												</div>
											)}

											{isRowVisible && (
												<div>
													{(miscellaneousIncome
													).toLocaleString('en-IN', options)}
												</div>
											)}
											{isRowVisible && (
												<div>
													{(interestIncomeOnFd
													).toLocaleString('en-IN', options)}
												</div>
											)}
										</>
									) }
									{isRowVisible
									&& (
										<div className={styles.particular_data}>
											{(totalOtherExpense).toLocaleString('en-IN', options)}
										</div>
									)}
									{dropDown?.other
									&& (
										<>
											{isRowVisible && (
												<div>
													{(interestOnLoanDiscountOnBillsAndBankChargesExpense
													).toLocaleString('en-IN', options)}
												</div>
											)}

											{isRowVisible
											&& (
												<div>
													{(legalComplianceBooksAndMis
													).toLocaleString('en-IN', options)}
												</div>
											)}
											{isRowVisible
											&& <div>{(marketingExpense).toLocaleString('en-IN', options)}</div>}
											{isRowVisible
											&& <div>{(personnelExpenseCost).toLocaleString('en-IN', options)}</div>}
											{isRowVisible
											&& (
												<div>
													{(provisionsAndWriteOffs
													).toLocaleString('en-IN', options)}
												</div>
											)}
											{isRowVisible
											&& <div>{(ratesAndTaxes).toLocaleString('en-IN', options)}</div>}
											{isRowVisible
											&& <div>{(rentAndTaxes).toLocaleString('en-IN', options)}</div>}
											{isRowVisible
											&& (
												<div>
													{(rentElectricityAndMaintenance
													).toLocaleString('en-IN', options)}
												</div>
											)}
											{isRowVisible
											&& (
												<div>
													{(repairsAndMaintenance
													).toLocaleString('en-IN', options)}
												</div>
											)}

											{isRowVisible && (
												<div>
													{(salariesBonusIncentivesAndStaffWelfareExpenses
													).toLocaleString('en-IN', options)}
												</div>
											)}

											{isRowVisible
											&& (
												<div>
													{(techAndProductCosts)
														.toLocaleString('en-IN', options)}
												</div>
											)}
											{isRowVisible
											&& (
												<div>
													{(currencySuspenseAccount
													).toLocaleString('en-IN', options)}
												</div>
											)}
											{isRowVisible
											&& <div>{(roundOff).toLocaleString('en-IN', options)}</div>}
											{isRowVisible
											&& <div>{(anyOtherCosts).toLocaleString('en-IN', options)}</div>}
										</>
									)}
									{isRowVisible
									&& (
										<div className={styles.particular_data}>
											{(totalOtherIncome).toLocaleString('en-IN', options)}
										</div>
									)}
								</div>
							);
						}
						return (
							<div className={styles.first_ocean} style={{ width: calculateWidth }}>
								{isRowVisible && (
									<div className={styles.particular_data}>
										{(totalEmployeeBenefitExpenses * ratio).toLocaleString('en-IN', options)}
									</div>
								)}
								{dropDown?.employee && (
									<>
										{' '}
										{isRowVisible && <div>{(esops * ratio).toLocaleString('en-IN', options)}</div>}
										{isRowVisible && (
											<div>
												{(gratuityLeaveEncashment * ratio).toLocaleString('en-IN', options)}
											</div>
										)}

										{isRowVisible && (
											<>
												<div>
													{(personnelCost * ratio).toLocaleString('en-IN', options)}
												</div>

												<div>
													{(housekeepingSecuritySubscriptionsTravelStayAndCc
													* ratio).toLocaleString('en-IN', options)}

												</div>

												<div>
													{(salariesBonusIncentivesAndStaffWelfareExpenses
														* ratio).toLocaleString('en-IN', options)}
												</div>
											</>
										)}
									</>
								)}
								{isRowVisible && (
									<div className={styles.particular_data}>
										{(totalDepreciationAndAmortization * ratio).toLocaleString('en-IN', options)}
									</div>
								)}
								{isRowVisible && (
									<div className={styles.particular_data}>
										{(totalFinanceCost
										* ratio).toLocaleString('en-IN', options)}

									</div>
								)}
								{dropDown?.finance && (
									<>
										{isRowVisible
										&& (
											<div>
												{(foreignExchangeGainNet
										* ratio).toLocaleString('en-IN', options)}
											</div>
										)}

										{isRowVisible && (
											<div>
												{(interestOnLoanDiscountOnBillsAndBankCharges
													* ratio).toLocaleString('en-IN', options)}
											</div>
										)}

										{isRowVisible && (
											<div>
												{(miscellaneousIncome
											* ratio).toLocaleString('en-IN', options)}
											</div>
										)}
										{isRowVisible && (
											<div>
												{(interestIncomeOnFd
											* ratio).toLocaleString('en-IN', options)}
											</div>
										)}
									</>
								) }
								{isRowVisible
								&& (
									<div className={styles.particular_data}>
										{(totalOtherExpense * ratio).toLocaleString('en-IN', options)}
									</div>
								)}
								{dropDown?.other
								&& (
									<>
										{isRowVisible && (
											<div>
												{(interestOnLoanDiscountOnBillsAndBankChargesExpense
													* ratio).toLocaleString('en-IN', options)}
											</div>
										)}

										{isRowVisible
										&& (
											<div>
												{(legalComplianceBooksAndMis
										* ratio).toLocaleString('en-IN', options)}
											</div>
										)}
										{isRowVisible
										&& <div>{(marketingExpense * ratio).toLocaleString('en-IN', options)}</div>}
										{isRowVisible
										&& <div>{(personnelExpenseCost * ratio).toLocaleString('en-IN', options)}</div>}
										{isRowVisible
										&& (
											<div>
												{(provisionsAndWriteOffs
										* ratio).toLocaleString('en-IN', options)}
											</div>
										)}
										{isRowVisible
										&& <div>{(ratesAndTaxes * ratio).toLocaleString('en-IN', options)}</div>}
										{isRowVisible
										&& <div>{(rentAndTaxes * ratio).toLocaleString('en-IN', options)}</div>}
										{isRowVisible
										&& (
											<div>
												{(rentElectricityAndMaintenance
										* ratio).toLocaleString('en-IN', options)}
											</div>
										)}
										{isRowVisible
										&& (
											<div>
												{(repairsAndMaintenance
										* ratio).toLocaleString('en-IN', options)}
											</div>
										)}

										{isRowVisible && (
											<div>
												{(salariesBonusIncentivesAndStaffWelfareExpenses
													* ratio).toLocaleString('en-IN', options)}
											</div>
										)}

										{isRowVisible
										&& <div>{(techAndProductCosts * ratio).toLocaleString('en-IN', options)}</div>}
										{isRowVisible
										&& (
											<div>
												{(currencySuspenseAccount
										* ratio).toLocaleString('en-IN', options)}
											</div>
										)}
										{isRowVisible
										&& <div>{(roundOff * ratio).toLocaleString('en-IN', options)}</div>}
										{isRowVisible
										&& <div>{(anyOtherCosts * ratio).toLocaleString('en-IN', options)}</div>}
									</>
								)}
								{isRowVisible
								&& (
									<div className={styles.particular_data}>
										{(totalOtherIncome * ratio).toLocaleString('en-IN', options)}
									</div>
								)}
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
						getRelevantData()?.map((itemData) => {
							const segmentType = item[itemData?.type.toLowerCase()];
							const bookedRevenue = segmentType?.[itemData?.keys?.bookedRevenue] || 0;
							const accruedRevenue = segmentType?.[itemData?.keys?.accruedRevenue] || 0;
							const bookedExpense = segmentType?.[itemData?.keys?.bookedExpense] || 0;
							const accruedExpense = segmentType?.[itemData?.keys?.accruedExpense] || 0;
							const ratio = ratioData?.turnoverRatioDetails?.[itemData?.key];
							if (itemData?.type !== 'total') {
								return (
									<div className={styles.header_ocean} style={{ width: calculateWidth }}>
										{isRowVisible
											? (
												<span>
													{(((bookedRevenue + accruedRevenue)
													- (bookedExpense + accruedExpense)
													- totalDepreciationAndAmortization
													- totalFinanceCost - totalOtherExpense) * ratio)
														.toLocaleString('en-IN', options)}
												</span>
											) : null}
									</div>
								);
							}
							return (
								<div className={styles.header_ocean} style={{ width: calculateWidth }}>
									{isRowVisible
										? ((revenueFromOps
									- operatingExpenses
									- totalDepreciationAndAmortization - totalFinanceCost - totalOtherExpense
										)).toLocaleString('en-IN', options) : null}
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
							const ratio = ratioData?.turnoverRatioDetails?.[itemValue?.key];
							if (itemValue?.type === 'total') {
								return (
									<div className={styles.first_ocean} style={{ width: calculateWidth }}>
										{isRowVisible && (
											<div className={styles.particular_data}>
												{(totalExceptionalItems).toLocaleString('en-IN', options)}
											</div>
										)}
										{isRowVisible && (
											<div className={styles.particular_data}>
												{(totalExtraordinaryItems).toLocaleString('en-IN', options)}
											</div>
										)}
										{isRowVisible && (
											<div className={styles.particular_data}>
												{(totalPriorPeriodItem).toLocaleString('en-IN', options)}
											</div>
										)}

									</div>
								);
							}
							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									{isRowVisible && (
										<div className={styles.particular_data}>
											{(totalExceptionalItems * ratio).toLocaleString('en-IN', options)}
										</div>
									)}
									{isRowVisible && (
										<div className={styles.particular_data}>
											{(totalExtraordinaryItems * ratio).toLocaleString('en-IN', options)}
										</div>
									)}
									{isRowVisible && (
										<div className={styles.particular_data}>
											{(totalPriorPeriodItem * ratio).toLocaleString('en-IN', options)}
										</div>
									)}

								</div>
							);
						})
					}
				</div>
				<div className={styles.data_sub}>
					{isRowVisible && <div className={styles.header_particular}>PROFIT BEFORE TAX (C)</div>}
					{
						getRelevantData()?.map((value) => {
							const ratio = ratioData?.turnoverRatioDetails?.[value?.key];
							const segmentType = item[value?.type.toLowerCase()];
							const bookedRevenue = segmentType?.[value?.keys?.bookedRevenue] || 0;
							const accruedRevenue = segmentType?.[value?.keys?.accruedRevenue] || 0;
							const bookedExpense = segmentType?.[value?.keys?.bookedExpense] || 0;
							const accruedExpense = segmentType?.[value?.keys?.accruedExpense] || 0;
							if (value?.type !== 'total') {
								return (
									<div className={styles.header_ocean} style={{ width: calculateWidth }}>
										{isRowVisible
											? (
												<span>
													{(((bookedRevenue + accruedRevenue)
													- (bookedExpense + accruedExpense)
													- totalDepreciationAndAmortization - totalFinanceCost
													- totalOtherExpense - totalExceptionalItems
													- totalExtraordinaryItems - totalPriorPeriodItem) * ratio)
														.toLocaleString('en-IN', options)}
												</span>
											) : null}
									</div>
								);
							}
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
								- totalExceptionalItems - totalExtraordinaryItems - totalPriorPeriodItem)
									).toLocaleString('en-IN', options) : null}
								</div>
							);
						})
					}
				</div>

				<div className={styles.data_sub}>
					<div className={styles.first_particular}>
						{isRowVisible && (
							<div className={styles.depreciation}>
								(-) Tax Expense
							</div>
						)}

					</div>

					{
						getRelevantData()?.map((itemDataValue) => {
							const ratio = ratioData?.turnoverRatioDetails?.[itemDataValue?.key];
							const segmentType = item[itemDataValue?.type.toLowerCase()];
							const bookedRevenue = segmentType?.[itemDataValue?.keys?.bookedRevenue] || 0;
							const accruedRevenue = segmentType?.[itemDataValue?.keys?.accruedRevenue] || 0;
							const bookedExpense = segmentType?.[itemDataValue?.keys?.bookedExpense] || 0;
							const accruedExpense = segmentType?.[itemDataValue?.keys?.accruedExpense] || 0;
							if (itemDataValue?.type !== 'total') {
								return (
									<div className={styles.first_ocean} style={{ width: calculateWidth }}>
										{isRowVisible
											? (
												<div className={styles.particular_data}>
													{((((bookedRevenue + accruedRevenue)
													- (bookedExpense + accruedExpense)
													- totalDepreciationAndAmortization - totalFinanceCost
													- totalOtherExpense - totalExceptionalItems
													- totalExtraordinaryItems - totalPriorPeriodItem) * ratio) * 0.2517)
														.toLocaleString('en-IN', options)}
												</div>
											) : null}
									</div>
								);
							}

							return (
								<div className={styles.first_ocean} style={{ width: calculateWidth }}>
									{isRowVisible && (
										<div className={styles.particular_data}>
											{isRowVisible ? ((revenueFromOps
								- operatingExpenses
								- totalDepreciationAndAmortization
								- totalFinanceCost
								- totalOtherExpense
								- totalExceptionalItems - totalExtraordinaryItems - totalPriorPeriodItem) * 0.2517
											).toLocaleString('en-IN', options) : null}
										</div>
									)}
								</div>
							);
						})
}

				</div>
				<div className={styles.data_sub}>
					{isRowVisible && <div className={styles.header_particular}>PROFIT AFTER TAX (D)</div>}
					{
						getRelevantData()?.map((valData) => {
							const segmentType = item[valData?.type.toLowerCase()];
							const ratio = ratioData?.turnoverRatioDetails?.[valData?.key];
							const bookedRevenue = segmentType?.[valData?.keys?.bookedRevenue] || 0;
							const accruedRevenue = segmentType?.[valData?.keys?.accruedRevenue] || 0;
							const bookedExpense = segmentType?.[valData?.keys?.bookedExpense] || 0;
							const accruedExpense = segmentType?.[valData?.keys?.accruedExpense] || 0;
							if (valData?.type !== 'total') {
								return (
									<div className={styles.header_ocean} style={{ width: calculateWidth }}>
										{isRowVisible
											? (
												<span>
													{(((((bookedRevenue + accruedRevenue)
													- (bookedExpense + accruedExpense)
													- totalDepreciationAndAmortization - totalFinanceCost
													- totalOtherExpense - totalExceptionalItems
													- totalExtraordinaryItems
													- totalPriorPeriodItem) * ratio)
													- ((((bookedRevenue + accruedRevenue)
													- (bookedExpense + accruedExpense)
													- totalDepreciationAndAmortization - totalFinanceCost
													- totalOtherExpense - totalExceptionalItems
													- totalExtraordinaryItems
													- totalPriorPeriodItem) * ratio) * 0.2517)))
														.toLocaleString('en-IN', options)}
												</span>
											) : null}
									</div>
								);
							}
							return (
								<div className={styles.header_ocean} style={{ width: calculateWidth }}>
									{isRowVisible ? ((revenueFromOps - operatingExpenses
									- totalDepreciationAndAmortization
									- totalFinanceCost - totalOtherExpense
									- totalExceptionalItems - totalExtraordinaryItems
									- totalPriorPeriodItem - ((revenueFromOps
										- operatingExpenses
										- totalDepreciationAndAmortization
										- totalFinanceCost
										- totalOtherExpense
										- totalExceptionalItems - totalExtraordinaryItems
										- totalPriorPeriodItem) * 0.2517
									))).toLocaleString('en-IN', options) : null}

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
