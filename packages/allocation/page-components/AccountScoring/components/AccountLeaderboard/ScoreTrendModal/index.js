import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ScoreTrendChart from '../../../common/ScoreTrendChart';
import useGetEngagementScoringGraphStats from '../../../hooks/useGetEngagementScoringGraphStats';

import styles from './styles.module.css';

function ScoreTrendModal(props) {
	const { scoreTrendIds, setScoreTrendIds } = props;

	const { data } = useGetEngagementScoringGraphStats({ scoreTrendIds });

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
				<div className={styles.score_graph}>
					<ScoreTrendChart trend={trend} data={graphData} source="modal" />
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ScoreTrendModal;
