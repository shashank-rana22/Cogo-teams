import { Button, Modal, Input, Textarea, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import useUpdateOrganizationEvaluationTask from '../hooks/useUpdateOrganizationEvaluationTask';

import styles from './styles.module.css';

function ScoreModal({ t, show = null, setShow, getOrganizationEvaluationDetails }) {
	const ZERO = GLOBAL_CONSTANTS.zeroth_index;
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

	const checkScore = (value) => {
		if (value <= show?.total_score) {
			setYourScore(value);
		} else { Toast.error(t('supplier_page_supplier_evaluation_table_score_limit')); }
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
						<div className={styles.header}>
							{t('supplier_page_supplier_evaluation_table_shipping_lines')}
						</div>
						<div className={styles.maximum_score}>
							{t('supplier_page_supplier_evaluation_table_maximum_score')}
							{' '}
							<span style={{ color: '#221F20' }}>{show?.total_score}</span>
						</div>
						<div className={styles.input_score}>
							{t('supplier_page_supplier_evaluation_table_your_score')}
							<Input
								size="sm"
								value={yourScore}
								onChange={(value) => {
									checkScore(value);
								}}
								style={{ width: '132px', height: '32 px' }}
								placeholder={t('supplier_page_supplier_evaluation_table_score_placeholder')}
							/>
						</div>
						<div className={styles.reason_main}>
							{t('supplier_page_supplier_evaluation_table_reason')}
							<Textarea
								onChange={(value) => { setReason(value); }}
								className={styles.reason}
								name="a4"
								size="md"
								defaultValue={show?.feedback}
								placeholder=""
							/>

						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => { updateOrganizationEvaluationTask(); }}>
						{t('supplier_page_supplier_evaluation_table_ok')}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default ScoreModal;
