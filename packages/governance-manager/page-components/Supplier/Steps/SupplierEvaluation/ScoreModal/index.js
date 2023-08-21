import { Button, Modal, Input, Textarea, Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useUpdateOrganizationEvaluationTask from '../hooks/useUpdateOrganizationEvaluationTask';

import styles from './styles.module.css';

function ScoreModal({ show = null, setShow, getOrganizationEvaluationDetails }) {
	const ZERO = 0;
	const [yourScore, setYourScore] = useState(ZERO);
	const [reason, setReason] = useState('');

	const {
		updateOrganizationEvaluationTask,
	} = useUpdateOrganizationEvaluationTask({
		id: show?.id,
		yourScore,
		setShow,
		reason,
		getOrganizationEvaluationDetails,
	});

	const onClose = () => {
		setShow(null);
	};

	useEffect(() => {
		setYourScore(show?.score_received);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(show)]);

	return (
		<div style={{ padding: '20px' }}>

			<Modal size="md" show={show} onClose={onClose} placement="center">
				<Modal.Body>
					<div className={styles.parent}>
						<div className={styles.header}>Score on Strength With Shipping Lines</div>
						<div className={styles.maximum_score}>
							Maximum Score :&nbsp;
							<span style={{ color: '#221F20' }}>{show?.total_score}</span>
						</div>
						<div className={styles.input_score}>
							Your Score
							<Input
								size="sm"
								value={yourScore}
								onChange={(value) => {
									if (value <= show?.total_score) {
										setYourScore(value);
									} else { Toast.error('Score should be less than Total Score'); }
								}}
								style={{ width: '132px', height: '32 px' }}
								placeholder="Score"
							/>
						</div>
						<div className={styles.reason_main}>
							Reason
							<Textarea
								onChange={(value) => { setReason(value); }}
								className={styles.reason}
								name="a4"
								size="md"
								defaultValue=""
								placeholder=""
							/>

						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => { updateOrganizationEvaluationTask(); }}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default ScoreModal;
