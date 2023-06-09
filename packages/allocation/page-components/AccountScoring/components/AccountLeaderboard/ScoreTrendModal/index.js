import { DateRangepicker, Modal, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ScoreTrendChart from '../../../common/ScoreTrendChart';
import DURATION_OPTIONS from '../../../configurations/duration-options';
import useGetEngagementScoringGraphStats from '../../../hooks/useGetEngagementScoringGraphStats';

import styles from './styles.module.css';

function ScoreTrendModal(props) {
	const { scoreTrendIds, setScoreTrendIds } = props;

	const {
		data,
		duration,
		setDuration,
		dateRange,
		setDateRange,
	} = useGetEngagementScoringGraphStats({ scoreTrendIds });

	const { trend = '', data: graphData = [] } = data || {};

	return (
		<Modal
			size="fullscreen"
			show={!isEmpty(scoreTrendIds)}
			onClose={() => setScoreTrendIds({})}
			closeOnOuterClick
			showCloseIcon
			animate
			scroll={false}
		>
			<Modal.Header title="Engagement Score percentile vs time" />

			<Modal.Body>
				<div>
					<Select
						value={duration}
						onChange={setDuration}
						options={DURATION_OPTIONS}
						placeholder="Select Duration"
					/>

					<DateRangepicker
						value={dateRange}
						onChange={(temp) => setDateRange((pv) => ({
							startDate : temp.startDate || pv.startDate,
							endDate   : temp.endDate || pv.endDate,
						}))}
						isPreviousDaysAllowed
						maxDate={new Date()}
						disable={duration !== 'custom'}
					/>
				</div>

				<div className={styles.score_graph}>
					<ScoreTrendChart trend={trend} data={graphData} source="modal" />
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ScoreTrendModal;
