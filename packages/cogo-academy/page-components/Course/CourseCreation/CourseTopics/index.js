import { MultiSelect, Button } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function CourseTopics() {
	const [value, onChange] = useState([]);
	const options = [
		{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
		{ label: 'Lev Tolstoy', value: 'War and Peace' },
	];

	return (
		<div className={styles.container}>
			<div className={styles.title}>Which Category does your Course belong to?</div>

			<div className={styles.tag_line}>
				This will help users find your course during Consumption
			</div>

			<div className={styles.input_container}>
				<MultiSelect
					value={value}
					onChange={onChange}
					placeholder="Select topics"
					options={options}
					isClearable
				/>
			</div>

			<div className={styles.footer}>
				<div className={styles.prev_button}>
					<Button size="md" themeType="secondary">Previous</Button>
				</div>

				<div className={styles.create_button}>
					<Button size="md" themeType="primary">Create Course</Button>
				</div>
			</div>
		</div>
	);
}

export default CourseTopics;
