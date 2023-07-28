import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import NoDataState from '../../../../common/NoDataState';
import { section_container } from '../styles.module.css';

import SeriesChart from './SeriesChart';
import styles from './styles.module.css';

function ScallableAccuracy({ accuracy = [], loading = false }) {
	const FINAL_DATA = [];
	const IDS = [];
	accuracy.forEach(({ id, data }) => {
		IDS.push(id);
		data.forEach(({ x, y }, idx) => {
			FINAL_DATA[idx] = {
				date : new Date(x).getTime(),
				...(FINAL_DATA[idx] || {}),
				[id] : y,
			};
		});
	});

	return (
		<div className={cl`${styles.container} ${section_container}`}>
			{(loading || !isEmpty(accuracy))
				? <SeriesChart loading={loading} data={FINAL_DATA} seriesIds={IDS} />
				: <NoDataState flow="column" />}
			<div className={styles.hide_logo} />
		</div>

	);
}

export default ScallableAccuracy;
