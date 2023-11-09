import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Card({ count = 0, valueProps = {}, type = '' }) {
	return (
		<div className={styles.container}>
			<span style={{ fontWeight: 600, fontSize: '20px' }}>
				Lead
				{' '}
				{startCase(type)}
			</span>

			<div style={{ marginBottom: '10px' }}>
				New records added :
				{' '}
				{count}
			</div>

			{!isEmpty(valueProps) ? (
				<>
					<div className={styles.type_container}>
						Newly added record :
					</div>

					{valueProps?.created_at
						? (
							<div className={styles.created_at_container}>
								<span style={{ color: '#828282' }}>	Created At :</span>
								{' '}
								{valueProps?.created_at}
							</div>
						) : null}

					<div className={styles.card_container}>
						{Object.entries(valueProps || {}).map(([key, val]) => {
							if (key === 'created_at') { return null; }
							return (
								<div
									className={styles.loop_container}
									key={val}
								>
									<div style={{ color: '#828282' }}>
										{startCase(key)}
										{' '}
										:
									</div>
									<div style={{ color: '#221F20' }}>{val}</div>
								</div>
							);
						})}
					</div>
				</>
			) : null}
		</div>
	);
}

export default Card;
