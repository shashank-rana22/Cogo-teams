import { ResponsivePie } from '@cogoport/charts/pie';
import { Button, cl } from '@cogoport/components';
import React from 'react';

import { CUSTOM_THEME, usePieChartConfigs } from '../../../../constants/pie_chart_config';
import { section_header, section_container } from '../styles.module.css';

import styles from './styles.module.css';

const CONSTANT_ZERO = 0;

function Distribution({ filters = {}, setFilters = () => {} }) {
	const { pieChartView } = filters;
	const { customData, pieColors } = usePieChartConfigs(pieChartView);

	const handlePieClick = (event) => {
		if (pieChartView === 'default') {
			setFilters((prev) => ({ ...prev, pieChartView: event?.data?.key }));
		}
	};

	const defaultView = () => {
		setFilters((prev) => ({ ...prev, pieChartView: 'default' }));
	};

	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<h3 className={section_header}>Rate Distribution</h3>
			<div className={styles.pie_chart_container}>
				<div className={styles.pie_chart_left_container}>
					<ResponsivePie
						onClick={handlePieClick}
						data={customData}
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
						colors={pieColors}
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
						{customData.reduce((total, item) => total + item.value, CONSTANT_ZERO)}
					</p>
					{ pieChartView !== 'default'
					&& (
						<Button
							themeType="linkUi"
							className={styles.default_pie_chart_btn}
							onClick={defaultView}
							size="sm"
						>
							Go Back
						</Button>
					)}
				</div>
				<div className={styles.pie_chart_right_container}>
					{
						customData.map(({ key, label, value, cancellation }, index) => (
							<div className={styles.legend_box} key={key}>
								<div className={styles.legend_row}>
									<div
										style={{ backgroundColor: pieColors[index] }}
										className={styles.legend_symbol}
									/>
									<div className={styles.legend_text_row}>
										<p className={styles.legend_name}>{label}</p>
										{ pieChartView === 'default'
										&& <p className={styles.legend_rate}>{`(${value} Rates)`}</p>}
									</div>
								</div>
								{ pieChartView === 'default'
									? (
										<p className={styles.legend_percentage}>
											{`${cancellation} % Cancellation`}
										</p>
									)
									: (
										<p className={styles.legend_percentage_dark}>
											{`${value} Rates (${cancellation}%)`}
										</p>
									)}
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default Distribution;
