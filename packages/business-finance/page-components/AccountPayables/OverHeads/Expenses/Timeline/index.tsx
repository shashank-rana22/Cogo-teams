import { IcMFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Timeline({ active, timeline = [] }) {
	return (
		<div className={styles.container}>

			{timeline.map((item, index) => (
				<>
					{item === active && <div className={styles.borderedCircle} />}
					{timeline.indexOf(item) > timeline.indexOf(active) && <div className={styles.fadedCircle} />}
					{timeline.indexOf(item) < timeline.indexOf(active) && (
						<IcMFtick
							height={35}
							width={35}
							color="#ED3726"
						/>
					)}

					{index < timeline.length - 1 ? <div className={styles.line} /> : null}
				</>
			))}
		</div>
	);
}

export default Timeline;
