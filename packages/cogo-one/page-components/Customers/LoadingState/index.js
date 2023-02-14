import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.list_container}>
				<div className={styles.card_Container}>
					<div className={styles.card}>

						<div className={styles.user_information}>
							<div className={styles.avatar_Container}>
								<Placeholder type="circle" radius="30px" />
								<div className={styles.user_details}>
									<div className={styles.user_name}>
										hello
									</div>
									<div className={styles.organisation}>
										Organisation
									</div>
								</div>
							</div>

							<div className={styles.user_activity}>
								<div className={styles.pills_card}>Small</div>
								<div className={styles.activity_duration}>
									5 min
								</div>
							</div>

						</div>
						<div className={styles.content}>
							asdfghjklasdfghj dsfghj
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}

export default LoadingState;
