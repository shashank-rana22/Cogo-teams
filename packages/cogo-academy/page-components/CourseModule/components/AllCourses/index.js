import { Carousel, Tabs, TabPanel, Button, Tooltip, Pill } from '@cogoport/components';
import { IcMSort, IcMTick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import LoadingState from '../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../configs/BUTTON_CONTENT_MAPPING';
import useListCourseCategory from '../../hooks/useListCourseCategory';
import CourseCard from '../CourseCard';

import styles from './styles.module.css';

function AllCourses({ currentCategory, setCurrentCategory }) {
	const router = useRouter();

	const {
		finalCourseCategories:courseCategories = [],
	} = useListCourseCategory();

	const [activeTab, setActiveTab] = useState();

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
					<div
						role="presentation"
						onClick={() => setActiveTab('completed')}
						className={`${styles.btn} ${activeTab === 'completed' ? styles.btn_active : null}`}
					>
						{activeTab === 'completed' ? <IcMTick height="20px" width="20px" /> : null}
						Completed
					</div>
					<div
						role="presentation"
						onClick={() => setActiveTab('ongoing')}
						className={`${styles.btn} ${activeTab === 'ongoing' ? styles.btn_active : null}`}
					>
						{activeTab === 'ongoing' ? <IcMTick height="20px" width="20px" /> : null}
						Ongoing
					</div>
					<div
						role="presentation"
						onClick={() => setActiveTab('mandatory')}
						className={`${styles.btn} ${activeTab === 'mandatory' ? styles.btn_active : null}`}
					>
						{activeTab === 'mandatory' ? <IcMTick height="20px" width="20px" /> : null}
						Mandatory
					</div>
					<Button
						role="presentation"
						onClick={openOptions()}
						themeType="tertiary"
					>
						<IcMSort />
						<div>Sort By</div>
					</Button>
				</div>
			</div>
			<div className={styles.tabs_container}>
				{courseCategories?.map((category) => (
					<div
						role="presentation"
						className={`${styles.tab} ${currentCategory === category.name ? styles.active : ''}`}
						key={category.id}
						onClick={() => setCurrentCategory(category.name)}
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
					<div>
						{ currentCategory === category.name
							? category?.topics?.map((item) => (
								<Pill>{item.topic_name}</Pill>
							))
							: null}
					</div>

				))}
			</div>

		</div>
	);
}

export default AllCourses;
