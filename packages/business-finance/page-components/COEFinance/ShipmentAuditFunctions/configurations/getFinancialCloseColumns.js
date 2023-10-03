import { Button } from '@cogoport/components';

import RenderTableData from '../commons/renderTableData';
import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const ELEVEN = 11;

const getFinancialCloseColumns = ({
	handleFinancialTabClick = () => {},
}) => {
	const columns = [
		{
			id     : 'jobId',
			Header : (
				<div>SID</div>
			),
			accessor: (row) => {
				const { sid = '' } = row || {};
				return (
					<div>
						<div className={styles.sid_link}>
							<a href="#">
								{`#${row?.jobNumber}`}
							</a>
						</div>
						<div>
							{row?.service}
						</div>
					</div>
				);
			},
		},
		{
			id     : 'estimatedRevenuePreTax',
			Header : (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
				const { sell = {} } = row || {};
				const { estimated, operational, financial } = sell || {};
				return (

					<div className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{/* {estimated} */}
							{/* {getFormatAmount(estimated, 'INR')} */}
							{ShowOverflowingNumber(row?.estimatedRevenuePreTax, ELEVEN, 'INR') }
						</div>
						<RenderTableData data={row?.operationalRevenuePreTax} />
						<RenderTableData data={row?.financialRevenuePreTax} />
					</div>
				);
			},
		},
		{
			id     : 'buy',
			Header : (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
				const { buy = {} } = row || {};
				const { estimated, operational, financial } = buy || {};
				return (

					<div className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(row?.estimatedCostPreTax, 11, 'INR') }
						</div>
						<RenderTableData data={row?.operationalCostPreTax} />
						<RenderTableData data={row?.financialCostPreTax} />
					</div>
				);
			},
		},
		{
			id     : 'estimatedProfitabilityPreTax',
			Header : (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
				const { profitability = {} } = row || {};
				const { estimated, operational, financial } = profitability || {};
				return (

					<div className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(row?.estimatedProfitabilityPreTax, 11, 'INR') }

						</div>
						<RenderTableData data={row?.operationalProfitabilityPreTax} />
						<RenderTableData data={row?.financialProfitabilityPreTax} />
					</div>
				);
			},
		},
		{
			id       : 'estimated',
			Header   : '',
			accessor : (row) => (

				<div>
					<Button themeType="secondary" onClick={() => handleFinancialTabClick(row?.jobId)}>Audit</Button>
				</div>
			),
		},
	];

	return columns;
};
export default getFinancialCloseColumns;
