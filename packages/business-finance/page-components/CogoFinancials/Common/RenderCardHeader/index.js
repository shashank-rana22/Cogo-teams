import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const FIRST_LETTER = GLOBAL_CONSTANTS.zeroth_index;
const SECOND_LETTER = 1;

function RenderCardHeader({
	title = '',
	showInfo = false,
	showBack = false,
	onBack = () => {},
}) {
	const capitalizedTitle = title.charAt(FIRST_LETTER).toUpperCase()
	+ title.slice(SECOND_LETTER).toLowerCase();

	return (
		<div>
			<div className={styles.header}>
				{showBack && (
					<div>
						<IcMArrowBack
							onClick={onBack}
							className={styles.back}
						/>
					</div>
				)}
				<div>
					<div>
						{capitalizedTitle || ''}
					</div>
					<div className={styles.bottom_line} />

				</div>
				{showInfo && <div className={styles.info}><IcMInfo /></div>}
			</div>

		</div>
	);
}

export default RenderCardHeader;
