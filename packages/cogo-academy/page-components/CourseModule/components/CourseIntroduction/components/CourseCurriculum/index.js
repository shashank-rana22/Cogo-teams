import { Accordion } from '@cogoport/components';
import { IcMDocument, IcMPpt, IcMText, IcMVideoCall } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const ContentType_Mapping = {
	document     : <IcMDocument width="24px" height="24px" fill="#fff" />,
	video        : <IcMVideoCall width="24px" height="24px" fill="#fff" />,
	presentation : <IcMPpt width="24px" height="24px" fill="#fff" />,
	text         : <IcMText width="24px" height="24px" fill="#fff" />,
};

function CourseCurriculum({ data = {} }) {
	const { course_modules = [], course_details = {} } = data;

	return (
		<div className={styles.container}>
			<span className={styles.heading}>Course Curriculum</span>
			{course_modules?.map((item, index) => (
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
									<div>{item.name}</div>
								</div>

								<div className={styles.title_right}>
									<div className={styles.right}>
										{item?.course_sub_modules.length}
                                        &nbsp;
										<div className={styles.light}>Sub Modules</div>
                                        &nbsp;
									</div>
									<div className={styles.right}>
										{item?.chapter_count}
										&nbsp;
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
											<div>{subItem.name}</div>
										</div>
									)}
									styles={{ width: '100%' }}
								>
									{ subItem?.course_sub_module_chapters?.map((itemChapter) => (
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

			{!isEmpty(course_details.tests || {}) ? (
				<div className={styles.bottom_box}>
					<div>
						Course Completion Test
					</div>
				</div>
			) : null}
		</div>
	);
}

export default CourseCurriculum;
