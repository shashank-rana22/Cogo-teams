import { Accordion } from '@cogoport/components';
import { IcMFtick, IcMDocument } from '@cogoport/icons-react';

import useGetCourseSubModule from '../../hooks/useGetCourseSubModule';

import styles from './styles.module.css';

function SubModuleContent({ id = '' }) {
	const { data, loading } = useGetCourseSubModule({ id });

	console.log(data);

	const { course_sub_module_chapters = [] } = data;

	return (
		<div className={styles.container} key={id}>
			{course_sub_module_chapters?.map((chapter) => (
				<div key={chapter.id} className={styles.chapter_container}>
					<div className={styles.wrapper}>
						<div className={styles.number}>
							<div className={styles.icon}>
								<IcMDocument fill="white" />
							</div>
						</div>
						<div className={styles.name}>{chapter.name}</div>
					</div>

					<div className={styles.duration}>
						{chapter.completion_duration_value}
						{' mins'}
					</div>
				</div>
			))}
		</div>
	);
}

export default SubModuleContent;
