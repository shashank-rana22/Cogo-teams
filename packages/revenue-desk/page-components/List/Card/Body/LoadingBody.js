import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingBody() {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<div className={styles.heading}>
					<div>
						<Placeholder height="20px" width="80px" />
					</div>
					<div className={styles.text}>
						<Placeholder height="20px" width="250px" />
					</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<Placeholder height="20px" width="80px" />
						<div style={{ margin: '10px 0' }}>
							<Placeholder height="20px" width="200px" />
						</div>
					</div>
					<Placeholder height="20px" width="20px" />
					<div>
						<Placeholder height="20px" width="80px" />
						<div style={{ margin: '10px 10px 10px 0' }}>
							<Placeholder height="20px" width="200px" />
						</div>
					</div>

				</div>

			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', flex: 1, padding: '20px 0' }}>
				<Placeholder height="20px" width="80px" margin="10px 10px 0" />
				<Placeholder height="20px" width="80px" margin="10px 10px 0" />
				<Placeholder height="20px" width="80px" margin="10px 10px 0" />
				<Placeholder height="20px" width="80px" margin="10px 10px 0" />
				<Placeholder height="20px" width="80px" margin="10px 10px 0" />
				<Placeholder height="20px" width="80px" margin="10px 10px 0" />
				<Placeholder height="20px" width="80px" margin="10px 10px 0" />
			</div>
		</div>
	);
}

export default LoadingBody;
