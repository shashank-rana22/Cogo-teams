import HEADINGS from '../../../config/tableHeadings.json';

import styles from './styles.module.css';

export default function ListHeader() {
	return (
		<thead className={styles.table_header}>
			{HEADINGS.map((heading) => (
				<th
					key={heading.header}
					style={{ width: `${(heading.span / HEADINGS.length) * 100}%` }}
				>
					{heading.header}
				</th>
			))}
		</thead>
	);
}
