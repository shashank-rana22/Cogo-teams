import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div>
			{[1, 2].map((item) => (
				<div key={item} className={styles.container}>
					<div className={styles.card_header}>
						<Placeholder width="150px" height="24px" />
					</div>

					<div className={styles.cards}>
						{[1, 2, 3, 4].map((e) => (
							<div key={e} className={styles.card_container}>

								<Placeholder width="120px" height="24px" margin="0px 0px 24px 0px" />

								<div className={styles.bottom_container}>
									{[1, 2].map((i) => (
										<div key={i}>
											<Placeholder width="40px" />
											<Placeholder widht="10px" margin="8px 0px 0px 0px" />
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default LoadingState;
