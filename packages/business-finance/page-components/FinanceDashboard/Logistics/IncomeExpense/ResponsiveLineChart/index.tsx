import { ResponsiveLine } from '@cogoport/charts/line/index';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { getAmountInLakh } from '../../getAmountInLakh';
import styles from '../styles.module.css';

interface ListDataInterface {
	income?: number;
	expense?: number;
	month?: string;
	currency?: string;
}
function ResponsiveLineChart({ lineData }) {
	const lineChartData = [
		{
			id    : 'india',
			color : '#ACDADF',
			data  : [],
		},
	];
	(lineData || []).forEach((item:ListDataInterface) => {
		const { income, expense, month = '', currency = '' } = item;
		const pushData = {
			y : Number(income - expense),
			x : (month[0].toUpperCase() + month.slice(1).toLowerCase()).substring(0, 3),
			z : income !== 0 ? Number((income - expense) / income) * 100 : 0,
			currency,
		};
		lineChartData[0].data.push(pushData);
	});

	return (
		<ResponsiveLine
			data={lineChartData}
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			yFormat={(value) => getAmountInLakh(value)}
			tooltip={({ point = {} }:any) => (
				<div
					style={{
						padding      : '9px 12px',
						background   : '#FFFFFF',
						border       : '1px solid #ACDADF',
						borderRadius : '6px',
						fontWeight   : '600',
						fontSize     : '12px',
					}}
				>
					<div style={{ display: 'flex' }}>
						<div>Contribution Margin :</div>
						<div className={styles.amount_style}>
							{formatAmount({
								amount   : (point.data.y || '')?.toString(),
								currency : point?.data?.currency,
								options  : {
									currencyDisplay       : 'code',
									compactDisplay        : 'short',
									maximumFractionDigits : 2,
									style                 : 'currency',
								},
							})}
							<div style={{ color: '#29CC6A' }}>
								(
								{(point.data.z).toFixed(2)}
								)
								%
							</div>
						</div>
					</div>
				</div>
			)}
			enableGridX={false}
			enablePointLabel
			colors="#ACDADF"
			axisBottom={{
				tickSize: 0, tickPadding: 10, tickRotation: 0,
			}}
			axisLeft={{
				tickSize       : 10,
				tickPadding    : -3,
				tickRotation   : 0,
				legendOffset   : 40,
				legendPosition : 'middle',
				format         : (value) => `${getAmountInLakh(value)}`,
			}}
			pointSize={6}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor="#6FA5AB"
			useMesh
		/>
	);
}
export default ResponsiveLineChart;
