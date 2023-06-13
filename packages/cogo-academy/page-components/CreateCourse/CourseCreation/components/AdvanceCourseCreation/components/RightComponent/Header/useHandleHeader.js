import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useUpdateCourse from '../../../hooks/useUpdateCourse';

const getState = ({ state, status }) => {
	if (status === 'inactive') {
		return { state: 'Inactive', color: '#ff8888' };
	}

	if (state === 'published') {
		return { state: 'Active', color: '#CFEAEC' };
	}

	return { state: 'Draft', color: '#fdd1a7' };
};

const useHandleHeader = ({ childRef, activeTab, getCogoAcademyCourse, setActiveTab, data = {}, id = '' }) => {
	const router = useRouter();

	const [publishData, setPublishData] = useState({});

	const { loading, updateCourse } = useUpdateCourse({
		data,
		getCogoAcademyCourse,
		setActiveTab,
		activeTab,
		changeTab: true,
		setPublishData,
	});

	const handleSubmitForm = ({ buttonType = 'save' }) => {
		childRef.current[activeTab]?.handleSubmit().then((res) => {
			if (res.hasError) {
				return;
			}

			if (buttonType === 'publish') {
				setPublishData(res.values);
				return;
			}

			updateCourse({
				values            : res.values,
				isRefetchRequired : true,
				buttonType,
			});
		});
	};

	const onPublishCourse = ({ values }) => {
		updateCourse({
			values,
			isRefetchRequired : false,
			buttonType        : 'publish',
		});
	};

	const handlePreviewCourse = () => {
		router.push(`/learning/course/preview?course_id=${id}`);
	};

	const BUTTON_MAPPING = {
		pre_publish: [
			{
				buttonText      : 'Preview',
				themeType       : 'secondary',
				onClickFunction : handlePreviewCourse,
				funcProps       : {},
			},
			{
				buttonText      : 'Save',
				themeType       : 'primary',
				onClickFunction : handleSubmitForm,
				funcProps       : {},
			},
			{
				buttonText      : 'Publish',
				themeType       : 'accent',
				onClickFunction : handleSubmitForm,
				funcProps       : {
					buttonType: 'publish',
				},
			},
		],
		others: [
			{
				buttonText      : 'Preview',
				themeType       : 'secondary',
				onClickFunction : handlePreviewCourse,
				funcProps       : {},
			},
			{
				buttonText      : 'Next',
				icon            : IcMArrowRight,
				themeType       : 'accent',
				onClickFunction : handleSubmitForm,
				funcProps       : {},
			},
		],
	};

	return {
		getState,
		BUTTON_MAPPING,
		onPublishCourse,
		loading,
		publishData,
		setPublishData,
	};
};

export default useHandleHeader;
