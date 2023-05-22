import { Datepicker } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function TimelineItem({ item, isLast, edit, nav }) {
	const [date, setDate] = useState();

	return (
		<div className={styles.container}>

			<div className={styles.sub_container}>
				<div className={styles.circle} />

				{isLast ? null : <div className={styles.line} />}
			</div>

			<div className={styles.label}>
				{item.title}
			</div>

			<div className={styles.date}>
				{new Date().toDateString().slice(4, 11)}
			</div>

			{edit && nav === 'cutoff_details' ? (
				<div className={styles.date_picker}>
					<Datepicker
						placeholder="date"
						dateFormat="dd MMM"
						name={item.name}
						value={date}
						onChange={setDate}
					/>
				</div>
			) : null}

		</div>
	);
}

export default TimelineItem;
