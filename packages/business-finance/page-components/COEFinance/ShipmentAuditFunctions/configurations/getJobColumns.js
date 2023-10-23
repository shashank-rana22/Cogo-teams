import { Button } from '@cogoport/components';

import RenderTableData from '../commons/renderTableData';
import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const OVERFLOW_LENGTH = 11;

const getJobColumns = ({ handleClick = () => {}, tax = '' }) => {
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
					<div style={{ padding: '0 30px' }} className={styles.header_financial}>
						<div className={styles.main_heading}>Sell</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operationally}>Operational</div>
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const {
					estimatedRevenuePreTax = '', estimatedRevenuePostTax = '',
					operationalRevenuePreTax = '', operationalRevenuePostTax = '',
					operationalSellDeviationToEstimatedPreTax = '', operationalSellDeviationToEstimatedPostTax = '',
					currency = '',
				} = row || {};
				const dataOperational = tax === 'Pre' ? operationalRevenuePreTax : operationalRevenuePostTax;
				const dataEstimated = tax === 'Pre' ? estimatedRevenuePreTax : estimatedRevenuePostTax;
				const dataProfitPercent = tax === 'Pre' ? operationalSellDeviationToEstimatedPreTax
					: operationalSellDeviationToEstimatedPostTax;
				return (

					<div style={{ padding: '0 30px' }} className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(dataEstimated, OVERFLOW_LENGTH, currency) }
						</div>
						<RenderTableData data={dataOperational} profit={dataProfitPercent} currency={currency} />
					</div>
				);
			},
		},
		{
			id     : 'estimatedCostPreTax',
			Header : (
				<div className={styles.common_header_styling}>
					<div style={{ padding: '0 30px' }} className={styles.header_financial}>
						<div className={styles.main_heading}>Buy</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operationally}>Operational</div>
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const {
					estimatedCostPreTax = '', estimatedCostPostTax = '',
					operationalCostPreTax = '', operationalCostPostTax = '',
					operationalBuyDeviationToEstimatedPreTax = '', operationalBuyDeviationToEstimatedPostTax = '',
					currency = '',
				} = row || {};
				const dataOperational = tax === 'Pre' ? operationalCostPreTax : operationalCostPostTax;
				const dataEstimated = tax === 'Pre' ? estimatedCostPreTax : estimatedCostPostTax;
				const dataProfitPercent = tax === 'Pre' ? operationalBuyDeviationToEstimatedPreTax
					: operationalBuyDeviationToEstimatedPostTax;
				return (

					<div style={{ padding: '0 30px' }} className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(dataEstimated, OVERFLOW_LENGTH, currency) }
						</div>
						<RenderTableData
							data={dataOperational}
							profit={dataProfitPercent}
							category="BUY"
							currency={currency}
						/>
					</div>
				);
			},
		},
		{
			id     : 'estimatedProfitabilityPreTax',
			Header : (
				<div className={styles.common_header_styling}>
					<div style={{ padding: '0 30px' }} className={styles.header_financial}>
						<div className={styles.main_heading}>Profitability</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operationally}>Operational</div>
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const {
					estimatedProfitabilityPreTax = '', estimatedProfitabilityPostTax = '',
					operationalProfitabilityPreTax = '', operationalProfitabilityPostTax = '',
					operationalProfitabilityDeviationToPreTax = '', operationalProfitabilityDeviationToPostTax = '',
				} = row || {};
				const dataOperational = tax === 'Pre'
					? operationalProfitabilityPreTax : operationalProfitabilityPostTax;
				const dataEstimated = tax === 'Pre' ? estimatedProfitabilityPreTax : estimatedProfitabilityPostTax;
				const dataProfitPercent = tax === 'Pre' ? operationalProfitabilityDeviationToPreTax
					: operationalProfitabilityDeviationToPostTax;
				return (

					<div style={{ padding: '0 30px' }} className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{`${dataEstimated}%`}
						</div>
						<RenderTableData
							data={dataOperational}
							profit={dataProfitPercent}
							category="Profitability"
						/>
					</div>
				);
			},
		},
		{
			id       : 'jobNumber',
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
export default getJobColumns;
