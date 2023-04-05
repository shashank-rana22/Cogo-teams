import React from 'react';

import Loader from '../../utils/loader';

import styles from './styles.module.css';

export function CardLoader() {
	return (
		<>
			{[...Array(4)].map(() => (
				<div>
					<div className={styles.card_wrapper}>
						<Loader count={3} />
					</div>
				</div>
			))}
		</>
	);
}

function LoadingPage() {
	return (
		<div className={styles.card_wrapper}>
			<div>
				<div>
					<Loader />
				</div>
				<div>
					<Loader count={3} />
				</div>
			</div>
			<div>
				<div>
					<Loader count={1} />
				</div>

				<CardLoader />
			</div>
		</div>
	);
}

export default LoadingPage;
