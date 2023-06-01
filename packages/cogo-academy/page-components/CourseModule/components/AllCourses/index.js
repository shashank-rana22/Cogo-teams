import { useDebounceQuery } from '@cogoport/forms';
import { IcMTick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import LoadingState from '../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../configs/BUTTON_CONTENT_MAPPING';
import HANDLE_CLICK_MAPPING from '../../configs/HANDLE_CLICK_MAPPING';
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
	const [selected, setSelected] = useState('');

	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});
	const ClickOptions = (active, category, select) => {
		setActiveTab(active);
		setCurrentCategory(category);
		setSelected(select);
	};

	const { data = {}, loading } = useListCourseUserMappings({ activeTab, params, query, selected, currentCategory });

	const { HANDLE_CLICK_MAPPINGS } = HANDLE_CLICK_MAPPING();

	if (loading) {
		return <LoadingState rowsCount={7} />;
	}

	// console.log('data1', activeTab);
	// console.log('data2', currentCategory);
	console.log('data3', courseCategories);
	// console.log('params', params);
	// console.log('selected', selected);
	// console.log('parafiltersms', filters);

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.main_heading}>All Courses</div>

				<div className={styles.btn_container}>
					<div
						role="presentation"
						onClick={() => { ClickOptions('completed', 'all_courses', ''); }}
						className={`${styles.btn} ${activeTab === 'completed' ? styles.btn_active : null}`}
					>
						{activeTab === 'completed' ? <IcMTick height="20px" width="20px" /> : null}
						Completed
					</div>
					<div
						role="presentation"
						onClick={() => { ClickOptions('ongoing', 'all_courses', ''); }}
						className={`${styles.btn} ${activeTab === 'ongoing' ? styles.btn_active : null}`}
					>
						{activeTab === 'ongoing' ? <IcMTick height="20px" width="20px" /> : null}
						Ongoing
					</div>
					<div
						role="presentation"
						onClick={() => { ClickOptions('mandatory', 'all_courses', ''); }}
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
						className={`${styles.tab} ${currentCategory === category.id ? styles.active : ''}`}
						key={category.id}
						onClick={() => { ClickOptions('', category.id, ''); }}
					>
						<h4><div className={styles.overflow}>{startCase(category.name)}</div></h4>
						{ category.name === 'all_courses'
							? null
							: (
								<p className={styles.total_courses}>
									{category.course_count}
									{' '}
									courses
								</p>
							)}
					</div>

				))}
			</div>

			<div className={styles.pill}>
				{courseCategories?.map((category) => (
					currentCategory === category.id
						? 						(
							<TagsSelect
								category={category}
								selected={selected}
								setSelected={setSelected}
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
