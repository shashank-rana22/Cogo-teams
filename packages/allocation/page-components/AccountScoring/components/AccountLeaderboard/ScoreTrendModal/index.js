import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ScoreTrendChart from '../../../common/ScoreTrendChart';

function ScoreTrendModal(props) {
	const { showTrendIds, setScoreTrendIds } = props;

	if (isEmpty(showTrendIds)) {
		return null;
	}

	return (
		<Modal
			size="lg"
			show={!isEmpty(showTrendIds)}
			onClose={() => setScoreTrendIds({})}
			closeOnOuterClick
			showCloseIcon
			animate
		>
			<Modal.Header title="Engagement Score percentile vs time" />

			<Modal.Body>
				<ScoreTrendChart />
			</Modal.Body>
		</Modal>
	);
}

export default ScoreTrendModal;
