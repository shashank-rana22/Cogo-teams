import { IcMFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

interface Props {
	active:string,
	timeline:string[]
}

function Timeline({ active, timeline = [] }:Props) {
	return (
		<div className={styles.container}>

			{timeline.map((item, index) => (
				<div className={styles.section}>
					<div className={styles.inner_div}>
						{item === active && <div className={styles.bordered_circle} />}
						{timeline.indexOf(item) > timeline.indexOf(active)
					&& <div className={styles.faded_circle} />}
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
									? styles.colored_line : styles.line}
							/>
						) : null}
					</div>

					<div
						className={timeline.indexOf(active) >= timeline.indexOf(item)
							? styles.timeline_item : styles.faded_text}
					>
						{item}
					</div>
				</div>
			))}
		</div>
	);
}

export default Timeline;
