import Loader from '../Loader';

import styles from './styles.module.css';

function RevenueLoader({ count }) {
	return (
		<>
			{[...Array(count)].map(() => (
				<div className={styles.row_load}>
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
