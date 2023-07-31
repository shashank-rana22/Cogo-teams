import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross, IcMExpand } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import NoDataState from '../../../../common/NoDataState';
import { COLOR_MAPPINGS } from '../../../../constants/pie_chart_config';
import { section_container, section_header } from '../styles.module.css';

import SeriesChart from './SeriesChart';
import styles from './styles.module.css';

const VALID_IDS = ['supply_rates', 'rate_extension', 'predicted', 'cluster_extension'];
const TIME_LIMIT = 200;
function ScallableAccuracy({
	accuracy = [],
	loading = false, mode = null,
	setIsHighlighted = () => {},
	isHighlighted = false,
}) {
	const IDS = mode ? [mode] : VALID_IDS;
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		setIsAnimating(true);
		const timeOut = setTimeout(() => {
			setIsAnimating(false);
		}, TIME_LIMIT);

		return () => {
			clearTimeout(timeOut);
		};
	}, [isHighlighted]);

	return (
		<div className={cl`${styles.container} ${section_container} `}>
			<h3 className={cl`${styles.header} ${section_header}`}>
				Rate Accuracy with Time
				{isHighlighted ? (
					<IcMCross
						className={styles.expand_icon}
						onClick={() => setIsHighlighted((prev) => !prev)}
					/>
				) : (
					<IcMExpand
						className={styles.expand_icon}
						onClick={() => setIsHighlighted((prev) => !prev)}
					/>
				)}
			</h3>

			<div className={styles.legends}>
				{IDS.map((key) => (
					<div className={styles.legend_item} key={key}>
						<div
							className={styles.circle}
							style={{ background: `${COLOR_MAPPINGS[key][GLOBAL_CONSTANTS.zeroth_index]}` }}
						/>
						{startCase(key)}
					</div>
				))}
			</div>
			<div className={cl`${styles.chart_container} ${isAnimating ? styles.blur : ''}`}>
				{(loading || !isEmpty(accuracy))
					? <SeriesChart loading={loading} data={accuracy} seriesIds={IDS} />
					: <NoDataState flow="column" />}
			</div>

		</div>

	);
}

export default ScallableAccuracy;
