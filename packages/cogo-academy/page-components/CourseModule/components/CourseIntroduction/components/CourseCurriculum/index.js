import { Accordion } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CourseCurriculum({ data }) {
	// console.log('dataDetails', data);
	return (
		<div className={styles.container}>
			<span className={styles.heading}>Course Curriculum</span>
			{data?.map((item, index) => (

				<div className={styles.outer_accordian}>
					<Accordion
						type="text"
						title={(
							<div className={styles.title}>
								<div className={styles.title_left}>
									<div className={styles.light}>
										Module
										{' '}
										{index + 1}
										.&nbsp;
									</div>
									<div>{item.description}</div>
								</div>

								<div className={styles.title_right}>
									<div className={styles.right}>
										{item?.course_sub_modules.length}
                                        &nbsp;
										<div className={styles.light}>Sub Modules</div>
                                        &nbsp;
									</div>
									<div className={styles.right}>
										10 &nbsp;
										<div className={styles.light}>Chapter</div>
                                        &nbsp;
									</div>
								</div>
							</div>
						)}
						styles={{ margin: '10px', width: '100%' }}
					>
						{item?.course_sub_modules?.map((subItem, subIndex) => (

							<div className={styles.inner_accordian}>
								<Accordion
									type="text"
									title={(
										<div className={styles.inner_title}>
											<div className={styles.light}>
												Sub Module
												{' '}
												{subIndex + 1}
												.&nbsp;
											</div>
											<div>{subItem.description}</div>
										</div>
									)}
									styles={{ margin: '10px', width: '100%' }}
								>
									<div className={styles.databox}>Lorem5</div>
									<div className={styles.databox}>Lorem5</div>
									<div className={styles.databox}>Lorem5</div>
									<div className={styles.databox}>Lorem5</div>
									<div className={styles.databox}>Lorem5</div>

								</Accordion>
							</div>
						))}
					</Accordion>

				</div>
			))}

			<div className={styles.bottom_box}>
				Course Completion Test
			</div>
		</div>
	);
}

export default CourseCurriculum;
