import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../CreateCourse/commons/EmptyState';
import useGetUserCourse from '../../hooks/useGetUserCourse';
import Header from '../Header';

import CompletionAndFeedback from './components/CompletionAndFeedback';
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

function CourseConsumption({
	viewType = 'normal',
	data: courseData = {},
	loading: courseLoading = false,
	getUserCourse: trigger = () => {},
	setShowCourse = () => {},
}) {
	const { user_id } = useSelector((state) => ({
		user_id: state?.profile?.user.id,
	}));

	const router = useRouter();

	const course_id = router?.query?.course_id;

	const [chapter, setChapter] = useState({});
	const [editorValue, setEditorValue] = useState(
		RichTextEditor.createEmptyValue(),
	);
	const [editorError, setEditorError] = useState(false);

	const [indexes, setIndexes] = useState({
		moduleIndex    : 0,
		subModuleIndex : 0,
		chapterIndex   : 0,
	});
	const [currentCategory, setCurrentCategory] = useState('all_courses');

	const { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	const {
		data = {},
		getUserCourse,
		loading,
	} = useGetUserCourse({ course_id, user_id, viewType });

	const MAPPING = {
		preview: {
			finalData    : courseData,
			finalLoading : courseLoading,
			refetchApi   : trigger,
		},
		normal: {
			finalData    : data,
			finalLoading : loading,
			refetchApi   : getUserCourse,
		},
	};

	const { finalData, finalLoading, refetchApi } =		MAPPING[viewType] || MAPPING.normal;

	const { courseProgressUpdateLoading, updateCourseProgress } = useUpdateUserCourseProgress({ course_id, user_id });

	useEffect(() => {
		if (!isEmpty(finalData)) {
			setChapter(
				finalData?.course_modules?.[moduleIndex]?.course_sub_modules[
					subModuleIndex
				]?.course_sub_module_chapters[chapterIndex],
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [finalData]);

	if (isEmpty(finalData) && !(finalLoading || courseProgressUpdateLoading)) {
		return <EmptyState />;
	}

	if (finalData?.all_chapters_completed) {
		return <CompletionAndFeedback course_id={course_id} />;
	}

	return (
		<>
			{viewType !== 'preview' ? (
				<Header
					currentCategory={currentCategory}
					setCurrentCategory={setCurrentCategory}
					input_required={false}
				/>
			) : null}

			<div className={styles.container}>
				<div className={styles.main_content}>
					<ModuleNavigation
						data={finalData}
						loading={finalLoading}
						courseProgressUpdateLoading={courseProgressUpdateLoading}
						chapter={chapter}
						setChapter={setChapter}
						indexes={indexes}
						setIndexes={setIndexes}
					/>

					<ModuleContent
						data={finalData}
						loading={finalLoading || courseProgressUpdateLoading}
						updateCourseProgress={updateCourseProgress}
						chapter={chapter}
						indexes={indexes}
						setIndexes={setIndexes}
						getUserCourse={refetchApi}
						setChapter={setChapter}
						RichTextEditor={RichTextEditor}
						editorValue={editorValue}
						setEditorValue={setEditorValue}
						editorError={editorError}
						setEditorError={setEditorError}
						viewType={viewType}
					/>
				</div>

				{viewType !== 'preview' ? (
					<Footer
						course_id={course_id}
						data={finalData}
						indexes={indexes}
						setIndexes={setIndexes}
						updateCourseProgress={updateCourseProgress}
						loading={finalLoading || courseProgressUpdateLoading}
						getUserCourse={refetchApi}
						chapter={chapter}
						RichTextEditor={RichTextEditor}
						editorValue={editorValue}
						setEditorValue={setEditorValue}
						setEditorError={setEditorError}
						setChapter={setChapter}
					/>
				) : null}

				{viewType === 'preview' ? (
					<div className={styles.button_container}>
						<Button
							type="button"
							onClick={() => setShowCourse(false)}
							themeType="accent"
						>
							Show curicclum
						</Button>

						<Button
							type="button"
							onClick={() => router.push(`/learning/course/create?id=${course_id}`)}
						>
							Go to course creation
						</Button>
					</div>
				) : null}
			</div>
		</>
	);
}

export default CourseConsumption;
