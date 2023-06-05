import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetUserCourse from '../../hooks/useGetUserCourse';
import getIndex from '../../utils/getIndex';

import useUpdateUserCourseProgress from './hooks/useUpdateUserCourseProgress';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

const useHandleCourseConsumption = ({ courseData, courseLoading, trigger, viewType }) => {
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
	const [showTestData, setShowTestData] = useState();
	const [showFeedback, setShowFeedback] = useState();

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

	const { finalData = {}, finalLoading, refetchApi } =	MAPPING[viewType] || MAPPING.normal;

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

	const { redirect_chapter_details = {} } = finalData;

	useEffect(() => {
		if (!isEmpty(redirect_chapter_details) && viewType !== 'preview') {
			const values = getIndex({ redirect_chapter_details, course_modules: finalData.course_modules });

			setIndexes(values);
		}
	}, [finalData, redirect_chapter_details, viewType]);

	return {
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
	};
};

export default useHandleCourseConsumption;
