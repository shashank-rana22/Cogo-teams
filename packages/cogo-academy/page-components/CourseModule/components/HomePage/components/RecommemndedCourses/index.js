import { Carousel } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../commons/EmptyState';
import LoadingState from '../../../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../../../configs/BUTTON_CONTENT_MAPPING';
import HANDLE_CLICK_MAPPING from '../../../../configs/HANDLE_CLICK_MAPPING';
import useListCourseUserMappings from '../../../../hooks/useListCourseUserMappings';
import CourseCard from '../../../CourseCard';

import styles from './styles.module.css';

function RecommendedComponents({ user_id }) {
	const { HANDLE_CLICK_MAPPINGS } = HANDLE_CLICK_MAPPING();

	const router = useRouter();

	const [activeTab, setActiveTab] = useState('');

	const [input, setInput] = useState('');

	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		filters: {
			status: 'active',
			user_id,
			// faq_topic_id : topics,
		},
	});

	const { data = {}, loading } = useListCourseUserMappings({ activeTab, params, query });

	if (loading) {
		return <LoadingState rowsCount={7} />;
	}

	if (isEmpty(data?.list || [])) {
		return (
			<EmptyState
				emptyText="There are no recommended courses currently"
				flexDirection="column"
				textSize="18px"
			/>
		);
	}

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

	return (
		<div className={styles.container}>
			<Carousel
				size="md"
				slides={CAROUSELDATA}
				itemsToShow={4}
				itemsToScroll={4}
				showDots={false}
				showArrow
			/>
		</div>
	);
}

export default RecommendedComponents;
