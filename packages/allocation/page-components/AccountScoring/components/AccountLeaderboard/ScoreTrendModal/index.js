import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetEngagementScoringGraphStats from '../../../hooks/useGetEngagementScoringGraphStats';

function ScoreTrendModal(props) {
	const { scoreTrendIds, setScoreTrendIds } = props;

	const { data } = useGetEngagementScoringGraphStats({ scoreTrendIds });

	console.log('data :: ', data);

	return (
		<Modal
			size="lg"
			show={!isEmpty(scoreTrendIds)}
			onClose={() => setScoreTrendIds({})}
			closeOnOuterClick
			showCloseIcon
			animate
		>
			<Modal.Header title="Engagement Score percentile vs time" />

			<Modal.Body>
				<p>Hello</p>
			</Modal.Body>
		</Modal>
	);
}

export default ScoreTrendModal;
