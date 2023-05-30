import { Carousel, Tabs, TabPanel, Button, Tooltip } from '@cogoport/components';
import { IcMSort } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import LoadingState from '../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../configs/BUTTON_CONTENT_MAPPING';
import useListCourseCategory from '../../hooks/useListCourseCategory';
import CourseCard from '../CourseCard';

import styles from './styles.module.css';

function AllCourses({ currentCategory, setCurrentCategory, courseCategories }) {
	const router = useRouter();

	// const {
	// 	finalCourseCategories:courseCategories = [],
	// } = useListCourseCategory();

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
	// }))

	const openOptions = () => {
		<Tooltip content="Tool tip" placement="top" />;
	};

	console.log('courseCategories', courseCategories);

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.main_heading}>All Courses</div>

				<div className={styles.btn_container}>
					<Button size="md" themeType="secondary" style={{ margin: '10px' }}>Completed</Button>
					<Button size="md" themeType="secondary" style={{ margin: '10px' }}>Ongoing</Button>
					<Button size="md" themeType="secondary" style={{ margin: '10px' }}>Mandatory</Button>
					<Button
						size="md"
						themeType="tertiary"
						style={{ margin: '10px' }}
						onClick={openOptions()}
					>
						<IcMSort />
						<div>Sort By</div>
					</Button>
				</div>
			</div>

			{/* <div className={styles.tabs_container}>
				{courseCategories.map((category) => (

					<div
						role="presentation"
						className={`${styles.tab} ${currentCategory === category.name ? styles.active : ''}`}
						key={category.id}
						onClick={() => setCurrentCategory(category.name)}
					>
						<h4><div className={styles.overflow}>{startCase(category.name)}</div></h4>
						<p className={styles.total_courses}>
							{category.number}
							{' '}
							courses
						</p>
					</div>

				))}
			</div> */}
		</div>
	);
}

export default AllCourses;
