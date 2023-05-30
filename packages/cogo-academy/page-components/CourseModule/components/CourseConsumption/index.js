import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Footer from './components/Footer';
import ModuleContent from './components/ModuleContent';
import ModuleNavigation from './components/ModuleNavigation';
import useGetCogoAcademyCourse from './hooks/useGetCogoAcademyCourse';
import useGetCourseDetails from './hooks/useGetCourseDetails';
import styles from './styles.module.css';

function CourseConsumption() {
	const router = useRouter();
	const [chapterContent, setChapterContent] = useState({});

	const course_id = router?.query?.course_id;

	console.log(course_id);

	const {
		loading,
		finalData,
	} = useGetCourseDetails({ id: course_id });

	const {
		courseData,
		courseLoading,
	} = useGetCogoAcademyCourse({ id: course_id });

	return (
		<div className={styles.container}>
			<div className={styles.main_content}>

				<ModuleNavigation data={finalData} setChapterContent={setChapterContent} />

				<ModuleContent data={chapterContent} />

			</div>

			<Footer />
		</div>
	);
}

export default CourseConsumption;
