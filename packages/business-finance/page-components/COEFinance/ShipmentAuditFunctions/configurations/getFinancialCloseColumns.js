import { Button } from '@cogoport/components';

import RenderTableData from '../commons/renderTableData';
import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const OVERFLOW_LENGTH = 11;

const getFinancialCloseColumns = ({
	handleClick = () => {},
	tax = '',
}) => {
	const columns = [
		{
			id     : 'jobId',
			Header : (
				<div>SID</div>
			),
			accessor: (row) => (
				<div>
					<div className={styles.sid_link}>

						{`#${row?.jobNumber}`}

					</div>
					<div>
						{row?.service}
					</div>
				</div>
			),
		},
		{
			id     : 'estimatedRevenuePreTax',
			Header : (
				<div className={styles.common_header_styling}>
					<div className={styles.vertical_rule} />
					<div className={styles.header_financial}>
						<div className={styles.main_heading}>Sell</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operational}>Operational</div>
							<div className={styles.financial}>Financial</div>
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const {
					estimatedRevenuePreTax = 0, estimatedRevenuePostTax = 0,
					operationalRevenuePreTax = 0, operationalRevenuePostTax = 0,
					actualRevenuePreTax = 0, actualRevenuePostTax = 0,
					operationalSellDeviationToEstimatedPreTax = 0, operationalSellDeviationToEstimatedPostTax = 0,
					financialSellDeviationToEstimatedPreTax = 0, financialSellDeviationToEstimatedPostTax = 0,
					currency = '',
				} = row || {};
				const dataOperational = tax === 'Pre' ? operationalRevenuePreTax : operationalRevenuePostTax;
				const dataEstimated = tax === 'Pre' ? estimatedRevenuePreTax : estimatedRevenuePostTax;
				const dataProfitPercent = tax === 'Pre' ? operationalSellDeviationToEstimatedPreTax
					: operationalSellDeviationToEstimatedPostTax;
				const dataFinancial = tax === 'Pre' ? actualRevenuePreTax : actualRevenuePostTax;
				const financeProfit = tax === 'Pre' ? financialSellDeviationToEstimatedPreTax
					: financialSellDeviationToEstimatedPostTax;
				return (
					<div className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(dataEstimated, OVERFLOW_LENGTH, currency) }
						</div>
						<RenderTableData data={dataOperational} profit={dataProfitPercent} currency={currency} />
						<RenderTableData
							data={dataFinancial}
							profit={financeProfit}
							currency={currency}
						/>
					</div>
				);
			},
		},
		{
			id     : 'buy',
			Header : (
				<div className={styles.common_header_styling}>
					<div className={styles.header_financial}>
						<div className={styles.main_heading}>Buy</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operational}>Operational</div>
							<div className={styles.financial}>Financial</div>
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const {
					estimatedCostPreTax = 0, estimatedCostPostTax = 0,
					operationalCostPreTax = 0, operationalCostPostTax = 0,
					actualCostPreTax = 0, actualCostPostTax = 0,
					operationalBuyDeviationToEstimatedPreTax = 0, operationalBuyDeviationToEstimatedPostTax = 0,
					financialBuyDeviationToEstimatedPreTax = 0, financialBuyDeviationToEstimatedPostTax = 0,
					currency = '',
				} = row || {};
				const dataOperational = tax === 'Pre' ? operationalCostPreTax : operationalCostPostTax;
				const dataEstimated = tax === 'Pre' ? estimatedCostPreTax : estimatedCostPostTax;
				const dataProfitPercent = tax === 'Pre' ? operationalBuyDeviationToEstimatedPreTax
					: operationalBuyDeviationToEstimatedPostTax;
				const dataFinancial = tax === 'Pre' ? actualCostPreTax : actualCostPostTax;
				const financeProfit = tax === 'Pre' ? financialBuyDeviationToEstimatedPreTax
					: financialBuyDeviationToEstimatedPostTax;
				return (

					<div className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(dataEstimated, OVERFLOW_LENGTH, currency) }
						</div>
						<RenderTableData
							data={dataOperational}
							profit={dataProfitPercent}
							currency={currency}
							category="BUY"
						/>
						<RenderTableData
							data={dataFinancial}
							profit={financeProfit}
							currency={currency}
							category="BUY"
						/>
					</div>
				);
			},
		},
		{
			id     : 'estimatedProfitabilityPreTax',
			Header : (
				<div className={styles.common_header_styling}>
					<div className={styles.header_financial}>
						<div className={styles.main_heading}>Profitability</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operational}>Operational</div>
							<div className={styles.financial}>Financial</div>
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const {
					estimatedProfitabilityPreTax = 0, estimatedProfitabilityPostTax = 0,
					operationalProfitabilityPreTax = 0, operationalProfitabilityPostTax = 0,
					actualProfitabilityPreTax = 0, actualProfitabilityPostTax = 0,
					operationalProfitabilityDeviationToPreTax = 0, operationalProfitabilityDeviationToPostTax = 0,
					financialProfitabilityDeviationToPreTax = 0, financialProfitabilityDeviationToPostTax = 0,
				} = row || {};
				const dataOperational = tax === 'Pre'
					? operationalProfitabilityPreTax : operationalProfitabilityPostTax;
				const dataEstimated = tax === 'Pre' ? estimatedProfitabilityPreTax : estimatedProfitabilityPostTax;
				const dataProfitPercent = tax === 'Pre' ? operationalProfitabilityDeviationToPreTax
					: operationalProfitabilityDeviationToPostTax;
				const dataFinancial = tax === 'Pre' ? actualProfitabilityPreTax : actualProfitabilityPostTax;
				const financeProfit = tax === 'Pre' ? financialProfitabilityDeviationToPreTax
					: financialProfitabilityDeviationToPostTax;
				return (

					<div className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{`${dataEstimated}%`}
						</div>
						<RenderTableData data={dataOperational} profit={dataProfitPercent} category="Profitability" />
						<RenderTableData
							data={dataFinancial}
							profit={financeProfit}
							category="Profitability"
						/>
					</div>
				);
			},
		},
		{
			id       : 'estimated',
			Header   : '',
			accessor : (row) => (
				<div>
					<Button
						themeType="secondary"
						onClick={() => handleClick({
							jobId     : row?.jobId,
							jobNumber : row?.jobNumber,
							currency  : row?.currency,
						})}
					>
						Audit
					</Button>
				</div>
			),
		},
	];

	return columns;
};
export default getFinancialCloseColumns;
