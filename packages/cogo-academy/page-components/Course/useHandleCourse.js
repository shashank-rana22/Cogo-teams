import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useListCogoAcademyCourses from './hooks/useListCogoAcademyCourses';
import useListCourseUserMappings from './hooks/useListCourseUserMappings';

const useHandleCourse = ({ ref }) => {
	const { query, push } = useRouter();

	const { activeTab: currentActiveTab, coursesTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'courses');
	const [filters, setFilters] = useState({});

	const {
		data,
		loading,
		fetchList,
		setParams,
		params,
		debounceQuery,
		input,
		setInput,
		total_count:courseCount,
	} = useListCogoAcademyCourses({ filters, activeTab });

	const {
		data: studentData,
		loading: studentListLoading,
		fetchList: studentListRefetch,
		setParams: setstudentListParams,
		params: studentListParams,
		debounceQuery: studentListDebounceQuery,
		input: studentListInput,
		setInput: setstudentListInput,
		total_count:studentCount,
	} = useListCourseUserMappings({ filters, activeTab });

	const componentMapping = {
		courses: {
			key            : 'courses',
			title          : 'Courses',
			total_count    : courseCount,
			componentProps : {
				data,
				loading,
				fetchList,
				setParams,
				activeTab,
				params,
			},
			filterProps: {
				debounceQuery,
				input,
				setInput,
				setParams,
				params,
				setFilters,
				filters,
			},
		},
		students: {
			key            : 'students',
			title          : 'Students',
			total_count    : studentCount,
			componentProps : {
				data      : studentData,
				loading   : studentListLoading,
				fetchList : studentListRefetch,
				setParams : setstudentListParams,
				activeTab,
				params    : studentListParams,
			},
			filterProps: {
				debounceQuery : studentListDebounceQuery,
				input         : studentListInput,
				setInput      : setstudentListInput,
				setParams     : setstudentListParams,
				params        : studentListParams,
				setFilters,
				filters,
			},
		},
	};

	const handleChangeTab = (val) => {
		push(`/learning/course?activeTab=${val}`);

		ref.current.reset();
		setFilters({});
		setActiveTab(val);
	};

	return {
		handleChangeTab,
		coursesTab,
		componentMapping,
		activeTab,
		setFilters,
	};
};

export default useHandleCourse;
