import { MultiSelect, Button } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function CourseName() {
	const [value, onChange] = useState([]);
	const options = [
		{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
		{ label: 'Lev Tolstoy', value: 'War and Peace' },
	];
	return (
		<div className={styles.container}>
			<div className={styles.title}>Which topics of knowledge will you cover in the Course?</div>
			<div className={styles.tag_line}>
				Don’t worry, you can change that later. We just need a name for creation
			</div>
			<div className={styles.input_container}>
				<MultiSelect
					value={value}
					onChange={onChange}
					placeholder="Select topics"
					options={options}
					isClearable
					// style={{ width: '350px' }}
				/>
			</div>
			<div className={styles.footer}>
				<Button size="md" themeType="secondary">Previous</Button>
				<Button size="md" themeType="primary">Create Course</Button>
			</div>
		</div>
	);
}

export default CourseName;
