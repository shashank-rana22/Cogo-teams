import { Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useBadgeConfigurationAttributes from '../../../../hooks/useBadgeConfigurationAttributes';
import GetCard from '../../CreateBadge/getCard';

import styles from './styles.module.css';

function BadgeCard({ medalType = '', score = '', img_url = '', isLast = {} }) {
	const {
		onCheckPublish, loading, formProps,
	} = useBadgeConfigurationAttributes();
	const {
		control, handleSubmit, formState: { errors }, watch,
	} = formProps;
	console.log('watching', watch());
	const [openModal, setOpenModal] = useState(false);
	const badgeData = {
		medalType,
		inputPlaceHolder: score,
	};

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
								size="sm"
								show={openModal}
								onClose={() => setOpenModal((pv) => !pv)}
								placement="center"
								className={styles.modal_class}
							>
								<Modal.Body>
									<div style={{ padding: '10px' }}>
										<GetCard
											data={badgeData}
											control={control}
											isLastItem
											isBadgeEdit
										/>
									</div>
								</Modal.Body>
							</Modal>
						)}
		</>

	);
}

export default BadgeCard;
