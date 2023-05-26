import { Carousel, Tabs, TabPanel, Button } from '@cogoport/components';
import { IcMSort } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import LoadingState from '../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../configs/BUTTON_CONTENT_MAPPING';
import useListCourseCategory from '../../hooks/useListCourseCategory';
import CourseCard from '../CourseCard';

import styles from './styles.module.css';

function AllCourses() {
	const router = useRouter();

	const {
		finalCourseCategories:courseCategories = [],
	} = useListCourseCategory();

	const HANDLE_CLICK_MAPPING = {

		ongoing: (course_id) => {
			router.push(`/learning/course/${course_id}`);
		},
		mandatory: (course_id) => {
			router.push(`/learning/course/${course_id}`);
		},
		completed: (course_id) => {
			router.push(`/learning/course/${course_id}`);
		},
		saved: () => {},
	};

	// if (loading) {
	// 	return <LoadingState rowsCount={7} />;
	// }

	// const CAROUSELDATA = list.map((item, index) => ({
	// 	key    : index,
	// 	render : () => (
	// 		<CourseCard
	// 			key={item.id}
	// 			data={item}
	// 			buttonContent={BUTTON_CONTENT_MAPPING[activeTab]}
	// 			handleClick={HANDLE_CLICK_MAPPING[activeTab]}
	// 		/>
	// 	),
	// }));

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.main_heading}>All Courses</div>

				<div className={styles.btn_container}>
					<Button size="md" themeType="secondary">Ongoind Courses</Button>
					<Button size="md" themeType="secondary">Mandatory Courses</Button>

					<div className={styles.sort_by}>
						<IcMSort />
						<div>Sort By</div>
					</div>
				</div>
			</div>

			<div className={styles.tabs_container}>
				{courseCategories.map((category) => (

					<div className={styles.tab}>
						<h5>{category.name}</h5>
						<p className={styles.total_courses}>
							{category.number}
							{' '}
							courses
						</p>
					</div>

				))}
			</div>
		</div>
	);
}

export default AllCourses;
