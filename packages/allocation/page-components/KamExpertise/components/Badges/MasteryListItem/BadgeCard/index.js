import { Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useCreateBadgeConfiguration from '../../../../hooks/useCreateBadgeConfiguration';
import GetCard from '../../CreateBadge/getCard';

import styles from './styles.module.css';

function BadgeCard({ medalType = '', score = '', img_url = '', isLast = {} }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			{' '}
			<div className={isLast ? styles.badge_card_right : styles.badge_card_left}>
				<div className={styles.badge_header}>
					<span>
						{medalType}
						{' '}
						:
						<b>
							{' '}
							{score}
							{' '}
							Score
						</b>
					</span>
					<span>
						<IcMEdit onClick={() => setOpenModal((pv) => !pv)} />
					</span>
				</div>
				<div className={styles.badge_icon}>
					<img src={img_url} alt="badge-icon" />
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
											medalType={medalType}
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

export default BadgeCard;
