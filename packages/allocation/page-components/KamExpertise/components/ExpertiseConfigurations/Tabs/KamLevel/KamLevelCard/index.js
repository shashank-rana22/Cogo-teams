import { Modal, Button, ButtonIcon } from '@cogoport/components';
import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useDeleteKamLevel from '../../../../../hooks/useDeleteKamLevel';

import styles from './styles.module.css';

const COLUMN_MAPPING = ['customer_expertise', 'trade_expertise', 'commodity_expertise', 'misc_expertise'];

const FIRST_INDEX = 1;

function KamLevelCard(props) {
	const { t } = useTranslation(['allocation']);

	const {
		data = {},
		isActiveCard,
		refetch = () => {},
		isLastCard = false,
		cardRefetch,
	} = props;

	const [showModal, setShowModal] = useState(false);

	const {
		transition_level = '',
		expertise_details = [],
	} = data;

	const { onDelete, deleteLoading } = useDeleteKamLevel({ refetch, transition_level, cardRefetch, t });

	return (
		<div className={styles.whole}>
			<div className={styles.card_container}>
				<div className={styles.text}>
					<div style={{ marginRight: '8px' }}>{t('allocation:kam')}</div>

					<b>{transition_level - FIRST_INDEX}</b>

					<IcMArrowNext className={styles.arrow} />

					<b>{transition_level}</b>
				</div>

				<div className={styles.button_container}>
					<ButtonIcon
						size="lg"
						onClick={(event) => {
							event.stopPropagation();
							setShowModal(true);
						}}
						icon={(
							<IcMDelete />
						)}
						disabled={!isLastCard}
					/>
				</div>
			</div>

			{isActiveCard
				? (
					<div className={styles.title_show}>
						{t('allocation:to_level_up_from_kam')}
						{' '}
						{transition_level - FIRST_INDEX}
						{' '}
						{t('allocation:to_kam_label')}
						{' '}
						{transition_level}
						{t('allocation:kam_needs_to_fulfill_the_following_criteria')}
					</div>
				)
				: (
					<div className={styles.score_container}>
						{COLUMN_MAPPING.map((item) => (
							<div key={item} className={styles.list_item}>
								<div className={styles.label_text}>
									{startCase(item)}
									{' '}
									{t('allocation:score_label')}
								</div>

								<div style={{ fontWeight: '700' }}>
									{expertise_details.find((expertise) => expertise.expertise_type
									=== item)?.threshold_score?.toLocaleString('en-IN') || '-'}
								</div>
							</div>
						))}
					</div>
				)}
			<Modal
				size="md"
				placement="center"
				show={showModal}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header title={t('allocation:delete_kam_level')} />

				<Modal.Body>
					{t('allocation:delete_kam_level_phrase')}
				</Modal.Body>

				<Modal.Footer>
					<Button
						style={{ marginRight: '6px' }}
						themeType="tertiary"
						onClick={(e) => {
							setShowModal(false);
							e.stopPropagation();
						}}
					>
						{t('allocation:cancel_button')}
					</Button>

					<Button
						loading={deleteLoading}
						onClick={(e) => {
							e.stopPropagation();
							onDelete();
						}}
						themeType="primary"
					>
						{t('allocation:yes_label')}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default KamLevelCard;
