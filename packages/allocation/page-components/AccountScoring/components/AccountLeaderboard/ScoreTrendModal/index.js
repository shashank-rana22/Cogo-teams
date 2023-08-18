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
			<Modal.Header className={styles.header} title="Engagement Score percentile vs time" />

			<Modal.Body>
				<div className={styles.filter_container}>
					<div className={styles.control_container}>
						<label className={styles.label}>Duration</label>

						<div className={styles.select_container}>
							<Select
								value={duration}
								onChange={setDuration}
								options={DURATION_OPTIONS}
								placeholder="Select Duration"
							/>
						</div>
					</div>

					<div className={styles.control_container}>
						<label className={styles.label}>Date Range</label>

						<DateRangepicker
							value={dateRange}
							onChange={setDateRange}
							isPreviousDaysAllowed
							maxDate={new Date()}
							disable={duration !== 'custom'}
						/>
					</div>
				</div>

				<div className={styles.score_graph}>
					<ScoreTrendChart trend={trend} data={graphData} source="modal" />
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ScoreTrendModal;
