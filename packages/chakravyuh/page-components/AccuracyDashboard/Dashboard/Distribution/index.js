import { ResponsivePie } from '@cogoport/charts/pie';
import { cl } from '@cogoport/components';
import React from 'react';

import { CUMSTOM_DATA, CUSTOM_THEME } from '../../../../constants/pie_chart_config';
import { section_header, section_container } from '../styles.module.css';

import styles from './styles.module.css';

const CONSTANT_ZERO = 0;

function Distribution() {
	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<h3 className={section_header}>Rate Distribution</h3>
			<div className={styles.pie_chart_container}>
				<div className={styles.pie_chart_left_container}>
					<ResponsivePie
						data={CUMSTOM_DATA}
						margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
						innerRadius={0.7}
						activeOuterRadiusOffset={8}
						borderWidth={1}
						borderColor={{
							from: 'color',
						}}
						enableArcLinkLabels={false}
						arcLinkLabelsSkipAngle={10}
						arcLinkLabelsTextColor="#333333"
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor={{ from: 'color' }}
						arcLabelsSkipAngle={8}
						arcLabelsTextColor="#4F4F4F"
						arcLabelsTextSize={36}
						colors={CUMSTOM_DATA.map((item) => item.color)}
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
						theme={CUSTOM_THEME}
					/>
				</div>
				<div className={styles.pie_chart_middle_container}>
					<p className={styles.pie_center_text}>Total Rates</p>
					<p className={styles.pie_center_count}>
						{CUMSTOM_DATA.reduce((total, item) => total + item.value, CONSTANT_ZERO)}
					</p>
				</div>
				<div className={styles.pie_chart_right_container}>
					{
						CUMSTOM_DATA.map(({ key, label, value, cancellation }) => (
							<div className={styles.legend_box} key={key}>
								<div className={styles.legend_row}>
									<div className={cl`${styles.legend_symbol} ${styles[key]}`} />
									<p className={styles.legend_name}>{label}</p>
									<p className={styles.legend_rate}>{`(${value} Rates)`}</p>
								</div>
								<p className={styles.legend_percentage}>{`${cancellation} % Cancellation`}</p>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default Distribution;
