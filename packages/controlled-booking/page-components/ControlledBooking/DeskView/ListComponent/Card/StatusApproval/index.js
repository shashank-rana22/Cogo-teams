import { Textarea, Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useStateUpdate from '../../../../../../hooks/useStateUpdate';

import styles from './styles.module.css';

const MAPPING = {
	rejected : 'Reject',
	approved : 'Approve',
};

function StatusApproval({ item, refetchBookingList }) {
	const [showModal, setShowModal] = useState(false);
	const [value, onChange] = useState('');

	const { updateState = () => {},loading } = useStateUpdate({ id: item?.id, refetchBookingList, setShowModal });

	console.log('value', value);

	return (
		<div className={styles.container}>

			<div className={styles.button}>
				<Button size="sm" themeType="secondary" disbaled={loading} onClick={() => setShowModal('rejected')}>
					Reject
				</Button>
			</div>

			<Button size="sm" themeType="primary" 	disbaled={loading} onClick={() => setShowModal('approved')}>
				Approve
			</Button>

			{showModal ? (
				<Modal
					show={showModal}
					placement="center"
					closeOnOuterClick={false}
					onClose={() => setShowModal(false)
					className={styles.modal}
				>
					<Modal.Header title={`Are you Sure You wanna ${MAPPING[showModal]}?`} />

					<Modal.Body className={styles.preview_modal_body}>
						{showModal === 'rejected' ? (
							<>
								<div className={styles.rejection}>
									Rejection Reason
								</div>

								<Textarea
									name="rejection_reject"
									value={value}
									onChange={(e) => onChange(e)}
									rows={4}
									placeholder="Please input your Rejection Reason and we
					             will try working to make this feature better for you."
								/>
							</>
						) : null}

					</Modal.Body>

					<Modal.Footer>

						<div className={styles.button}>
							<Button size="sm" themeType="secondary" disbaled={loading} onClick={() => setShowModal(false)}>
								cancel
							</Button>
						</div>

						<Button
							size="sm"
							themeType="primary"
							disbaled={loading}
							onClick={() => {
								updateState({ rejection_reason: value, state: showModal });
							}}
						>
							{MAPPING[showModal]}
						</Button>

					</Modal.Footer>

				</Modal>
			) : null}

		</div>

	);
}

export default StatusApproval;
