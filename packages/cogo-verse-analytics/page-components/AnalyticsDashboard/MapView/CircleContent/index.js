import { Placeholder, Tooltip, ButtonIcon, cl } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import React from 'react';

import { circleStats } from '../../../../configurations/circle-stats';
import { imgURL } from '../../../../constants/image-urls';
import { handleValues } from '../../../../utils/handleValues';

import styles from './styles.module.css';

const TheGlobe = dynamic(() => import('../TheGlobe'), { ssr: false });

function CircleContent(props = {}) {
	const {
		stats = {},
		country = {},
		date = {},
		statsLoading = false,
		globeGL = {},
		markerData = [],
		circleTab = '',
		resetGlobePosition = () => {},

	} = props || {};
	const globeStats = stats?.list || {};
	return (
		<div className={styles.circle_content}>
			<div className={styles.circle_frame}>
				<div className={styles.globe_container}>
					{

							(!statsLoading)
								? (

									<TheGlobe
										country={country}
										globeGL={globeGL}
										markerData={markerData}
										globeLoading={statsLoading}
										resetGlobePosition={resetGlobePosition}
										circleTab={circleTab}
										date={date}

									/>

								)
								: (
									<div className={styles.loading_state_container}>
										<img
											src={imgURL.globe_loading_state}
											alt="Loading Co-ordinates"
											width="470px"
											height="470px"
											className={styles.loading_image}
										/>
										<Placeholder type="circle" radius="480px" margin="0px 0px 0px 0px" />
									</div>
								)

						}

				</div>

				{
					circleStats.map(
						(stat) => {
							const { type, valueKey, label } = stat;

							return (
								<div
									className={cl`${styles.circle} ${styles[type]} 
									${circleTab === type && styles.circle_clicked}`}

								>
									<div className={styles.stat_value}>
										{!statsLoading
											? handleValues(globeStats[valueKey] || 0) || 0
											: 	(
												<Placeholder
													className={styles.placeholder_element}
													height="18px"
													width="30px"
													margin="0px 0px 5px 0px"
												/>
											)}

									</div>
									<div className={styles.stat_label}>
										{label}
									</div>
								</div>
							);
						},
					)
					}
				<div className={styles.globe_controls}>
					<Tooltip content="Reset Globe's Position" placement="bottom">
						<ButtonIcon
							size="md"
							type="reset"
							onClick={resetGlobePosition}
							icon={<IcMRefresh />}
							themeType="primary"
						/>
					</Tooltip>
				</div>

			</div>
		</div>
	);
}

export default CircleContent;
