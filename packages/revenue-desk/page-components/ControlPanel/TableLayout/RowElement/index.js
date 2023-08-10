import { Select } from '@cogoport/components';

import styles from './styles.module.css';

function RowElement() {
	const options = [
		{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
		{ label: 'Lev Tolstoy', value: 'War and Peace' },
		{ label: 'Fyodor Dostoyevsy', value: 'The Idiot' },
		{ label: 'Oscar Wilde', value: 'A Picture of Dorian Gray' },
		{ label: 'George Orwell', value: '1984' },
		{ label: 'Jane Austen', value: 'Pride and Prejudice' },
		{ label: 'Marcus Aurelius', value: 'Meditations' },
		{ label: 'Fyodor Dostoevsky', value: 'The Brothers Karamazov' },
		{ label: 'Lev Tolstoy', value: 'Anna Karenina' },
		{ label: 'Fyodor Dostoevsky', value: 'Crime and Punishment' },
	];
	return (
		<div className={styles.row}>
			<div className={styles.variables}>
				Preferred Shipping Line
			</div>
			<div className={styles.current_weightage}>
				40%
			</div>
			<div className={styles.edit_weightage}>
				<Select
					placeholder="Select Books"
					options={options}
					size="sm"
					style={{ width: '250px' }}
				/>
			</div>
		</div>
	);
}
export default RowElement;
