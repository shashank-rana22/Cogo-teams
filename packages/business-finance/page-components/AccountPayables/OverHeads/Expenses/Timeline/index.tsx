import { IcMFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Timeline({ active, timeline = [] }) {
	return (
		<div className={styles.container}>

			{timeline.map((item, index) => (
				<div className={styles.section}>
					<div className={styles.innerDiv}>
						{item === active && <div className={styles.borderedCircle} />}
						{timeline.indexOf(item) > timeline.indexOf(active)
					&& <div className={styles.fadedCircle} />}
						{timeline.indexOf(item) < timeline.indexOf(active) && (
							<IcMFtick
								height={30}
								width={30}
								color="#ED3726"
								style={{ marginTop: '-4px' }}
							/>
						)}
						{index < timeline.length - 1 ? (
							<div
								className={timeline.indexOf(active) > timeline.indexOf(item)
									? styles.coloredLine : styles.line}
							/>
						) : null}
					</div>

					<div
						className={timeline.indexOf(active) >= timeline.indexOf(item)
							? styles.timelineItem : styles.fadedText}
					>
						{item}
					</div>
				</div>
			))}
		</div>
	);
}

export default Timeline;
