import { ResponsivePie } from '@cogoport/charts/pie/index';
import { Tooltip, DateRangepicker } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function MyResponsivePie({
	data = [],
	title = '',
	subActiveTabReject = '',
	setRemarkDate = () => {},
	remarkDate = undefined,
	handlePieChartOnClick = () => {},
}) {
	return (
		<>
			<div className={styles.invoice}>
				{title}
				<Tooltip
					content={(
						<div className={styles.tooltip_text}>
							Rejection statistics of the invoices that COE finance rejects
						</div>
					)}
					placement="top"
				>
					<div className={styles.icon}>
						<IcMInfo />
					</div>
				</Tooltip>
				{(subActiveTabReject === 'coe_rejected' || subActiveTabReject === 'coe_on_hold')
					? (
						<div style={{ marginLeft: '20px' }}>
							<DateRangepicker
								dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
								name="date"
								onChange={setRemarkDate}
								value={remarkDate}
								isPreviousDaysAllowed
								maxDate={new Date()}
							/>
						</div>
					) : null}
			</div>

			<div className={styles.border} />

			<ResponsivePie
				data={data}
				onClick={handlePieChartOnClick}
				margin={{ top: 20, right: 10, bottom: 80, left: 300 }}
				startAngle={-180}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				colors={['hsl(186, 26%, 55%)', 'hsl(186, 44%, 68%)', 'hsl(186, 44%, 77%)', 'hsl(186, 45%, 87%)']}
				borderColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							0.2,
						],
					],
				}}
				arcLabel={(value) => `${value?.value || 0}%`}
				sortByValue
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#ffff"
				arcLinkLabelsThickness={0}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							2,
						],
					],
				}}
				defs={[
					{
						id         : 'dots',
						type       : 'patternDots',
						background : 'inherit',
						color      : 'rgba(255, 255, 255, 0.3)',
						size       : 4,
						padding    : 1,
						stagger    : true,
					},
					{
						id         : 'lines',
						type       : 'patternLines',
						background : 'inherit',
						color      : 'rgba(255, 255, 255, 0.3)',
						rotation   : -45,
						lineWidth  : 6,
						spacing    : 10,
					},
				]}
				legends={[
					{
						anchor        : 'top-left',
						direction     : 'column',
						justify       : false,
						translateX    : -250,
						translateY    : 20,
						itemsSpacing  : 0,
						itemWidth     : 100,
						itemHeight    : 25,
						itemTextColor : '#999',
						itemDirection : 'left-to-right',
						itemOpacity   : 1,
						symbolSize    : 14,
						symbolShape   : 'circle',
						effects       : [
							{
								on    : 'hover',
								style : {
									itemTextColor: '#000',
								},
							},
						],
					},
				]}
			/>
		</>
	);
}
export default MyResponsivePie;
