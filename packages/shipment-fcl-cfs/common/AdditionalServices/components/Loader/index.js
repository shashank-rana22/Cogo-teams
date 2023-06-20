import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADER_COUNT_FOR_CARD = 4;

export default function Loader() {
	return (
		<div className={styles.container}>
			{[...Array(LOADER_COUNT_FOR_CARD).keys()].map((key) => (
				<Placeholder height="80px" key={key} />
			))}
		</div>
	);
}
