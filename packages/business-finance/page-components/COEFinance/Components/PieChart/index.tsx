import { ResponsivePie } from '@cogoport/charts/pie/index';
import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import { PieChartData } from './PieChartData';
import styles from './styles.module.css';

function MyResponsivePie() {
	return (
		<>
			<div className={styles.invoice}>
				Rejection Statistics
				<Tooltip content="Rejection statistics of the Invoices that coe finance rejects" placement="top">
					<div className={styles.icon}>
						<IcMInfo />
					</div>
				</Tooltip>
			</div>

			<div className={styles.border} />

			<ResponsivePie
				data={PieChartData()}
				margin={{ top: 50, right: 80, bottom: 80, left: 80 }}
				startAngle={-180}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				borderColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							0.2,
						],
					],
				}}
        // tooltip={function(e){}}
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
						translateX    : -50,
						translateY    : 50,
						itemsSpacing  : 0,
						itemWidth     : 100,
						itemHeight    : 30,
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
