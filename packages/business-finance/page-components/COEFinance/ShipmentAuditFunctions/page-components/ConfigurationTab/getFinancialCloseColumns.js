import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

const getFinancialCloseColumns = ({ handleClick }) => {
	const columns = [
		{
			id     : 'sid',
			Header : (
				<div>SID</div>
			),
			accessor: (row) => {
				const { sid = '' } = row || {};
				return (
					<div>
						{sid}
					</div>
				);
			},
		},
		{
			id     : 'sell',
			Header : (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className={styles.vertical_rule} />
					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						flexDirection  : 'column',
						width          : '100%',
						padding        : '0 10px',
					}}
					>
						<div className={styles.main_heading}>Sell</div>
						<div style={{
							display        : 'flex',
							justifyContent : 'space-between',
							alignItems     : 'center',
							width          : '100%',
						}}
						>
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

					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						padding        : '0 10px',
					}}
					>
						<div className={styles.fix_layout}>{estimated}</div>
						<div>
							<div className={styles.fix_layout}>
								{operational}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							{/* <div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div> */}
						</div>
						<div>
							<div className={styles.fix_layout}>
								{financial}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							{/* <div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div> */}
						</div>
					</div>
				);
			},
		},
		{
			id     : 'buy',
			Header : (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						flexDirection  : 'column',
						width          : '100%',
						padding        : '0 10px',
					}}
					>
						<div className={styles.main_heading}>Buy</div>
						<div style={{
							display        : 'flex',
							justifyContent : 'space-between',
							alignItems     : 'center',
							width          : '100%',
						}}
						>
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

					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						padding        : '0 10px',
					}}
					>
						<div className={styles.fix_layout}>{estimated}</div>
						<div>
							<div className={styles.fix_layout}>
								{operational}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							{/* <div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div> */}
						</div>
						<div>
							<div className={styles.fix_layout}>
								{financial}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							{/* <div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div> */}
						</div>
					</div>
				);
			},
		},
		{
			id     : 'profitability',
			Header : (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						flexDirection  : 'column',
						width          : '100%',
						padding        : '0 10px',
					}}
					>
						<div className={styles.main_heading}>Profitability</div>
						<div style={{
							display        : 'flex',
							justifyContent : 'space-between',
							alignItems     : 'center',
							width          : '100%',
						}}
						>
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

					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						padding        : '0 10px',
					}}
					>
						<div className={styles.fix_layout}>{estimated}</div>
						<div>
							<div className={styles.fix_layout}>
								{operational}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							{/* <div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div> */}
						</div>
						<div>
							<div className={styles.fix_layout}>
								{financial}
							</div>
							<div className={styles.profit_icon}>
								<IcMArrowNext height="16" width="16" />
							</div>
							{/* <div className={styles.loss_icon}>
								<IcMArrowNext height="16" width="16" />
							</div> */}
						</div>
					</div>
				);
			},
		},
		{
			id       : 'estimated',
			Header   : '',
			accessor : () => (

				<div>
					<Button themeType="secondary" onClick={() => handleClick()}>Audit</Button>
				</div>
			),
		},
	];

	return columns;
};
export default getFinancialCloseColumns;
