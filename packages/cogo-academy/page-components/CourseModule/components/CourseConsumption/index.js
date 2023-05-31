import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import useGetUserCourse from '../../hooks/useGetUserCourse';

import Footer from './components/Footer';
import ModuleContent from './components/ModuleContent';
import ModuleNavigation from './components/ModuleNavigation';
import styles from './styles.module.css';

function CourseConsumption() {
	const router = useRouter();
	const [chapterContent, setChapterContent] = useState({});

	const course_id = router?.query?.course_id;

	// const {
	// 	loading,
	// 	finalData,
	// } = useGetCourseDetails({ id: course_id });

	// const {
	// 	courseData,
	// 	courseLoading,
	// } = useGetCogoAcademyCourse({ id: course_id });

	const { user_id } = useSelector((state) => ({ user_id: state?.profile?.user.id }));

	const { data = [] } = useGetUserCourse({ course_id, user_id });

	const [indexes, setIndexes] = useState({
		moduleIndex    : 0,
		subModuleIndex : 0,
		chapterIndex   : 0,
	});

	const { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	useEffect(() => {
		setChapterContent(data[moduleIndex]
			?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters[chapterIndex]);
	}, [chapterIndex, data, moduleIndex, subModuleIndex]);

	return (
		<div className={styles.container}>
			<div className={styles.main_content}>

				<ModuleNavigation
					data={data}
					setChapterContent={setChapterContent}
					indexes={indexes}
					setIndexes={setIndexes}
				/>

				<ModuleContent data={chapterContent} />

			</div>

			<Footer
				course_id={course_id}
				data={data}
				indexes={indexes}
				setIndexes={setIndexes}
				setChapterContent={setChapterContent}
			/>
		</div>
	);
}

export default CourseConsumption;
