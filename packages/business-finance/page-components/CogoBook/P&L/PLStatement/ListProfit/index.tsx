import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import useReport from '../hooks/useReport';

import styles from './styles.module.css';
import { ratiosDataV2 } from './utils/ratios';
import { reportsDataV2 } from './utils/reports';

function ListProfit({
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

	const mapping = {
		Ocean: [
			{
				key  : 'fclImports',
				name : 'Fcl Imports',
			},
			{
				key  : 'lclImports',
				name : 'Lcl Imports',
			},
			{
				key  : 'fclExports',
				name : 'LCl Exports',
			},
			{
				key  : 'lclExports',
				name : 'Lcl Exports',
			},
			{
				key  : 'total',
				name : 'Total',
			},
		],
		Air: [
			{
				key  : 'airImport',
				name : 'Air Import',
			},
			{
				key  : 'airExport',
				name : 'Air Export',
			},
			{
				key  : 'airCustomsImport',
				name : 'Air Customs Import',
			},
			{
				key  : 'airCustomsExport',
				name : 'Air Customs Export',
			},
			{
				key  : 'total',
				name : 'Total',
			},
		],
		Surface: [
			{
				key  : 'ltlImport',
				name : 'LTL Import',
			},
			{
				key  : 'ltlExport',
				name : 'LTL Export',
			},
			{
				key  : 'ftlImport',
				name : 'FTL Import',
			},
			{
				key  : 'ftlExport',
				name : 'ftL Export',
			},
			{
				key  : 'total',
				name : 'Total',
			},
		],
		nothing: [
			{
				key  : 'ocean',
				name : 'Ocean',
			},
			{
				key  : 'air',
				name : 'Air',
			},
			{
				key  : 'surface',
				name : 'Surface',
			},
			{
				key  : 'rail',
				name : 'Rail',
			},
			{
				key  : 'total',
				name : 'Total',
			},
		],
	};

	const {
		ratiosData = {},
		reportData = {},
		reportTriggerLoading,
		ratiosTriggerLoading,
	} = useReport(filters);

	// if (!reportTriggerLoading && !ratiosTriggerLoading ){
	// 	return null
	// }

	const getMapData = () => reportsDataV2?.list.map((item) => {
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
			otherIncome,
			totalExceptionalItems = 0,
			totalExtraordinaryItems = 0,
			totalPriorPeriodItem = 0,
			priorPeriodItems,
			totalTaxExpense = 0,
		} = item;

		const ratioData = (ratiosDataV2?.list)?.find((item) => item.ratioBasis === filters?.ratio);

		const {
			esops = 0,
			gratuity_leave_encashment = 0,
			personnel_cost = 0,
			housekeeping_security_subscriptions_travel_stay_and_cc = 0,
			salaries_bonus_incentives_and_staff_welfare_expenses = 0,
		} = employeeBenefitExpenses;

		const {
			foreign_exchange_gain_net = 0,
			interest_income_on_fd = 0,
			interest_on_loan_discount_on_bills_and_bank_charges = 0,
			miscelleneous_income = 0,
		} = financeCost;

		const {
			provisions_and_write_offs = 0,
			marketing_expense = 0,
			round_off = 0,
			salaries_bonus_incentives_and_staff_welfare_expenses: salaries_bonus_incentives_and_staff_welfare_expenses_expoense = 0,
			operating_expenses = 0,
			repairs_and_maintenance = 0,
			tech_and_product_costs = 0,
			any_other_costs = 0,
			currency_suspense_account = 0,
			rent_electricity_and_maintenance = 0,
			personnel_cost: personnel_expense_cost = 0,
			legal_compliance_books_and_mis = 0,
			rates_and_taxes = 0,
			rent_and_taxes = 0,
			interest_on_loan_discount_on_bills_and_bank_charges: interest_on_loan_discount_on_bills_and_bank_charges_expense = 0,
		} = otherExpense;

		const key = filters?.radio ? filters?.radio : 'nothing';
		const relevantData = mapping?.[key];

		return (
			<div>
				<div className={styles.data_sub}>

					<div className={styles.header_particular}>PARTICULARS</div>
					{
						relevantData.map((item) => (
							<div className={styles.header_ocean} id={item?.key}>
								{item?.name}
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

					{relevantData.map((item) => {
						const ratio = ratioData?.[item?.key] || 1;
						return (
							<div className={styles.first_ocean}>
								<div className={styles.particular_data}>
									{revenueFromOps * ratio}
								</div>
								{dropDown?.revenue && <div>{bookedRevenue * ratio}</div>}
								{dropDown?.revenue && <div>{accruedRevenue * ratio}</div>}
								<div className={styles.particular_data}>
									{operatingExpenses * ratio}
								</div>
								{dropDown?.operating && <div>{bookedExpense * ratio}</div>}
								{dropDown?.operating && <div>{accruedExpense * ratio}</div>}
							</div>
						);
					})}

				</div>

				<div className={styles.data_sub}>
					<div className={styles.header_particular}>GROSS PROFIT</div>
					{relevantData?.map((item) => {
						const ratio = ratioData?.[item?.[key]] || 1;
						return (
							<div className={styles.header_ocean}>
								{(revenueFromOps - operatingExpenses) * ratio}
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
						relevantData?.map((item) => {
							const ratio = ratioData?.[item?.key] || 1;
							return (
								<div className={styles.first_ocean}>
									<div className={styles.particular_data}>
										{totalEmployeeBenefitExpenses * ratio}
									</div>
									{dropDown?.employee && <div>{esops * ratio}</div>}
									{dropDown?.employee && <div>{gratuity_leave_encashment * ratio}</div>}
									{dropDown?.employee && (
										<div>
											{housekeeping_security_subscriptions_travel_stay_and_cc * ratio}
										</div>
									)}
									{dropDown?.employee && <div>{personnel_cost * ratio}</div>}
									{dropDown?.employee && (
										<div>
											{salaries_bonus_incentives_and_staff_welfare_expenses * ratio}
										</div>
									)}
									<div className={styles.particular_data}>
										{totalDepreciationAndAmortization * ratio}
									</div>
									<div className={styles.particular_data}>{totalFinanceCost * ratio}</div>
									{dropDown?.finance && <div>{foreign_exchange_gain_net * ratio}</div>}
									{dropDown?.finance && (
										<div>
											{interest_on_loan_discount_on_bills_and_bank_charges * ratio}
										</div>
									)}
									{dropDown?.finance && <div>{miscelleneous_income * ratio}</div>}
									{dropDown?.finance && <div>{interest_income_on_fd * ratio}</div>}
									<div className={styles.particular_data}>{totalOtherExpense * ratio}</div>
									{dropDown?.other && (
										<div>
											{interest_on_loan_discount_on_bills_and_bank_charges_expense * ratio}
										</div>
									)}
									{dropDown?.other && <div>{legal_compliance_books_and_mis * ratio}</div>}
									{dropDown?.other && <div>{marketing_expense * ratio}</div>}
									{dropDown?.other && <div>{personnel_expense_cost * ratio}</div>}
									{dropDown?.other && <div>{provisions_and_write_offs * ratio}</div>}
									{dropDown?.other && <div>{rates_and_taxes * ratio}</div>}
									{dropDown?.other && <div>{rent_and_taxes * ratio}</div>}
									{dropDown?.other && <div>{rent_electricity_and_maintenance * ratio}</div>}
									{dropDown?.other && <div>{repairs_and_maintenance * ratio}</div>}
									{dropDown?.other && (
										<div>
											{salaries_bonus_incentives_and_staff_welfare_expenses * ratio}
										</div>
									)}
									{dropDown?.other && <div>{tech_and_product_costs * ratio}</div>}
									{dropDown?.other && <div>{currency_suspense_account * ratio}</div>}
									{dropDown?.other && <div>{round_off * ratio}</div>}
									{dropDown?.other && <div>{any_other_costs * ratio}</div>}
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
						relevantData?.map((item) => {
							const ratio = ratioData?.[item?.[key]] || 1;
							return (
								<div className={styles.header_ocean}>
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
						relevantData?.map((item) => {
							const ratio = ratioData?.[item[key]] || 1;
							return (
								<div className={styles.first_ocean}>
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
						relevantData?.map((item) => {
							const ratio = ratioData?.[item[key]] || 1;
							return (
								<div
									className={styles.header_ocean}
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
						relevantData?.map((item) => {
							const ratio = ratioData?.[item?.key] || 1;

							return (
								<div className={styles.first_ocean}>
									<div className={styles.particular_data}>{totalTaxExpense * ratio}</div>
								</div>
							);
						})
}

				</div>
				<div className={styles.data_sub}>
					<div className={styles.header_particular}>PROFIT AFTER TAX (D)</div>
					{
						relevantData?.map((item) => {
							const ratio = ratioData?.[item?.key] || 1;
							return (
								<div className={styles.header_ocean}>
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
