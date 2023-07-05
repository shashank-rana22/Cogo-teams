import { IcMTimer, IcMActivePlans } from '@cogoport/icons-react';

import styles from './styles.module.css';

function BasicDetails({ basic_info_data, questions, stats_data }) {
	function createContentMappingLeft() {
		return {
			topics_covered: {
				label      : 'Topics Covered',
				icon       : <IcMActivePlans />,
				renderData : (
					<div className={styles.topic}>
						{basic_info_data.topics_covered?.length > 0 ? (
							<div>{basic_info_data.topics_covered.join(', ')}</div>
						) : ('-')}
					</div>
				),
			},
			duration: {
				label      : 'Time taken',
				icon       : <IcMTimer />,
				renderData : (
					<div className={styles.text_bottom}>
						{basic_info_data.time_taken}
						<div className={styles.minutes}>minutes </div>
					</div>
				),
			},
		};
	}

	function createContentMappingMiddle() {
		return {
			passpercent: {
				label      : 'Pass %',
				renderData : (
					<div className={styles.values}>
						<div className={styles.current}>
							{stats_data.current_pass_percentage || 0}
						</div>

						<div style={{
							color       : '#828282',
							marginTop   : '20px',
							paddingLeft : '10px',
						}}
						>
							Cumulative of Both the Tests
						</div>
					</div>
				),
			},
		};
	}

	function createContentMappingRight() {
		return {
			students_appeared: {
				label      : 'Students Appeared',
				renderData : (
					<div>
						{basic_info_data.total_students_appeared || 0}
					</div>
				),
			},
			Passed: {
				label      : 'Passed',
				renderData : (
					<div>
						{basic_info_data.failed_and_passed.total_passed || 0}
					</div>
				),
			},
			Failed: {
				label      : 'Failed',
				renderData : (
					<div>
						{basic_info_data.failed_and_passed.total_failed || 0}
					</div>
				),
			},
		};
	}

	const content_mapping_left = createContentMappingLeft();

	const content_mapping_middle = createContentMappingMiddle();

	const content_mapping_right = createContentMappingRight();

	return (
		<div className={styles.row}>
			<div className={styles.left_flex}>
				<div style={{ flexWrap: 'wrap' }}>
					{Object.keys(content_mapping_left).map((itemKey) => {
						const { label, icon = '', renderData } = content_mapping_left[itemKey] || {};

						return (
							<div className={styles.general} key={itemKey} style={{ minWidth: '120px' }}>
								<div className={styles.svg}>{icon}</div>

								<div className={styles.text}>
									<div className={styles.text_top}>
										{label}
									</div>

									<div className={styles.text_bottom}>
										{renderData}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className={styles.middle_flex}>
				<div className={styles.general}>
					<div>
						<div className={styles.text}>
							<div className={styles.text_top}>
								Required Pass %
							</div>
							<div className={styles.text_bottom}>
								{basic_info_data.required_pass_percent || ' '}
								{' '}
								%
							</div>
						</div>
						<div className={styles.questions_render}>
							<div className={styles.text_top}>
								Questions
							</div>
							<div className={styles.text_bottom}>
								{ questions || '-' }
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.right_flex}>
				{Object.keys(content_mapping_right).map((itemKey) => {
					const { label, renderData } = content_mapping_right[itemKey] || {};

					return (
						<div className={styles.general} key={itemKey}>
							<div className={styles.text}>
								<div className={styles.text_top_label}>
									{label}
								</div>

								<div className={styles.text_bottom_left_data}>
									{renderData}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.current_pass}>
				<div style={{ flexWrap: 'wrap' }}>
					{Object.keys(content_mapping_middle).map((itemKey) => {
						const { label, icon = '', renderData } = content_mapping_middle[itemKey] || {};

						return (
							<div className={styles.general} key={itemKey} style={{ minWidth: '150px' }}>
								<div className={styles.svg}>{icon}</div>

								<div className={styles.text_matter}>
									<div className={styles.text_header}>
										{label}
									</div>

									<div className={styles.text_part}>
										{renderData}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default BasicDetails;
