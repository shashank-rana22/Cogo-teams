import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingHeader() {
	return (
		<div className={styles.header_container}>
			<div className={styles.left_section}>
				<div className={styles.createdon_text}>
					<Placeholder height="20px" width="200px" />
				</div>
				<div className={styles.service_type}>
					<Placeholder height="20px" width="30px" />
					<div style={{ margin: '0 5px' }}>
						<Placeholder height="20px" width="40px" />
					</div>
					<Placeholder height="20px" width="100px" />
				</div>
				<div style={{ display: 'flex' }}>
					<Placeholder height="20px" width="100px" />
				</div>
			</div>
			<div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
				<Placeholder height="25px" width="20px" />
				<div style={{ marginLeft: '3px' }}>
					<Placeholder height="20px" width="200px" />
				</div>
			</div>
		</div>
	);
}

export default LoadingHeader;
