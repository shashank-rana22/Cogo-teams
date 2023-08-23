import { ResponsivePie } from '@cogoport/charts/pie';
import { Button, Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import NoDataState from '../../../../common/NoDataState';
import { CUSTOM_THEME, usePieChartConfigs } from '../../../../constants/pie_chart_config';
import useGetFclFreightDistribution from '../../../../hooks/useGetFclFreightRateDistribution';
import { formatBigNumbers } from '../../../../utils/formatBigNumbers';
import { section_header, section_container } from '../styles.module.css';

import styles from './styles.module.css';

const LOADING_COUNT = 5;
function Distribution({ globalFilters = {}, setGlobalFilters = () => {} }) {
	const { mode = null } = globalFilters;
	const {
		data = {},
		loading = false,
	} = useGetFclFreightDistribution({ filters: globalFilters });

	const { pieChartData, pieColors } = usePieChartConfigs(mode, data);

	const handlePieClick = (event) => {
		if (!mode) {
			setGlobalFilters((prev) => ({ ...prev, mode: event?.data?.key }));
		}
	};

	const defaultView = () => {
		setGlobalFilters((prev) => ({ ...prev, mode: null }));
	};

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
									<p className={styles.pie_center_text}>Total Rates</p>
									<p className={styles.pie_center_count}>
										{formatBigNumbers(data?.total_rates || GLOBAL_CONSTANTS.zeroth_index)}
									</p>
									{ mode
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
										{ !mode
										&& <p className={styles.legend_rate}>{`(${formatBigNumbers(value)} Rates)`}</p>}
									</div>
								</div>
								{ !mode
									? (
										<p className={styles.legend_percentage}>
											{`${cancellation} % Cancellation`}
										</p>
									)
									: (
										<p className={styles.legend_percentage_dark}>
											{`${formatBigNumbers(value)} Rates (${cancellation}%)`}
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
		</div>
	);
}

export default Distribution;
