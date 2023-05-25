import { Carousel, Tabs, TabPanel } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LoadingState from '../../commons/LoadingState';

import CourseCard from './components/CourseCard';
import CoursesModal from './components/CoursesModal';
import Header from './components/Header';
import BUTTON_CONTENT_MAPPING from './configs/BUTTON_CONTENT_MAPPING';
import TABS_MAPPING from './configs/TABS_MAPPING';
import useListCourseUserMappings from './hooks/useListCourseUserMappings';
import styles from './styles.module.css';

function CourseModule() {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const router = useRouter();

	const [activeTab, setActiveTab] = useState('ongoing');
	const [showCoursesModal, setShowCoursesModal] = useState(false);
	const [input, setInput] = useState('');
	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});

	const { query, debounceQuery } = useDebounceQuery();

	const { data, loading } = useListCourseUserMappings({ activeTab, params, query });

	const { list = [] } = data || {};

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

	if (loading) {
		return <LoadingState rowsCount={7} />;
	}

	const CAROUSELDATA = list.map((item, index) => ({
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

	return (
		<div className={styles.container}>
			<Header setShowCoursesModal={setShowCoursesModal} />

			<div className={styles.main_heading}>My Courses</div>

			<div>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					{TABS_MAPPING.map(({ name, title }) => (
						<TabPanel key={name} name={name} title={title}>
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
						</TabPanel>
					))}
				</Tabs>
			</div>

			{showCoursesModal ? (
				<CoursesModal
					showCoursesModal={showCoursesModal}
					setShowCoursesModal={setShowCoursesModal}
				/>
			) : null}
		</div>
	);
}

export default CourseModule;
