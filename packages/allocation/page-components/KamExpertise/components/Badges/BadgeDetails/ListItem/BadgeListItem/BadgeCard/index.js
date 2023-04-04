import { Modal, Placeholder } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import useUpdateSingleBadge from '../../../../../../hooks/useBadgeConfigurationAttributes';
import BadgeUpdateCard from '../../../../BadgeUpdateCard';

import styles from './styles.module.css';

function BadgeCard(props) {
	const { badgeItemData = {}, medal, isLast, listRefetch, data } = props;
	const { score, image_url = '', id = '' } = data || {};

	const {
		onSave, loading, formProps, openModal, onClose,
	} = useUpdateSingleBadge({ medal, id, image_url, score, listRefetch });

	const {
		control, handleSubmit, watch,
	} = formProps;

	if (loading) {
		return (
			<Placeholder
				height="120px"
				width="220px"
				margin="20px 20px 0px 0px"
			/>
		);
	}

	return (
		<>
			<div className={isLast ? styles.badge_card_right : styles.badge_card_left}>
				<div className={styles.badge_header}>
					<div className={styles.header_score}>
						<div>
							{medal}
							{' '}
							:
							{' '}
						</div>

						<div className={styles.score}>
							{score || '_'}
							{' '}
							Score
						</div>
					</div>

					<span className={styles.svg_container}>
						<IcMEdit onClick={onClose} />
					</span>
				</div>
				<div className={styles.badge_icon}>
					<img src={image_url} alt="badge-icon" />
				</div>
			</div>

			{openModal
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
							<div className={styles.badge_update}>
								<BadgeUpdateCard
									medalType={medal}
									badgeItemData={badgeItemData}
									watch={watch}
									control={control}
									isLastItem
									isSingleBadgeEdit
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
