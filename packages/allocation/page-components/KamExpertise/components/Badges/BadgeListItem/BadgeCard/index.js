import { Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useBadgeConfigurationAttributes from '../../../../hooks/useBadgeConfigurationAttributes';
import GetCard from '../../CreateBadge/getCard';

import styles from './styles.module.css';

function BadgeCard({ data, medal = '', isLast = {} }) {
	const { score = '', image_url = '', id = '' } = data;

	const {
		onSingleBadgeUpdate, loading, formProps,
	} = useBadgeConfigurationAttributes();

	const {
		control, handleSubmit, formState: { errors }, watch,
	} = formProps;

	const [openModal, setOpenModal] = useState(false);

	const badgeData = {
		medalType: medal,
		score,
	};

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			Bronze_value = '',
			Bronze_img_value = '',
			Silver_value = '',
			Silver_img_value = '',
			Gold_value = '',
			Gold_img_value = '',

		} = formValues || {};

		let medal_score = '';
		let medal_img = '';

		if (medal === 'Bronze') {
			medal_score = Bronze_value;
			medal_img = Bronze_img_value;
		} else if (medal === 'Silver') {
			medal_score = Silver_value;
			medal_img = Silver_img_value;
		} else {
			medal_score = Gold_value;
			medal_img = Gold_img_value;
		}

		const payload_data = {
			id,
			medal,
			image_url : medal_img || image_url,
			score     : medal_score || score,

		};
		await onSingleBadgeUpdate(payload_data);
		setOpenModal((pv) => !pv);
	};

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
					<span>
						<IcMEdit onClick={() => setOpenModal((pv) => !pv)} />
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
								onClose={() => setOpenModal((pv) => !pv)}
								placement="center"
								className={styles.modal_class}
							>
								<form onSubmit={handleSubmit(onSave)}>
									<Modal.Body>
										<div style={{ padding: '10px' }}>
											<GetCard
												data={badgeData}
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
