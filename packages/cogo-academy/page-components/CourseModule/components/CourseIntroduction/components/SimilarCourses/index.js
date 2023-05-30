import { Carousel } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import LoadingState from '../../../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../../../configs/BUTTON_CONTENT_MAPPING';
import useListCourseUserMappings from '../../../../hooks/useListCourseUserMappings';
import CourseCard from '../../../CourseCard';

import styles from './styles.module.css';

function SimilarCourses() {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const router = useRouter();

	const [activeTab, setActiveTab] = useState('ongoing');

	const [input, setInput] = useState('');

	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});

	const { data = {}, loading } = useListCourseUserMappings({ activeTab, params, query });

	const HANDLE_CLICK_MAPPING = {

		ongoing: (course_id) => {
			router.push(`/learning/course/introduction?course_id=${course_id}`);
		},
		mandatory: (course_id) => {
			router.push(`/learning/course/introduction?course_id=${course_id}`);
		},
		completed: (course_id) => {
			router.push(`/learning/course/introduction?course_id=${course_id}`);
		},
		saved: () => {},
	};

	const CAROUSELDATA = (data.list || []).map((item, index) => ({
		key    : index,
		render : () => (
			<CourseCard
				key={item.id}
				data={item}
				buttonContent={BUTTON_CONTENT_MAPPING[activeTab]}
				handleClick={HANDLE_CLICK_MAPPING[activeTab]}
			/>
		),
	}));

	if (loading) {
		return <LoadingState rowsCount={7} />;
	}
	return (
		<div className={styles.container}>
			<b>Similar Courses</b>

			<div className={styles.carousel_container}>
				<Carousel
					size="md"
					slides={CAROUSELDATA}
					itemsToShow={4}
					itemsToScroll={4}
					showDots={false}
					showArrow
				/>
			</div>
		</div>
	);
}

export default SimilarCourses;
