import { Placeholder } from '@cogoport/components';

import { VALUE_ONE, VALUE_TWO } from '../../../../constants';

import styles from './styles.module.css';

function LoadingCard({ rate_key }) {
	const LoadingArray = [VALUE_ONE, VALUE_TWO];
	return (
		<div>
			{LoadingArray.map((singleItem) => (
				<div
					className={((rate_key === 'selected_rate') || (rate_key === 'preferences_rate'))
						? styles.selected_rate_card_container : styles.container}
					key={singleItem}
				>
					<div className={styles.left_section_container}>
						<Placeholder height="20px" width="20px" />
					</div>
					<div className={styles.line} />
					<div className={styles.right_section_container}>
						<div className={styles.upper_section}>
							<div className={styles.upper_left_section}>
								<div className={styles.service_provider_heading}>
									<Placeholder height="20px" width="150px" margin="0 5px 0 0" />
								</div>
								<div>
									<Placeholder height="20px" width="150px" margin="0 5px 0 0" />
								</div>
								<div>
									<Placeholder height="20px" width="150px" margin="0 5px 0 0" />
								</div>
							</div>
							{rate_key ? (
								<div>
									<Placeholder height="20px" width="150px" />
								</div>
							) : null}
						</div>
						<div className={styles.lower_section}>
							<div className={styles.first_section}>
								<div className={styles.text1}>
									<Placeholder height="20px" width="100px" margin="0 5px 10px 0" />
								</div>
								<div className={styles.text2}>
									<Placeholder height="20px" width="200px" margin="0 5px 10px 0" />
								</div>
							</div>
							<div className={styles.progress_bar_section}>
								<div style={{ marginRight: '20px' }}>
									<div className={styles.text}>
										Allocation Ratio
									</div>
									<Placeholder height="25px" width="150px" />
								</div>
								<div>
									<div className={styles.text}>
										Fulfillment Ratio
									</div>
									<Placeholder height="25px" width="150px" />
								</div>
							</div>
							<div className={styles.price_section}>
								<div style={{ display: 'flex' }}>
									<Placeholder height="15px" width="150px" margin="0 5px 5px 0" />
								</div>
								<div>
									<Placeholder height="15px" width="175px" margin="0 5px 5px 0" />
									<Placeholder height="15px" width="200px" margin="0 5px 5px 0" />
								</div>
							</div>
							<div className={styles.total_price_section}>
								<div style={{ display: 'flex' }}>
									<Placeholder height="20px" width="150px" />
								</div>
							</div>
						</div>

					</div>
				</div>
			))}
		</div>

	);
}
export default LoadingCard;
