import { Pagination } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import LoadingState from '../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../configs/BUTTON_CONTENT_MAPPING';
import GET_LINK_MAPPING from '../../configs/GET_LINK_MAPPING';
import useListCourseUserMappings from '../../hooks/useListCourseUserMappings';
import CourseCard from '../CourseCard';

import TagsSelect from './components/TagsSelect';
import styles from './styles.module.css';

function AllCourses({ currentCategory, setCurrentCategory, courseCategories, inputValue }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const router = useRouter();

	const [activeTab, setActiveTab] = useState();

	const [selected, setSelected] = useState('');
	const [page, setPage] = useState(1);

	const page_limit = 12;

	const clickOptions = (active, category, select) => {
		setActiveTab(active);
		setCurrentCategory(category);
		setSelected(select);
	};

	const {
		data = {},
		loading,
		fetchList,
	} = useListCourseUserMappings({
		activeTab,
		inputValue,
		selected,
		currentCategory,
		page_limit,
		page,
		user_id,
	});

	const GET_LINK_MAPPINGS = GET_LINK_MAPPING({ router });

	if (loading) {
		return <LoadingState rowsCount={7} />;
	}

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.main_heading}>All Courses</div>

				<div className={styles.btn_container}>
					<div
						role="presentation"
						onClick={() => { clickOptions('completed', 'all_courses', ''); }}
						className={`${styles.btn} ${activeTab === 'completed' ? styles.btn_active : null}`}
					>
						{activeTab === 'completed' ? <IcMTick height="20px" width="20px" /> : null}
						Completed
					</div>
					<div
						role="presentation"
						onClick={() => { clickOptions('ongoing', 'all_courses', ''); }}
						className={`${styles.btn} ${activeTab === 'ongoing' ? styles.btn_active : null}`}
					>
						{activeTab === 'ongoing' ? <IcMTick height="20px" width="20px" /> : null}
						Ongoing
					</div>
					<div
						role="presentation"
						onClick={() => { clickOptions('mandatory', 'all_courses', ''); }}
						className={`${styles.btn} ${activeTab === 'mandatory' ? styles.btn_active : null}`}
					>
						{activeTab === 'mandatory' ? <IcMTick height="20px" width="20px" /> : null}
						Mandatory
					</div>
				</div>
			</div>

			{!inputValue ? (
				<div className={styles.tabs_container}>
					{courseCategories?.map((category) => (
						<div
							role="presentation"
							className={`${styles.tab} ${currentCategory === category.id ? styles.active : ''}`}
							key={category.id}
							onClick={() => { clickOptions('', category.id, ''); }}
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
			) : null}

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
						viewType="all_courses"
						key={item.id}
						data={item}
						buttonContent={BUTTON_CONTENT_MAPPING[item.state] || BUTTON_CONTENT_MAPPING.default}
						handleClick={GET_LINK_MAPPINGS[item.state] || GET_LINK_MAPPINGS.default}
						fetchList={fetchList}
					/>
				))}
			</div>

			{data?.total_count > 12 && (
				<div className={styles.pagination_container}>
					<Pagination
						totalItems={data?.total_count || 0}
						currentPage={page || 1}
						pageSize={data?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			)}

		</div>
	);
}

export default AllCourses;
