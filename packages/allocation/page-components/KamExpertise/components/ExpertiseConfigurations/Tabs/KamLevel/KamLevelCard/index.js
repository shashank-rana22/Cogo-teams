import { Button } from '@cogoport/components';
import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import { Column_mapping } from '../Column_mapping';

import styles from './styles.module.css';

function KamLevelCard({
	title = {},
	setEditItem,
	editItem,
	data,

}) {
	const { level, transition_level } = data;
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
						{level}
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
								e.stopPropagation();
								setEditItem((pv) => (!pv));
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
							}}
						>
							Cancel
						</Button>
					)}

					{editItem
						? (
							<div className={styles.delete_button}><IcMDelete /></div>
						)
						: (
							<>
								<div
									className={styles.delete_button}
									style={{ marginRight: '0' }}
								>
									<IcMDelete />

								</div>
								<Button
									className={styles.delete_button}
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									{' '}
									Save

								</Button>
							</>
						)}

				</div>

			</div>
			{ title
				? (
					<div className={styles.score_container}>
						{/* {score_data.map((item) => (
							<div className={styles.list_item}>
								<div key={item.label} className={styles.label_text}>{item.label}</div>
								<div key={item.score}><b>{item.score}</b></div>
							</div>
						))} */}
						{Column_mapping.map((item) => (
							<div className={styles.list_item}>
								<div className={styles.label_text}>{item.label}</div>
								<div><b>{getByKey(data, item.label, '--')}</b></div>
							</div>
						))}

					</div>
				)
				: (
					<div className={styles.title_show}>
						To level up from KAM 1 TO KAM 2, A KAM needs to fulfill all of the following criteria
						as defined -
					</div>
				)}

		</div>
	);
}

export default KamLevelCard;
