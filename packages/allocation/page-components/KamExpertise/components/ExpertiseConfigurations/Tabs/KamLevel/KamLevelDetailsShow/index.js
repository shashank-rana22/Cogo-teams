import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

// import { controls } from '../ControlsForScore/controls';
import { Column_bottom_mapping } from '../Column_bottom_mapping';
import { Column_mapping } from '../Column_mapping';

import styles from './styles.module.css';

function KamLevelDetailsShow({ data }) {
	return (
		<div className={styles.level_card_container}>

			{Column_mapping.map((item) => (
				<div>
					<div className={styles.row_level}>{startCase(item.label)}</div>
					<div style={{ marginLeft: '12px', opacity: '0.7' }}>Score</div>
					<div className={styles.score_value}>
						{getByKey(data, item.label, '___')}
					</div>
					<div style={{
						border     : '1px solid #BDBDBD',
						opacity    : '0.4',
						width      : '98%',
						marginLeft : '12px',

					}}
					/>

				</div>
			))}

			<div className={styles.row_level_end}>
				<h2>Transacting Account</h2>
				<div className={styles.row_level_end_options}>

					{Column_bottom_mapping.map((item) => (
						<div style={{ width: '24%' }}>
							<div>{startCase(item.label)}</div>
							<div className={styles.score_value}>
								{getByKey(data, item.label, '--')}

							</div>

						</div>

					))}

				</div>

			</div>

		</div>

	);
}

export default KamLevelDetailsShow;
