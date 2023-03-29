import { IcMTimer, IcMActivePlans } from '@cogoport/icons-react';

import styles from './styles.module.css';

function BasicDetails({ basic_info_data }) {
	return (
		<div className={styles.row}>
			<div className={styles.left_flex}>
				<div className={styles.general}>
					<div className={styles.svg}><IcMActivePlans /></div>
					<div className={styles.text}>
						<div className={styles.text_top}>
							Topics Covered
						</div>
						<div className={styles.text_bottom}>
							{basic_info_data.topics_covered.length > 0 ? (
								<div>{basic_info_data.topics_covered.join(', ')}</div>
							) : ('-')}
						</div>
					</div>

				</div>

				<div className={styles.general_bottom}>
					<div className={styles.svg}><IcMTimer /></div>
					<div className={styles.text}>
						<div className={styles.text_top}>
							Duration
						</div>
						<div className={styles.text_bottom}>
							{basic_info_data.time_taken || ' '}
							<div className={styles.minutes}> minutes </div>
						</div>
					</div>

				</div>
			</div>
			<div className={styles.middle_flex}>
				<div className={styles.general}>
					<div className={styles.text}>
						<div className={styles.text_top}>
							Required pass %
						</div>
						<div className={styles.text_bottom}>
							{basic_info_data.required_pass_percent || ' '}
							{' '}
							%
						</div>
					</div>

				</div>

			</div>

			<div className={styles.vertical_line} />

			<div className={styles.left_flex}>
				<div className={styles.general}>
					<div className={styles.text}>
						<div className={styles.text_top}>
							Students Appeared

						</div>
						<div className={styles.text_bottom} style={{ fontWeight: '600', color: '#221F20' }}>
							{basic_info_data.total_students_appeared || 0}
						</div>
					</div>

				</div>
				<div className={styles.general}>
					<div className={styles.text}>
						<div className={styles.text_top}>
							Passed
						</div>
						<div className={styles.text_bottom} style={{ fontWeight: '600', color: '#221F20' }}>
							{basic_info_data.failed_and_passed.total_passed || 0}
						</div>
					</div>
					<div className={styles.text} style={{ marginLeft: '16px' }}>
						<div className={styles.text_top}>
							Failed
						</div>
						<div className={styles.text_bottom} style={{ fontWeight: '600', color: '#221F20' }}>
							{basic_info_data.failed_and_passed.total_failed || 0}
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

export default BasicDetails;
