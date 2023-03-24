import { Modal, Button, ButtonIcon } from '@cogoport/components';
import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useDeleteKamLevel from '../../../../../../hooks/useDeleteKamLevel';

import styles from './styles.module.css';

const COLUMN_MAPPING = [
	{
		label: 'Customer Expertise',
	},
	{
		label: 'Trade Expertise',
	},
	{
		label: 'Commodity Expertise',
	},
	{
		label: 'Misc Expertise',
	},
];

function KamLevelCard(props) {
	const {
		activeCard = '',
		data = {},
		id = '',
		refetch = () => {},
		isLastCard = false,
		cardRefetch,
	} = props;
	const [showModal, setShowModal] = useState(false);

	const {
		transition_level = '',
		expertise_details = [],
	} = data;

	const { onDelete, deleteLoading } = useDeleteKamLevel({ refetch, transition_level, cardRefetch });

	const expertiseObject = expertise_details.map((item) => item);

	return (
		(
			<div className={styles.whole}>
				<div className={styles.card_container}>
					<div className={styles.text}>
						<div style={{ marginRight: '8px' }}>KAM</div>
						<b>
							{transition_level - 1}
						</b>
						<IcMArrowNext className={styles.arrow} />
						<b>{transition_level}</b>
					</div>

					<div className={styles.button_container}>
						<div className={styles.delete_button}>

							<div>
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
						<Modal
							size="md"
							placement="center"
							show={showModal}
							onClose={() => setShowModal(false)}
						>
							<Modal.Header title="DELETE KAM LEVEL" />
							<Modal.Body>
								Are you sure you wish to permanently delete this KAM level?
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
									Cancel

								</Button>
								<Button
									loading={deleteLoading}
									onClick={(e) => {
										e.stopPropagation();
										onDelete();
									}}
									themeType="primary"
								>
									Yes
								</Button>
							</Modal.Footer>
						</Modal>

					</div>
				</div>
				{
			activeCard === id
				? (
					<div className={styles.title_show}>
						To level up from KAM
						{' '}
						{transition_level - 1}
						{' '}
						TO KAM
						{' '}
						{transition_level}
						, A KAM needs to fulfill all of the following criteria
						as defined -
					</div>
				)
				: (
					<div className={styles.score_container}>
						{COLUMN_MAPPING.map((item) => (
							<div className={styles.list_item}>
								<div className={styles.label_text}>
									{startCase(item.label)}
									{' '}
									Score
								</div>
								<div style={{ fontWeight: '700' }}>
									{expertiseObject.find((expertise) => expertise.expertise_type
									=== item.label)?.threshold_score?.toLocaleString('en-IN') || '-'}
								</div>
							</div>
						))}
					</div>
				)
}
			</div>
		)

	);
}
export default KamLevelCard;
