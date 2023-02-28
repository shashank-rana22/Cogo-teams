import { Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import GetCard from '../../CreateBadge/getCard';

import styles from './styles.module.css';

function MasteryCard({ img_url = '' }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.badge_icon}>
					<img src={img_url} alt="badge-icon" />
				</div>
				<div className={styles.badge_header}>
					<IcMEdit onClick={() => setOpenModal((pv) => !pv)} />
				</div>
			</div>
			{ openModal
						&& (
							<Modal
								size="md"
								show={openModal}
								onClose={() => setOpenModal((pv) => !pv)}
								placement="center"
							>
								<Modal.Body>
									<div style={{ padding: '10px' }}>
										<GetCard
											medalType="Mastery"
											inputPlaceHolder="score"
											isLastItem
										/>
									</div>
								</Modal.Body>
							</Modal>
						)}
		</>

	);
}

export default MasteryCard;
