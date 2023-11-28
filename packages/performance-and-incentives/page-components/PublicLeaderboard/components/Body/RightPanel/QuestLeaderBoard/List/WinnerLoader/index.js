import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function WinnerLoader({ rows = 6 }) {
	return (
		<div className={styles.container}>
			{[...Array(rows)].map((item) => (
				<div key={item} className={styles.loading_div}>
					<div className={styles.header}>
						<Placeholder type="circle" radius="20px" width="30px" />
						<Placeholder height="16px" />
					</div>
					<Placeholder height="8px" margin="12px 0 0" />
				</div>
			))}

		</div>
	);
}

export default WinnerLoader;
