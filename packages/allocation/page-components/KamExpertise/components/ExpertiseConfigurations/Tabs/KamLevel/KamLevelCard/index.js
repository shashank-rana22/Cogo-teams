import { Button } from '@cogoport/components';
import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function KamLevelCard({
	title = '',
	setAction = () => {},
	data = {},
	id = '',
	dataLength = -1,
}) {
	const [editItem, setEditItem] = useState(true);
	const {
		transition_level,
		expertise_details = [],
	} = data;

	const expertiseObject = expertise_details.map((item) => item);
	console.log('hihi', expertiseObject);

	// const COLUMN_MAPPING = [
	// 	{
	// 		label : 'customer_expertise_score',
	// 		value : customer_expertise_score,
	// 	},
	// 	{
	// 		label : 'trade_expertise_score',
	// 		value : trade_expertise_score,
	// 	},
	// 	{
	// 		label : 'commodity_expertise_score',
	// 		value : commodity_expertise_score,
	// 	},
	// 	{
	// 		label : 'misc_expertise_score',
	// 		value : misc_expertise_score,
	// 	},

	// ];

	// console.log('LENGHT', dataLength);
	// console.log('ID', id);
	return (
		<div className={styles.whole}>
			<div style={{
				width          : '100%',
				display        : 'flex',
				justifyContent : 'space-between',
				alignItems     : 'center',
			}}
			>
				<div className={styles.text}>
					<div style={{ marginRight: '8px' }}>KAM</div>
					<b>
						{transition_level - 1}
					</b>
					<IcMArrowNext className={styles.arrow} />
					<b>{transition_level}</b>
				</div>

				<div className={styles.button_container}>
					{editItem ? (
						<Button
							themeType="secondary"
							className={styles.delete_button}
							onClick={(e) => {
								if (title) {
									e.stopPropagation();
								}

								setEditItem((pv) => (!pv));

								setAction('edit');
							}}
						>
							Edit

						</Button>
					) : (
						<Button
							className={styles.delete_button}
							themeType="secondary"
							style={{ marginRight: '0' }}
							onClick={(e) => {
								e.stopPropagation();
								setEditItem((pv) => (!pv));
								setAction('show');
							}}
						>
							Cancel
						</Button>
					)}

					{dataLength === id - 1
						? (
							<div className={styles.delete_button}>
								<IcMDelete onClick={(event) => {
									console.log('ffgg', event);
									event.stopPropagation();
								}}
								/>
							</div>
						)
						: (
							// <div className={styles.delete_button_disable}>
							// 	<IcMDelete />
							// </div>
							null
						)}
					{!editItem
						? (
							<Button
								className={styles.delete_button}
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								{' '}
								Save
							</Button>

						)
						: (
							null
						)}

				</div>

			</div>
			{ title === id
				? (
					<div className={styles.title_show}>
						To level up from KAM 1 TO KAM 2, A KAM needs to fulfill all of the following criteria
						as defined -
					</div>
				)
				: (
					<div className={styles.score_container}>
						{expertiseObject.map((item) => (
							<div className={styles.list_item}>
								<div className={styles.label_text}>
									{startCase(item.expertise_type)}
								</div>
								<div><b>{item.threshold_score}</b></div>
							</div>
						))}

					</div>
				)}

		</div>
	);
}

export default KamLevelCard;
