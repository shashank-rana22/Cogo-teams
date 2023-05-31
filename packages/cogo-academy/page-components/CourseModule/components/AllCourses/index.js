import { Carousel, Tabs, TabPanel, Button, Tooltip, Pill, Tags } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSort, IcMTick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import LoadingState from '../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../configs/BUTTON_CONTENT_MAPPING';
import HANDLE_CLICK_MAPPING from '../../configs/HANDLE_CLICK_MAPPING.JS';
// import useListCourseCategory from '../../hooks/useListCourseCategory';
import useListCourseUserMappings from '../../hooks/useListCourseUserMappings';
import CourseCard from '../CourseCard';

import FilterPopover from './components/FilterPopover';
import TagsSelect from './components/TagsSelect';
import styles from './styles.module.css';

function AllCourses({ currentCategory, setCurrentCategory, courseCategories }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const router = useRouter();

	const [activeTab, setActiveTab] = useState();
	const [filters, setFilters] = useState('');

	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});

	const { data = {}, loading } = useListCourseUserMappings({ activeTab, params, query });

	const { HANDLE_CLICK_MAPPINGS } = HANDLE_CLICK_MAPPING();

	if (loading) {
		return <LoadingState rowsCount={7} />;
	}

	console.log('data1', activeTab);
	console.log('data2', currentCategory);

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.main_heading}>All Courses</div>

				<div className={styles.btn_container}>
					<div
						role="presentation"
						onClick={() => { setActiveTab('completed'); setCurrentCategory('all_courses'); }}
						className={`${styles.btn} ${activeTab === 'completed' ? styles.btn_active : null}`}
					>
						{activeTab === 'completed' ? <IcMTick height="20px" width="20px" /> : null}
						Completed
					</div>
					<div
						role="presentation"
						onClick={() => { setActiveTab('ongoing'); setCurrentCategory('all_courses'); }}
						className={`${styles.btn} ${activeTab === 'ongoing' ? styles.btn_active : null}`}
					>
						{activeTab === 'ongoing' ? <IcMTick height="20px" width="20px" /> : null}
						Ongoing
					</div>
					<div
						role="presentation"
						onClick={() => { setActiveTab('mandatory'); setCurrentCategory('all_courses'); }}
						className={`${styles.btn} ${activeTab === 'mandatory' ? styles.btn_active : null}`}
					>
						{activeTab === 'mandatory' ? <IcMTick height="20px" width="20px" /> : null}
						Mandatory
					</div>

					<FilterPopover
						filters={filters}
						setFilters={setFilters}
					/>

				</div>
			</div>

			<div className={styles.tabs_container}>
				{courseCategories?.map((category) => (
					<div
						role="presentation"
						className={`${styles.tab} ${currentCategory === category.name ? styles.active : ''}`}
						key={category.id}
						onClick={() => { setActiveTab(''); setCurrentCategory(category.name); }}
					>
						<h4><div className={styles.overflow}>{startCase(category.name)}</div></h4>
						<p className={styles.total_courses}>
							{category.course_count}
							{' '}
							courses
						</p>
					</div>

				))}
			</div>

			<div className={styles.pill}>
				{courseCategories?.map((category) => (
					currentCategory === category.name
						? 						(
							<TagsSelect
								category={category}
							/>
						)
						: null
				))}
			</div>

			<div className={styles.carousel_container}>
				{(data.list || []).map((item) => (
					<CourseCard
						key={item.id}
						data={item}
						buttonContent={BUTTON_CONTENT_MAPPING[activeTab || 'default']}
						handleClick={HANDLE_CLICK_MAPPINGS[activeTab || 'default']}
					/>
				))}
			</div>

		</div>
	);
}

export default AllCourses;
