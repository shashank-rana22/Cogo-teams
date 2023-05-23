import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Loader from '../Loader';

import styles from './styles.module.css';

export function CardLoader() {
	return (
		<>
			{[...Array(4)].map(() => (
				<div key={uuidv4()}>
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
