import { Modal, CheckboxGroup, Button, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { DISLIKE_OPTIONS } from '../../../../../../constants';

import styles from './styles.module.css';

function DislikeModal({ setShow, show, onClickLikeDislikeButton = () => {}, modalLoading = false }) {
	const [reason, setReason] = useState([]);
	const [remarks, setRemarks] = useState('');

	const emptyCheck = isEmpty(reason) || isEmpty(remarks);

	const remarkSubmit = () => {
		onClickLikeDislikeButton({ type: 'dislike_remark', reason, remarks });
	};

	return (
		<Modal
			size="sm"
			show={show}
			onClose={() => setShow(false)}
			onOuterClick={() => setShow(false)}
			placement="top"
		>
			<Modal.Header title="Provide the reason for your dislike" />

			<div className={styles.container}>
				<CheckboxGroup
					options={DISLIKE_OPTIONS}
					onChange={setReason}
					value={reason}
					className={styles.check_box}
				/>

				<div className={styles.remarks}>
					Remarks
				</div>

				<Input
					size="sm"
					placeholder="Enter your remark here"
					value={remarks}
					onChange={(val) => setRemarks(val)}
					className={styles.input_container}
				/>

				<Button
					loading={modalLoading}
					disabled={emptyCheck}
					size="md"
					themeType="accent"
					onClick={remarkSubmit}
					className={styles.submit_button}
				>
					Submit

				</Button>
			</div>
		</Modal>
	);
}

export default DislikeModal;
