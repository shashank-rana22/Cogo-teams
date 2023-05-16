import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateCourseSubModuleChapter from '../../../../../../hooks/useCreateCourseSubModuleChapter';
import useUpdateCourseSubModuleChapter from '../../../../../../hooks/useUpdateCourseSubModuleChapter';

const useHandleChapter = ({
	subModule,
	getLoading,
	getCourseModuleDetails,
}) => {
	const { course_sub_module_chapters, id } = subModule || {};

	const [subModuleChapters, setSubModuleChapters] = useState(course_sub_module_chapters);

	const {
		createCourseSubModuleChapter,
		loading: createChapterLoading,
	} = useCreateCourseSubModuleChapter({ getCourseModuleDetails });

	const {
		updateCourseSubModuleChapter,
		loading: updateChapterLoading,
	} = useUpdateCourseSubModuleChapter({ getCourseModuleDetails });

	if (isEmpty(subModuleChapters)) {
		setSubModuleChapters([{ id: new Date().getTime(), name: '', isNew: true }]);
	}

	const onSaveChapter = ({ values, chapter }) => {
		if (chapter.isNew) {
			createCourseSubModuleChapter({ values });
		} else {
			updateCourseSubModuleChapter({ values });
		}
	};

	const addNewChapter = () => {
		setSubModuleChapters((prev) => [
			...prev,
			{
				id                   : new Date().getTime(),
				name                 : '',
				isNew                : true,
				course_sub_module_id : id,
			},
		]);
	};

	const deleteChapter = ({ e, child, length }) => {
		e.stopPropagation();

		if (length === 1) {
			Toast.error('cannot delete as there should be atleast one chapter');
			return;
		}

		if (child.isNew) {
			setSubModuleChapters((prev) => prev.filter((item) => item.id !== child.id));
		}
	};

	const chapterLoading = createChapterLoading || updateChapterLoading || getLoading;

	useEffect(() => {
		setSubModuleChapters(course_sub_module_chapters);
	}, [course_sub_module_chapters]);

	return {
		chapterLoading,
		deleteChapter,
		addNewChapter,
		onSaveChapter,
		subModuleChapters,
		subModuleId: id,
	};
};

export default useHandleChapter;
