import { v4 as uuidv4 } from 'uuid';

import Loader from '../Loader';

import styles from './styles.module.css';

function RevenueLoader({ count }) {
	return (
		<>
			{[...Array(count)].map(() => (
				<div key={uuidv4()} className={styles.row_load}>
					<div>
						<div className={styles.load}>
							<Loader count={2} />
						</div>
						<Loader count={5} />
					</div>
					<div>
						<Loader count={8} />
					</div>
				</div>
			))}
		</>
	);
}

export default RevenueLoader;
