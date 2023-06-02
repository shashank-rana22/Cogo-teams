import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

export default function Loader() {
	return (
		<>
			{[1, 2, 3].map((item) => (
				<div className={styles.loadercontainer} key={item}>
					<Placeholder height="64px" />
				</div>
			))}
		</>

	);
}
