import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState({ columns, source = 'hr_dashboard' }) {
	const loadArr = [1, 2, 3, 4];
	const paddingSize = { hr_dashboard: '16px', manager_dashboard: '12px' };

	return (
		<div className={styles.loading_item}>
			{loadArr.map((i) => (
				<div className={styles.item_container} key={i} style={{ padding: paddingSize[source] }}>
					<div className={styles.user_info}>
						<Placeholder height="36px" width="160px" style={{ borderRadius: '4px' }} />
					</div>

					<div className={styles.column_map}>
						{columns.map((colDetails) => {
							const { key, label, flex } = colDetails;
							return (
								<div key={key} style={{ flex }}>
									{label ? <div className={styles.label}>{label}</div> : null}

									<div className={styles.value}>
										<Placeholder
											width="24px"
											height="24px"
											style={{ borderRadius: '4px' }}
										/>
									</div>
								</div>
							);
						})}
					</div>

				</div>
			))}
		</div>
	);
}
export default LoadingState;
