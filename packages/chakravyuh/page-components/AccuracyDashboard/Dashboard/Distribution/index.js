import { ResponsivePie } from '@cogoport/charts/pie';
import { Button, Placeholder, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import NoDataState from '../../../../common/NoDataState';
import { CUSTOM_THEME, usePieChartConfigs } from '../../../../constants/pie_chart_config';
import useGetFclFreightDistribution from '../../../../hooks/useGetFclFreightRateDistribution';
import { formatBigNumbers } from '../../../../utils/formatBigNumbers';
import { section_header, section_container, bottom_label } from '../styles.module.css';

import styles from './styles.module.css';

const LOADING_COUNT = 5;
function Distribution({ globalFilters = {}, dateString = '' }) {
	const { parent_mode = null } = globalFilters;
	const [parentMode, setParentMode] = useState(null);
	const {
		data = {},
		loading = false,
	} = useGetFclFreightDistribution({ filters: globalFilters });

	const { pieChartData, pieColors } = usePieChartConfigs(parentMode, data);

	const handlePieClick = (event) => {
		if (!parentMode) {
			setParentMode(event?.data?.key);
		}
	};

	const defaultView = () => {
		setParentMode(null);
	};

	useEffect(() => {
		setParentMode(parent_mode);
	}, [parent_mode]);

	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<h3 className={section_header}>Rate Distribution</h3>
			{
				pieChartData && pieChartData.length > GLOBAL_CONSTANTS.zeroth_index
					? (
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
							{loading ? (
								<div className={cl`${styles.pie_chart_middle_container} ${styles.loading}`}>
									<Placeholder type="circle" radius="170px" />
								</div>
							) : (
								<div className={styles.pie_chart_middle_container}>
									<Tooltip content="Active rates for selected time.">
										<p className={styles.pie_center_text}>Active Rates</p>
									</Tooltip>
									<p className={styles.pie_center_count}>
										<Tooltip
											content={(
												<span>
													{data?.total_rate_count || GLOBAL_CONSTANTS.zeroth_index}
												</span>
											)}
											placement="bottom"
										>
											{formatBigNumbers(data?.total_rate_count || GLOBAL_CONSTANTS.zeroth_index)}
										</Tooltip>
									</p>
									{ parentMode
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
							)}
							{loading ? (
								<div className={cl`${styles.pie_chart_right_container} ${styles.loading}`}>
									{[...new Array(LOADING_COUNT).keys()].map(
										(i) => <Placeholder key={i} height="16px" />,
									)}
								</div>
							) : (
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
										{ !parentMode
										&& (
											<p className={styles.legend_rate}>
												<Tooltip
													content={<span>{value || GLOBAL_CONSTANTS.zeroth_index}</span>}
													placement="bottom"
												>
													{`(${formatBigNumbers(value)} Rates)`}
												</Tooltip>
											</p>
										)}
									</div>
								</div>
								{ !parentMode
									? (
										<p className={styles.legend_percentage}>
											{`${cancellation} % Cancellation`}
										</p>
									)
									: (
										<p className={styles.legend_percentage_dark}>
											<Tooltip
												content={<span>{value || GLOBAL_CONSTANTS.zeroth_index}</span>}
												placement="left"
											>
												{`${formatBigNumbers(value)} Rates (
													${cancellation || GLOBAL_CONSTANTS.zeroth_index}%)`}
											</Tooltip>
										</p>
									)}
							</div>
						))
					}
								</div>
							)}
						</div>
					)
					: <NoDataState flow="column" visible={!loading} />
			}
			<h5 className={cl`${styles.bottom_label} ${bottom_label}`}>{dateString}</h5>
		</div>
	);
}

export default Distribution;
