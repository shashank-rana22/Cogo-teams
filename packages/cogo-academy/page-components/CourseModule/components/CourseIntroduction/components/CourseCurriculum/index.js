import { Accordion } from '@cogoport/components';
import { IcMDocument, IcMPpt, IcMText, IcMVideoCall } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CourseCurriculum({ data }) {
	// console.log('dataDetails', data);

	const ContentType_Mapping = {
		document     : <IcMDocument width="24px" height="24px" fill="white" />,
		video        : <IcMVideoCall width="24px" height="24px" fill="white" />,
		presentation : <IcMPpt width="24px" height="24px" fill="white" />,
		text         : <IcMText width="24px" height="24px" fill="white" />,
	};

	return (
		<div className={styles.container}>
			<span className={styles.heading}>Course Curriculum</span>
			{data?.map((item, index) => (

				<div className={styles.outer_accordian} key={item.id}>
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
						styles={{ width: '100%' }}
					>
						{item?.course_sub_modules?.map((subItem, subIndex) => (

							<div className={styles.inner_accordian} key={subItem.id}>
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
									styles={{ width: '100%' }}
								>
									{ subItem?.course_sub_module_chapters?.map((itemChapter, indexChapter) => (
										<div className={styles.databox} key={itemChapter?.id}>
											<div className={styles.databox_image}>
												{ContentType_Mapping[itemChapter?.content_type]}
											</div>
											<div className={styles.databox_content}>
												{itemChapter?.name}
											</div>
										</div>
									))}

								</Accordion>
							</div>
						))}
					</Accordion>

				</div>
			))}

			<Accordion
				type="text"
				title="Course Completion Test"
				className={styles.bottom_box}
				styles={{ margin: '10px', width: '100%' }}
			/>
		</div>
	);
}

export default CourseCurriculum;
