import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function EventLoadingState() {
	return (

		<>
			{[1, 2, 3].map((item) => (
				<section className={styles.list_item_container} key={item}>
					<div className={styles.top_div}>
						<Placeholder width="20px" margin="0 0 4px 0" />

						<Placeholder width="20px" margin="0 0 4px 0" />
					</div>

					<div>
						<p className={styles.info_tag}>
							<Placeholder width="200px" margin="0 0 4px 0" />
						</p>

						<div className={styles.info_tag}>
							<Placeholder width="200px" margin="0 0 12px 0" />
						</div>

						<p className={styles.info_tag}>
							<Placeholder width="200px" margin="0 0 4px 0" />
						</p>
					</div>

					<div className={styles.rule}>
						<p className={styles.rule_head}>
							<Placeholder width="200px" margin="0 0 12px 0" />
						</p>

						{[11, 12].map(() => (
							<div className={styles.rule_body}>
								{[21, 22, 23, 24, 25].map(() => (
									<Placeholder
										width="120px"
										margin="0 12px 4px 0"

									/>
								))}
							</div>
						))}
					</div>

				</section>
			))}

		</>
	);
}

export default EventLoadingState;
