import { Placeholder } from '@cogoport/components';

import VerticleLine from '../CheckList/VerticleLine';

import styles from './styles.module.css';

const TOTAL_ITERATIONS = 6;
const keys = Array(TOTAL_ITERATIONS).fill(null).map(() => Math.random());
const LAST_IDX = 5;

const LoadingState = () => [...Array(TOTAL_ITERATIONS)].map((v, idx) => (
	<div className={styles.single_item} key={keys?.[idx]}>
		<VerticleLine isLast={idx === LAST_IDX} />

		<div className={styles.main}>
			<div className={styles.heading}>
				<Placeholder className={styles.loader} />
			</div>

			<div className={styles.gap}>
				<Placeholder className={styles.loader} />
			</div>
		</div>

		<div className={styles.sub_container}>
			<Placeholder />
		</div>
	</div>
));

export default LoadingState;
