import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../CreateCourse/commons/EmptyState';
import useGetUserCourse from '../../hooks/useGetUserCourse';

import Footer from './components/Footer';
import ModuleContent from './components/ModuleContent';
import ModuleNavigation from './components/ModuleNavigation';
import useUpdateUserCourseProgress from './hooks/useUpdateUserCourseProgress';
import styles from './styles.module.css';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

function CourseConsumption() {
	const router = useRouter();
	const [chapter, setChapter] = useState({});
	const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
	const [editorError, setEditorError] = useState(false);
	const [readOnly, setReadOnly] = useState(false);

	const [indexes, setIndexes] = useState({
		moduleIndex    : 0,
		subModuleIndex : 0,
		chapterIndex   : 0,
	});

	const course_id = router?.query?.course_id;

	const { user_id } = useSelector((state) => ({ user_id: state?.profile?.user.id }));

	const { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	const { data = {}, getUserCourse, loading } = useGetUserCourse({ course_id, user_id });

	useEffect(() => {
		if (!isEmpty(data)) {
			setChapter(data?.course_modules?.[moduleIndex]
				?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters[chapterIndex]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const {
		courseProgressUpdateLoading,
		updateCourseProgress,
	} = useUpdateUserCourseProgress({ course_id, user_id });

	if (isEmpty(data) && !(loading || courseProgressUpdateLoading)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.main_content}>

				<ModuleNavigation
					data={data}
					loading={loading}
					courseProgressUpdateLoading={courseProgressUpdateLoading}
					chapter={chapter}
					setChapter={setChapter}
					indexes={indexes}
					setIndexes={setIndexes}
				/>

				<ModuleContent
					data={data}
					loading={loading || courseProgressUpdateLoading}
					updateCourseProgress={updateCourseProgress}
					chapter={chapter}
					indexes={indexes}
					setIndexes={setIndexes}
					getUserCourse={getUserCourse}
					setChapter={setChapter}
					RichTextEditor={RichTextEditor}
					editorValue={editorValue}
					setEditorValue={setEditorValue}
					editorError={editorError}
					setEditorError={setEditorError}
					readOnly={readOnly}
					setReadOnly={setReadOnly}
				/>

			</div>

			<Footer
				course_id={course_id}
				data={data}
				indexes={indexes}
				setIndexes={setIndexes}
				updateCourseProgress={updateCourseProgress}
				loading={loading || courseProgressUpdateLoading}
				getUserCourse={getUserCourse}
				chapter={chapter}
				editorValue={editorValue}
				setEditorError={setEditorError}
				setChapter={setChapter}
			/>
		</div>
	);
}

export default CourseConsumption;
