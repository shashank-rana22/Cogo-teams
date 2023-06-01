import { Carousel } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../../commons/EmpyState';
import LoadingState from '../../../../../../../commons/LoadingState';
import CourseEmptyState from '../../../../../commons/CourseEmptyState';
import BUTTON_CONTENT_MAPPING from '../../../../../configs/BUTTON_CONTENT_MAPPING';
import HANDLE_CLICK_MAPPING from '../../../../../configs/HANDLE_CLICK_MAPPING';
import useListCourseUserMappings from '../../../../../hooks/useListCourseUserMappings';
import CourseCard from '../../../../CourseCard';

function CourseContent({ activeTab, user_id }) {
	const [input, setInput] = useState('');

	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});

	const { HANDLE_CLICK_MAPPINGS } = HANDLE_CLICK_MAPPING();

	const { data = {}, loading } = useListCourseUserMappings({ activeTab, params, query });

	if (loading) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(data?.list)) {
		return <CourseEmptyState activeTab={activeTab} />;
	}

	const CAROUSELDATA = (data.list || []).map((item, index) => ({
		key    : index,
		render : () => (
			<CourseCard
				key={item.id}
				data={item}
				buttonContent={BUTTON_CONTENT_MAPPING[activeTab]}
				handleClick={HANDLE_CLICK_MAPPINGS[activeTab]}
			/>
		),
	}));

	return (
		<Carousel
			size="md"
			slides={CAROUSELDATA}
			itemsToShow={4}
			itemsToScroll={4}
			showDots={false}
			showArrow
		/>
	);
}

export default CourseContent;
