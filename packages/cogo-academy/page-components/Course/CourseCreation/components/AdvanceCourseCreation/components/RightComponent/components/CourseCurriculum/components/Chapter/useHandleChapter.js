import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCommonCreateApi from '../../../../../../hooks/useCommonCreateApi';
import useCommonDeleteApi from '../../../../../../hooks/useCommonDeleteApi';
import useCommonUpdateApi from '../../../../../../hooks/useCommonUpdateApi';
import useGetCourseSubModule from '../../../../../../hooks/useGetCourseSubModule';
import getPayload from '../../../../../../utils/getPayload';

const useHandleChapter = ({
	subModule,
	getLoading,
	getCourseModuleDetails,
	getSubModuleRefetch,
	setGetSubModuleRefetch,
}) => {
	const { id } = subModule || {};

	const [subModuleChapters, setSubModuleChapters] = useState([]);

	const {
		finalData,
		loading: getCourseSubModuleLoading,
		getCourseSubModule,
	} = useGetCourseSubModule({
		id,
		getSubModuleRefetch,
		setGetSubModuleRefetch,
	});

	const {
		commonCreateApi,
		loading: createChapterLoading,
	} = useCommonCreateApi({ getCourseModuleDetails });

	const {
		commonUpdateApi,
		loading: updateChapterLoading,
	} = useCommonUpdateApi({ getCourseSubModule });

	const { loading: deleteLoading, commonDeleteApi } = useCommonDeleteApi({
		finalData : subModuleChapters,
		getCourseSubModule,
		type      : 'chapter',
	});

	if (isEmpty(subModuleChapters)) {
		setSubModuleChapters([{ id: new Date().getTime(), name: '', isNew: true, course_sub_module_id: id }]);
	}

	const onSaveChapter = ({ values, chapter }) => {
		if (chapter.isNew) {
			commonCreateApi({ values, type: 'chapter' });
		} else {
			commonUpdateApi({ values, type: 'chapter' });
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
			return;
		}

		const deletePayloadValues = getPayload({
			course_sub_module_id : id,
			chapterId            : child.id,
			payloadType          : 'chapter',
			action_type          : 'delete',
		});

		commonDeleteApi({ idToDelete: child.id, deletePayloadValues });
	};

	const chapterLoading = createChapterLoading || updateChapterLoading || getLoading;

	useEffect(() => {
		if (!isEmpty(finalData) && !getCourseSubModuleLoading) {
			setSubModuleChapters(finalData);
		}
	}, [finalData, getCourseSubModuleLoading]);

	return {
		chapterLoading,
		deleteChapter,
		addNewChapter,
		onSaveChapter,
		subModuleChapters,
		subModuleId: id,
		getCourseSubModuleLoading,
		deleteLoading,
	};
};

export default useHandleChapter;
