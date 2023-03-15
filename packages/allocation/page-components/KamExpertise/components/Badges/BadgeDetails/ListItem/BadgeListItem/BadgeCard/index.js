import { Modal, Placeholder } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdateSingleBadge from '../../../../../../hooks/useBadgeConfigurationAttributes';
import GetCard from '../../../../CreateBadge/BadgeCard/getCard';

import styles from './styles.module.css';

function BadgeCard({ data, badgeListData = {}, medal = '', isLast = {}, listRefetch }) {
	const { score = '', image_url = '', id = '' } = data;

	const [openModal, setOpenModal] = useState(false);

	const onClose = () => {
		setOpenModal((pv) => !pv);
	};

	const {
		onSave, loading, formProps,
	} = useUpdateSingleBadge({ medal, id, image_url, score, onClose, listRefetch });

	const {
		control, handleSubmit, watch,
	} = formProps;

	const badgeData = {
		medalType: medal,
		score,
	};
	if (loading) {
		return (
			<Placeholder
				height="120px"
				width="220px"
				style={{ marginRight: '20px', marginTop: '20px' }}
			/>
		);
	}

	return (
		<>
			{' '}
			<div className={isLast ? styles.badge_card_right : styles.badge_card_left}>
				<div className={styles.badge_header}>
					<span>
						{medal}
						{' '}
						:
						<b>
							{' '}
							{score}
							{' '}
							Score
						</b>
					</span>
					<span style={{ cursor: 'pointer' }}>
						<IcMEdit onClick={onClose} />
					</span>
				</div>
				<div className={styles.badge_icon}>
					<img src={image_url} alt="badge-icon" />
				</div>
			</div>
			{ openModal
			&& (
				<Modal
					size="sm"
					show={openModal}
					onClose={onClose}
					placement="center"
					className={styles.modal_class}
				>
					<form onSubmit={handleSubmit(onSave)}>
						<Modal.Body className={styles.modal_body}>
							<div style={{ padding: '10px', margin: '10px' }}>
								<GetCard
									data={badgeData}
									badgeListData={badgeListData}
									watch={watch}
									control={control}
									isLastItem
								/>
							</div>
						</Modal.Body>
					</form>
				</Modal>
			)}
		</>

	);
}

export default BadgeCard;
