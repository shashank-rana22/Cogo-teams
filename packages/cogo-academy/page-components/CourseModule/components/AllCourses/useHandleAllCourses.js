import { useSelector } from '@cogoport/store';
import { useState, useMemo } from 'react';

import useListCourseUserMappings from '../../hooks/useListCourseUserMappings';

const PAGE_LIMIT = 12;

const INITIAL_PAGE = 1;

const useHandleAllCourses = ({ inputValue, currentCategory, courseCategories, setCurrentCategory }) => {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const [activeTab, setActiveTab] = useState();
	const [selected, setSelected] = useState('');
	const [page, setPage] = useState(INITIAL_PAGE);

	const {
		data = {},
		loading,
		fetchList,
	} = useListCourseUserMappings({
		activeTab,
		inputValue,
		selected,
		currentCategory,
		page_limit: PAGE_LIMIT,
		page,
		user_id,
	});

	const clickOptions = (active, category, select) => {
		if (activeTab === active) {
			setActiveTab('');
		} else {
			setActiveTab(active);
		}

		setCurrentCategory(category);
		setSelected(select);
	};

	const { topics: selectedCategoryTopics = [] } = useMemo(() => courseCategories.find(
		(category) => currentCategory === category.id,
	) || {}, [courseCategories, currentCategory]);

	const categoryTopics = useMemo(() => (selectedCategoryTopics || []).map((item) => ({
		key      : item.topic_id,
		children : item.topic_name,
		color    : 'grey',
		tooltip  : false,
		disabled : false,
		closable : true,
	})), [selectedCategoryTopics]);

	return {
		categoryTopics,
		clickOptions,
		loading,
		fetchList,
		data,
		setPage,
		selected,
		setSelected,
		activeTab,
		page,
	};
};

export default useHandleAllCourses;
