// import styles from './styles.module.css';
import { Select } from '@cogoport/components';

import styles from './styles.module.css';

function CategoryType() {
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
		<div className={styles.category_container}>
			<Select
		// value={value}
		// onChange={onChange}
				placeholder="Ticket Category"
				options={options}
				size="sm"
			/>
		</div>
	);
}

export default CategoryType;
