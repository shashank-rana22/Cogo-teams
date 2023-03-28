import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function ListProfit() {
	const [dropDown, setDropDown] = useState({
		revenue   : true,
		operating : true,
		employee  : true,
		finance   : true,
		other     : true,
		tax       : true,
	});
	return (
		<div className={styles.container}>

			<div className={styles.data_sub}>
				<div className={styles.header_particular}>PARTICULARS</div>
				<div className={styles.header_ocean}>OCEAN</div>
				<div className={styles.header_air}>AIR</div>
				<div className={styles.header_surface}>SURFACE</div>
				<div className={styles.header_rail}>RAIL</div>
				<div className={styles.header_total}>TOTAL</div>
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

				<div className={styles.first_ocean}>
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.revenue && <div>10,00,000</div>}
					{dropDown?.revenue && <div>10,00,000</div>}
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.operating && <div>10,00,000</div>}
					{dropDown?.operating && <div>10,00,000</div>}

				</div>

				<div className={styles.first_air}>
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.revenue && <div>10,00,000</div>}
					{dropDown?.revenue && <div>10,00,000</div>}
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.operating && <div>10,00,000</div>}
					{dropDown?.operating && <div>10,00,000</div>}
				</div>

				<div className={styles.first_surface}>
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.revenue && <div>10,00,000</div>}
					{dropDown?.revenue && <div>10,00,000</div>}
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.operating && <div>10,00,000</div>}
					{dropDown?.operating && <div>10,00,000</div>}
				</div>

				<div className={styles.first_rail}>
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.revenue && <div>10,00,000</div>}
					{dropDown?.revenue && <div>10,00,000</div>}
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.operating && <div>10,00,000</div>}
					{dropDown?.operating && <div>10,00,000</div>}
				</div>

				<div className={styles.first_total}>
					<div className={styles.particular_data}>80,00,000</div>
					{dropDown?.revenue && <div>10,00,000</div>}
					{dropDown?.revenue && <div>10,00,000</div>}
					<div className={styles.particular_data}>80,00,000</div>
					{dropDown?.operating && <div>10,00,000</div>}
					{dropDown?.operating && <div>10,00,000</div>}
				</div>

			</div>

			<div className={styles.data_sub}>
				<div className={styles.header_particular}>GROSS PROFIT</div>
				<div className={styles.header_ocean}>15,00,000</div>
				<div className={styles.header_air}>15,00,000</div>
				<div className={styles.header_surface}>15,00,000</div>
				<div className={styles.header_rail}>15,00,000</div>
				<div className={styles.header_total}>60,00,000</div>
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

				<div className={styles.first_ocean}>
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					<div className={styles.particular_data}>------</div>

				</div>

				<div className={styles.first_air}>
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					<div className={styles.particular_data}>------</div>
				</div>

				<div className={styles.first_surface}>
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					<div className={styles.particular_data}>------</div>
				</div>

				<div className={styles.first_rail}>
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					<div className={styles.particular_data}>------</div>
				</div>

				<div className={styles.first_total}>
					<div className={styles.particular_data}>500,000</div>
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					{dropDown?.employee && <div>10,00,000</div>}
					<div className={styles.particular_data}>500,000</div>
					<div className={styles.particular_data}>500,000</div>
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					{dropDown?.finance && <div>10,00,000</div>}
					<div className={styles.particular_data}>125,000</div>
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					{dropDown?.other && <div>10,00,000</div>}
					<div className={styles.particular_data}>------</div>
				</div>

			</div>

			<div className={styles.data_sub}>
				<div className={styles.header_particular}>PROFIT BEFORE EXCEPTIONAL AND EXTRAORDINARY ITEMS (B)</div>
				<div className={styles.header_ocean}>15,00,000</div>
				<div className={styles.header_air}>15,00,000</div>
				<div className={styles.header_surface}>15,00,000</div>
				<div className={styles.header_rail}>15,00,000</div>
				<div className={styles.header_total}>60,00,000</div>
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

				<div className={styles.first_ocean}>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>

				</div>

				<div className={styles.first_air}>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
				</div>

				<div className={styles.first_surface}>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
				</div>

				<div className={styles.first_rail}>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
				</div>

				<div className={styles.first_total}>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
					<div className={styles.particular_data}>20,00,000</div>
				</div>

			</div>
			<div className={styles.data_sub}>
				<div className={styles.header_particular}>PROFIT BEFORE TAX (C)</div>
				<div className={styles.header_ocean}>15,00,000</div>
				<div className={styles.header_air}>15,00,000</div>
				<div className={styles.header_surface}>15,00,000</div>
				<div className={styles.header_rail}>15,00,000</div>
				<div className={styles.header_total}>60,00,000</div>
			</div>

			<div className={styles.data_sub}>
				<div className={styles.first_particular}>
					<div className={styles.particular_data_review}>
						(-) Tax Expense
						<div
							className={styles.icon_data}
							onClick={() => {
								setDropDown((prev) => ({ ...prev, tax: !dropDown?.tax }));
							}}
							role="presentation"
						>
							<IcMArrowDown />
						</div>
					</div>
					{dropDown?.tax && <div>Current tax expense</div>}
					{dropDown?.tax && <div>Deferred Tax Expense</div>}

				</div>

				<div className={styles.first_ocean}>
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.tax && <div>10,00,000</div>}
					{dropDown?.tax && <div>10,00,000</div>}
				</div>

				<div className={styles.first_air}>
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.tax && <div>10,00,000</div>}
					{dropDown?.tax && <div>10,00,000</div>}
				</div>

				<div className={styles.first_surface}>
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.tax && <div>10,00,000</div>}
					{dropDown?.tax && <div>10,00,000</div>}
				</div>

				<div className={styles.first_rail}>
					<div className={styles.particular_data}>20,00,000</div>
					{dropDown?.tax && <div>10,00,000</div>}
					{dropDown?.tax && <div>10,00,000</div>}
				</div>

				<div className={styles.first_total}>
					<div className={styles.particular_data}>80,00,000</div>
					{dropDown?.tax && <div>10,00,000</div>}
					{dropDown?.tax && <div>10,00,000</div>}
				</div>

			</div>
			<div className={styles.data_sub}>
				<div className={styles.header_particular}>PROFIT AFTER TAX (D)</div>
				<div className={styles.header_ocean}>15,00,000</div>
				<div className={styles.header_air}>15,00,000</div>
				<div className={styles.header_surface}>15,00,000</div>
				<div className={styles.header_rail}>15,00,000</div>
				<div className={styles.header_total}>60,00,000</div>
			</div>
		</div>

	);
}
export default ListProfit;
