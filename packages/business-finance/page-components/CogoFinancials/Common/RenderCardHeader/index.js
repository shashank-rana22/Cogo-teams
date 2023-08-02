import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function RenderCardHeader({
	title = '',
	showInfo = false,
	showBack = false,
	onBack = () => {},
}) {
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
						{title}
					</div>
					<div className={styles.bottom_line} />

				</div>
				{showInfo && <div className={styles.info}><IcMInfo /></div>}
			</div>

		</div>
	);
}

export default RenderCardHeader;
