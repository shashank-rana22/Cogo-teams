import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
// import React, { useState } from 'react';

// import useUpdateKamScores from '../../../../../hooks/useUpdateKamScores';

import styles from './styles.module.css';

function KamLevelCard({
	title = '',
	// setAction = () => {},
	data = {},
	id = '',
	dataLength = -1,
	// refetch = () => {},
	// setTitle = () => {},
}) {
	const {
		transition_level = '',
		expertise_details = [],
	} = data;

	// const { handleSubmit } = formProps;
	const expertiseObject = expertise_details.map((item) => item);

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

					{dataLength === data.transition_level - 1
						? (
							<div className={styles.delete_button}>
								<IcMDelete onClick={(event) => {
									event.stopPropagation();
								}}
								/>
							</div>
						)
						: (
							null
						)}
					{/* {!showEditBtn
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
						)} */}
				</div>
			</div>
			{
			title === id + 1
				? (
					<div className={styles.title_show}>
						To level up from KAM 1 TO KAM 2, A KAM needs to fulfill all of the following criteria
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
									=== item.label)?.threshold_score || '-'}
								</div>
							</div>
						))}
					</div>
				)
}
		</div>
	);
}
export default KamLevelCard;
