import { Carousel } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import LoadingState from '../../../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../../../configs/BUTTON_CONTENT_MAPPING';
import HANDLE_CLICK_MAPPING from '../../../../configs/HANDLE_CLICK_MAPPING.js';
import useListCourseUserMappings from '../../../../hooks/useListCourseUserMappings';
import CourseCard from '../../../CourseCard';

import styles from './styles.module.css';

function SimilarCourses({ course_details }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const router = useRouter();

	const [activeTab, setActiveTab] = useState('');

	const [input, setInput] = useState('');

	const { query, debounceQuery } = useDebounceQuery();

	const { HANDLE_CLICK_MAPPINGS } = HANDLE_CLICK_MAPPING();

	const topics = [];
	course_details?.faq_topics?.map((item) => (
		topics.push(item?.id)
	));

	const [params, setParams] = useState({
		filters: {
			status       : 'active',
			user_id,
			faq_topic_id : topics,
		},
	});

	const { data = {}, loading } = useListCourseUserMappings({ activeTab, params, query });

	const CAROUSELDATA = (data.list || []).map((item, index) => ({
		key    : index,
		render : () => (
			<CourseCard
				key={item.id}
				data={item}
				buttonContent={BUTTON_CONTENT_MAPPING[activeTab || 'default']}
				handleClick={HANDLE_CLICK_MAPPINGS[activeTab || 'default']}
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
