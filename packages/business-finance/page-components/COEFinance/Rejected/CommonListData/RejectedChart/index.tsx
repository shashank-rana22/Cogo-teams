import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import MyResponsivePie from '../../../Components/PieChart';
import { PieChartData } from '../../../Components/PieChart/PieChartData';
import ResponsiveBarChart from '../../../Components/ResponsiveBarChart';

import styles from './styles.module.css';

function RejectedCharts({ filters = {} }) {
	const data = [
		{
			currency      : 'INR',
			total_audited : 8377,
			rejected      : 8456,
			date          : 'FEBRUARY',
		},
		{
			currency      : 'INR',
			total_audited : 8332,
			rejected      : 8221,
			date          : 'MARCH',
		},
		{
			currency      : 'INR',
			total_audited : 8000,
			rejected      : 7900,
			date          : 'APRIL',
		},
		{
			currency      : 'INR',
			total_audited : 8370,
			rejected      : 8450,
			date          : 'MAY',
		},
		{
			currency      : 'INR',
			total_audited : 8300,
			rejected      : 8200,
			date          : 'June',
		},
		{
			currency      : 'INR',
			total_audited : 8000,
			rejected      : 7000,
			date          : 'July',
		},
		{
			currency      : 'INR',
			total_audited : 8100,
			rejected      : 7500,
			date          : 'AUGUST',
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.responsive_bar_chart}>
				<div className={styles.text_filters_gap}>
					<div className={styles.text_style}>
						Total Rejected
						<div className={styles.border} />
					</div>

					<div className={styles.icon}>
						<Tooltip
							content={(
								<div className={styles.text_styles}>
									A comparison between
									<br />
									consecutive months to identify
									<br />
									the
									month-on-month changes
									<br />
									in cashflow.
								</div>
							)}
							placement="right"
							caret={false}
						>
							<IcMInfo />
						</Tooltip>
					</div>
					{/* <div style={{ marginTop: '10px', marginLeft: '20px' }}>
						<Popover render={content()} caret={false} placement="bottom">
							<div className={styles.input_div}>

							</div>
						</Popover>
					</div> */}
				</div>
				<ResponsiveBarChart barData={data} />
			</div>
			<div className={styles.responsive_pie}>

				<MyResponsivePie data={PieChartData(filters)} />
			</div>
		</div>
	);
}
export default RejectedCharts;
