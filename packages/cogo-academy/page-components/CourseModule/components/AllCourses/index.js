import { Chips, Pagination } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import LoadingState from '../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../configs/BUTTON_CONTENT_MAPPING';
import CourseCard from '../CourseCard';

import styles from './styles.module.css';
import useHandleAllCourses from './useHandleAllCourses';

const MAPPING = ['completed', 'ongoing', 'mandatory'];

function AllCourses({ currentCategory, setCurrentCategory, courseCategories, inputValue }) {
	const {
		categoryTopics,
		clickOptions,
		loading,
		fetchList,
		data,
		setPage,
		selected,
		setSelected,
		activeTab,
		page = 1,
	} = useHandleAllCourses({ inputValue, currentCategory, courseCategories, setCurrentCategory });

	if (loading) {
		return <LoadingState rowsCount={6} />;
	}

	const { total_count = 0, page_limit = 12, list = [] } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_heading}>All Courses</div>

				<div className={styles.btn_container}>
					{MAPPING.map((item) => (
						<div
							key={item}
							role="presentation"
							onClick={() => clickOptions(item, 'all_courses', '')}
							className={`${styles.btn} ${activeTab === item ? styles.btn_active : null}`}
						>
							{activeTab === item ? <IcMTick height="20px" width="20px" /> : null}
							{startCase(item)}
						</div>
					))}
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

			{!inputValue ? (
				<div className={styles.chips_container}>
					<Chips
						enableMultiSelect
						items={categoryTopics}
						selectedItems={selected}
						onItemChange={setSelected}
					/>
				</div>
			) : null}

			<div className={styles.carousel_container}>
				{list.map((item) => (
					<CourseCard
						viewType="all_courses"
						key={item.id}
						data={item}
						buttonContent={BUTTON_CONTENT_MAPPING[item.state] || BUTTON_CONTENT_MAPPING.default}
						fetchList={fetchList}
					/>
				))}
			</div>

			{total_count > page_limit && (
				<div className={styles.pagination_container}>
					<Pagination
						totalItems={total_count}
						currentPage={page}
						pageSize={page_limit}
						onPageChange={setPage}
					/>
				</div>
			)}

		</div>
	);
}

export default AllCourses;
