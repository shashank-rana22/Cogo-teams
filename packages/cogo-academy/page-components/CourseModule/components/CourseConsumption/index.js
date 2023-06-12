import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../CreateCourse/commons/EmptyState';
import Header from '../Header';

import Footer from './components/Footer';
import ModuleContent from './components/ModuleContent';
import ModuleNavigation from './components/ModuleNavigation';
import styles from './styles.module.css';
import useHandleCourseConsumption from './useHandleCourseConsumption';

function CourseConsumption({
	viewType = 'normal',
	data: courseData = {},
	loading: courseLoading = false,
	getUserCourse: trigger = () => {},
	setShowCourse = () => {},
}) {
	const {
		finalData,
		finalLoading,
		courseProgressUpdateLoading,
		RichTextEditor,
		currentCategory,
		setCurrentCategory,
		chapter,
		setChapter,
		setIndexes,
		indexes,
		setShowTestData,
		showTestData,
		updateCourseProgress,
		editorValue,
		refetchApi,
		setEditorValue,
		setEditorError,
		editorError,
		course_id,
		router,
		showFeedback,
		setShowFeedback,
	} = useHandleCourseConsumption({ courseData, courseLoading, trigger, viewType });

	if (isEmpty(finalData) && !(finalLoading || courseProgressUpdateLoading)) {
		return <EmptyState />;
	}

	const { course_user_mapping = {} } = finalData || {};

	const { state: courseState = '' } = course_user_mapping || {};

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
						setShowTestData={setShowTestData}
						showTestData={showTestData}
						showFeedback={showFeedback}
						setShowFeedback={setShowFeedback}
						viewType={viewType}
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
						setShowTestData={setShowTestData}
						showTestData={showTestData}
						showFeedback={showFeedback}
						setShowFeedback={setShowFeedback}
						course_id={course_id}
						courseState={courseState}

					/>
				</div>

				{viewType !== 'preview' && courseState !== 'completed' && !(showFeedback || showTestData) ? (
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
						setShowTestData={setShowTestData}
						setShowFeedback={setShowFeedback}
					/>
				) : null}

				{viewType === 'preview' ? (
					<div className={styles.button_container}>
						<Button
							type="button"
							onClick={() => setShowCourse(false)}
							themeType="accent"
						>
							Show curriculum
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
