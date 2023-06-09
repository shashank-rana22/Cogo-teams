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
		isNew          : true,
	});

	const [currentCategory, setCurrentCategory] = useState('all_courses');

	const [showTestData, setShowTestData] = useState(false);
	const [showFeedback, setShowFeedback] = useState(false);

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

	const {
		all_chapters_completed = false,
		test_mapping = {},
		test_completed = false,
		redirect_chapter_details = {},
		course_modules = [],
	} = finalData || {};

	const { courseProgressUpdateLoading, updateCourseProgress } = useUpdateUserCourseProgress({ course_id, user_id });

	const { moduleIndex, subModuleIndex, chapterIndex, isNew = false } = indexes;

	useEffect(() => {
		if (!isEmpty(finalData) && !isEmpty(indexes)) {
			setChapter(
				course_modules?.[moduleIndex]?.course_sub_modules[subModuleIndex]
					?.course_sub_module_chapters[chapterIndex],
			);

			if (all_chapters_completed && test_completed && isNew) {
				setShowFeedback(true);
			}
		}
	}, [
		all_chapters_completed,
		chapterIndex,
		course_modules,
		finalData,
		indexes,
		isNew,
		moduleIndex,
		subModuleIndex,
		test_completed,
	]);

	useEffect(() => {
		if (
			!isEmpty(redirect_chapter_details)
			&& viewType !== 'preview'
			&& isNew
		) {
			const values = getIndex({
				redirect_chapter_details,
				course_modules,
			});

			setIndexes(values);
		}
	}, [course_modules, isNew, redirect_chapter_details, viewType]);

	useEffect(() => {
		if (isNew && all_chapters_completed && (!isEmpty(test_mapping || {}) && !test_completed)) {
			setShowTestData(true);
			setChapter({});
		}

		if (isNew && all_chapters_completed && (test_completed || isEmpty(test_mapping || {}))) {
			setShowFeedback(true);
			setChapter({});
		}
	}, [all_chapters_completed, test_completed, test_mapping, isNew]);

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
