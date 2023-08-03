import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState({ rowsCount = 5, small = false }) {
	if (small) {
		return (
			<>
				{[...Array(rowsCount).keys()].map((key) => (
					<div key={key} className={styles.card_container}>
						<div className={styles.card}>
							<Placeholder height="16px" width="100%" />
						</div>
					</div>
				))}
			</>
		);
	}

	return (
		<div className={styles.list_container}>
			{[...Array(rowsCount).keys()].map((key) => (
				<div key={key} className={styles.card_container}>
					<div className={styles.card}>

						<div className={styles.user_information}>
							<div className={styles.avatar_container}>
								<Placeholder type="circle" radius="40px" />
								<div className={styles.user_details}>
									<Placeholder height="15px" width="65px" />
									<Placeholder height="10px" width="100px" margin="10px 0px 0px 0px" />
								</div>
							</div>

							<div className={styles.user_activity}>
								<Placeholder height="20px" width="65px" />
								<Placeholder height="10px" width="65px" margin="4px 0px 0px 0px" />
							</div>

						</div>
						<Placeholder height="13px" width="100%" margin="5px 0px 0px 0px" />
					</div>
				</div>
			))}
		</div>
	);
}

export default LoadingState;
