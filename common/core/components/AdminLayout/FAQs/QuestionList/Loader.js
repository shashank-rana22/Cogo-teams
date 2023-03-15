import { Skeleton } from '@cogoport/front/components/admin';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Loader({ topic = {} }) {
	return (
		<div className={styles.container}>
			<div style={{ fontWeight: '600', marginBottom: 16, marginTop: 18, marginLeft: 24 }}>
				Topic:
				{' '}
				{startCase(topic.display_name) || 'Search Result'}
			</div>

			<div className={styles.list}>
				{[...Array(6)].map(() => (
					<div>
						<div
							className={styles.question}
							style={{ cursor: 'not-allowed' }}
						>
							<div style={{
								marginLeft     : '20px',
								marginRight    : '15px',
								paddingTop     : '15px',
								alignItems     : 'center',
								display        : 'flex',
								justifyContent : 'space-between',
							}}
							>
								<Skeleton
									width="90%"
									height="20px"
									style={{ borderRadius: 4 }}
								/>
							</div>

							<div
								style={{
									margin  : '8px 15px 3px 20px',
									display : 'flex',
								}}
							>
								{[...Array(3)].map(() => (
									<Skeleton
										width="60px"
										height="16px"
										margin="4px 12px 0 0"
										style={{ borderRadius: 6 }}
									/>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Loader;
