import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const THREE = 3;
function Loading({ home = false }) {
	return [...Array(THREE).keys()].map((index) => (
		<div className={home ? styles.box : styles.container} key={index}>
			<Placeholder
				height="165px"
				width={home ? '670px' : '1000px'}
				className={styles.card}
			/>
			{home && (
				<Placeholder
					height="165px"
					width="670px"
					className={styles.card}
				/>
			)}

		</div>
	));
}
export default Loading;
