import { ResponsivePie } from '@cogoport/charts/pie';
import { Button, cl } from '@cogoport/components';
import React, { useEffect } from 'react';

import { CUSTOM_THEME, usePieChartConfigs } from '../../../../constants/pie_chart_config';
import { section_header, section_container } from '../styles.module.css';

import styles from './styles.module.css';

function Distribution({ globalFilters = {}, setGlobalFilters = () => {}, data = [], setModeOptions = () => {} }) {
	const { rate_type = null } = globalFilters;
	const { pieChartData, pieColors } = usePieChartConfigs(rate_type, data);

	const handlePieClick = (event) => {
		if (!rate_type) {
			setGlobalFilters((prev) => ({ ...prev, rate_type: event?.data?.key }));
		}
	};

	const defaultView = () => {
		setGlobalFilters((prev) => ({ ...prev, rate_type: null }));
	};

	useEffect(() => {
		setModeOptions(Object.keys(data).filter((item) => item !== 'total_rates'));
	}, [data, setModeOptions]);

	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<h3 className={section_header}>Rate Distribution</h3>
			<div className={styles.pie_chart_container}>
				<div className={styles.pie_chart_left_container}>
					<ResponsivePie
						onClick={handlePieClick}
						data={pieChartData}
						margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
						innerRadius={0.7}
						activeOuterRadiusOffset={8}
						borderWidth={1}
						borderColor={{
							from: 'color',
						}}
						enableArcLabels={false}
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
						{data?.total_rates}
					</p>
					{ rate_type
					&& (
						<Button
							themeType="linkUi"
							className={styles.default_pie_chart_btn}
							onClick={defaultView}
							size="md"
							id="pie-chart-back-btn"
						>
							Go Back
						</Button>
					)}
				</div>
				<div className={styles.pie_chart_right_container}>
					{
						pieChartData.map(({ key, label, value, cancellation }, index) => (
							<div className={styles.legend_box} key={key}>
								<div className={styles.legend_row}>
									<div
										style={{ backgroundColor: pieColors[index] }}
										className={styles.legend_symbol}
									/>
									<div className={styles.legend_text_row}>
										<p className={styles.legend_name}>{label}</p>
										{ !rate_type
										&& <p className={styles.legend_rate}>{`(${value} Rates)`}</p>}
									</div>
								</div>
								{ !rate_type
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
