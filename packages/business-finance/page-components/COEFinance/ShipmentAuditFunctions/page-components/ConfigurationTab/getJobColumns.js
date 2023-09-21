import { Button } from '@cogoport/components';

const getJobColumns = ({ handleClick }) => {
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
				<div style={{
					display        : 'flex',
					justifyContent : 'space-between',
					alignItems     : 'center',
					flexDirection  : 'column',
					marginRight    : '20px',
				}}
				>
					<div>Sell</div>
					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						width          : '100%',
					}}
					>
						<div>Estimated</div>
						<div>Operational</div>
						<div>Financial</div>
					</div>
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
						marginRight    : '20px',
					}}
					>
						<div>{estimated}</div>
						<div>{operational}</div>
						<div>{financial}</div>
					</div>
				);
			},
		},
		{
			id     : 'buy',
			Header : (
				<div style={{
					display        : 'flex',
					justifyContent : 'space-between',
					alignItems     : 'center',
					flexDirection  : 'column',
					marginRight    : '20px',
				}}
				>
					<div>Buy</div>
					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						width          : '100%',
					}}
					>
						<div>Estimated</div>
						<div>Operational</div>
						<div>Financial</div>
					</div>
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
						marginRight    : '20px',
					}}
					>
						<div>{estimated}</div>
						<div>{operational}</div>
						<div>{financial}</div>
					</div>
				);
			},
		},
		{
			id     : 'profitability',
			Header : (
				<div style={{
					display        : 'flex',
					justifyContent : 'space-between',
					alignItems     : 'center',
					flexDirection  : 'column',
					marginRight    : '20px',
				}}
				>
					<div>Profitability</div>
					<div style={{
						display        : 'flex',
						justifyContent : 'space-between',
						alignItems     : 'center',
						width          : '100%',
					}}
					>
						<div>Estimated</div>
						<div>Operational</div>
						<div>Financial</div>
					</div>
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
						marginRight    : '20px',
					}}
					>
						<div>{estimated}</div>
						<div>{operational}</div>
						<div>{financial}</div>
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
export default getJobColumns;
