import { Button } from '@cogoport/components';

import RenderTableData from '../commons/renderTableData';
import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const ELEVEN = 11;

const getJobColumns = ({ handleClick = () => {}, tax = '' }) => {
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
					<div style={{ padding: '0 30px' }} className={styles.header_financial}>
						<div className={styles.main_heading}>Sell</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operationally}>Operational</div>
							{/* <div className={styles.financial}>Financial</div> */}
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const { sell = {} } = row || {};
				const { estimated, operational } = sell || {};
				return (

					<div style={{ padding: '0 30px' }} className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(row?.estimatedRevenuePreTax, ELEVEN, 'INR') }
						</div>
						<RenderTableData
							data={row?.operationalRevenuePreTax}
							percent={tax === 'Pre' ? row?.operationalSellDeviationToEstimatedPreTax
								: row?.operationalSellDeviationToEstimatedPostTax}
						/>
						{/* <div>
							<div className={styles.fix_layout}>
								{financial}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							<div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
						</div> */}
					</div>
				);
			},
		},
		{
			id     : 'estimatedCostPreTax',
			Header : (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ padding: '0 30px' }} className={styles.header_financial}>
						<div className={styles.main_heading}>Buy</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operationally}>Operational</div>
							{/* <div className={styles.financial}>Financial</div> */}
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const { buy = {} } = row || {};
				const { estimated, operational } = buy || {};
				return (

					<div style={{ padding: '0 30px' }} className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(row?.estimatedCostPreTax, ELEVEN, 'INR') }
						</div>
						<RenderTableData
							data={row?.operationalCostPreTax}
							percent={tax === 'Pre' ? row?.operationalBuyDeviationToEstimatedPreTax
								: row?.operationalBuyDeviationToEstimatedPostTax}
						/>
						{/* <div>
							<div className={styles.fix_layout}>
								{financial}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							<div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
						</div> */}
					</div>
				);
			},
		},
		{
			id     : 'estimatedProfitabilityPreTax',
			Header : (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ padding: '0 30px' }} className={styles.header_financial}>
						<div className={styles.main_heading}>Profitability</div>
						<div className={styles.sub_header_financial}>
							<div>Estimated</div>
							<div className={styles.operationally}>Operational</div>
							{/* <div className={styles.financial}>Financial</div> */}
						</div>
					</div>
					<div className={styles.vertical_rule} />
				</div>
			),
			accessor: (row) => {
				const { profitability = {} } = row || {};
				const { estimated, operational } = profitability || {};
				return (

					<div style={{ padding: '0 30px' }} className={styles.accessor_financial}>
						<div className={styles.fix_layout}>
							{ShowOverflowingNumber(row?.estimatedProfitabilityPreTax, ELEVEN, 'INR') }
						</div>
						<RenderTableData
							data={row?.operationalProfitabilityPreTax}
							percent={tax === 'Pre' ? row?.operationalProfitabilityDeviationToPreTax
								: row?.operationalProfitabilityDeviationToPostTax}
						/>
						{/* <div>
							<div className={styles.fix_layout}>
								{financial}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							<div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
						</div> */}
					</div>
				);
			},
		},
		{
			id       : 'jobNumber',
			Header   : '',
			accessor : (row) => (

				<div>
					<Button themeType="secondary" onClick={() => handleClick(row?.jobId)}>Audit</Button>
				</div>
			),
		},
	];

	return columns;
};
export default getJobColumns;
