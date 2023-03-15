import { ButtonIcon } from '@cogoport/components';
import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useDeleteKamLevel from '../../../../../hooks/useDeleteKamLevel';

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
		dataLength,
		refetch = () => {},
	} = props;

	const {
		transition_level = '',
		expertise_details = [],
	} = data;

	const { onDelete, deleteLoading } = useDeleteKamLevel({ refetch, transition_level });

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
						{/* !to do  */}
						{dataLength === id + 1
							? (
								<div className={styles.delete_button}>
									{deleteLoading ? (
										<ButtonIcon
											size="lg"
											icon={(
												<IcMDelete
													style={{ opacity: '0.4', PointerEvent: 'none' }}
													onClick={(event) => {
														event.stopPropagation();
													}}
												/>
											)}
											themeType="primary"
										/>
									) : (
										<ButtonIcon
											size="lg"
											icon={(
												<IcMDelete
													onClick={(event) => {
														event.stopPropagation();
														onDelete();
													}}
												/>
											)}
											themeType="primary"
										/>
									)}

								</div>
							)
							: (null)}
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
