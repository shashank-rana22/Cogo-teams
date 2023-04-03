import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Placeholder type="circle" radius="60px" margin="0px 20px 0px 0px" />
				<div className={styles.header_inner}>
					<Placeholder height="24px" width="60%" margin="8px 0px 0px 0px" />
					<Placeholder height="20px" width="50%" margin="8px 0px 0px 0px" />
					<Placeholder height="20px" width="40%" margin="8px 0px 0px 0px" />

				</div>
			</div>
			<div className={styles.overview}>
				<div className={styles.details}>
					<Placeholder height="26px" width="60%" margin="0px" />
					<Placeholder height="32px" width="100%" margin="32px 0px 0px 0px" />
					<Placeholder height="32px" width="100%" margin="32px 0px 0px 0px" />
				</div>
				<div className={styles.radial_charts}>
					<Placeholder type="circle" radius="140px" margin="0px 20px 0px 32px" />
					<Placeholder type="circle" radius="140px" margin="0px 0px 0px 32px" />
				</div>
				<div className={styles.bar_charts}>
					<Placeholder
						height="100%"
						width="20%"
						margin="0px 40px 0px 0px"
						className={styles.bar_chart_item}
					/>
					<Placeholder
						height="100%"
						width="20%"
						margin="0px 20px 0px 30px"
						className={styles.bar_chart_item}
					/>
				</div>

			</div>
		</div>
	);
}

export default LoadingState;
