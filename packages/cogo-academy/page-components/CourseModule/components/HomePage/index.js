import { Carousel, Tabs, TabPanel, Placeholder, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import LoadingState from '../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../configs/BUTTON_CONTENT_MAPPING';
import HANDLE_CLICK_MAPPING from '../../configs/HANDLE_CLICK_MAPPING.JS';
import TABS_MAPPING from '../../configs/TABS_MAPPING';
import useListCourseUserMappings from '../../hooks/useListCourseUserMappings';
import CategoryCard from '../CategoryCard';
import CourseCard from '../CourseCard';

import RecommemndedCourses from './components/RecommemndedCourses';
import styles from './styles.module.css';

function HomePage({ user_id, CourseCategoryData }) {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('ongoing');

	const [input, setInput] = useState('');

	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});
	const { HANDLE_CLICK_MAPPINGS } = HANDLE_CLICK_MAPPING();

	const { data = {}, loading } = useListCourseUserMappings({ activeTab, params, query });

	const CAROUSELDATA = (data.list || []).map((item, index) => ({
		key    : index,
		render : () => (
			<CourseCard
				key={item.id}
				data={item}
				buttonContent={BUTTON_CONTENT_MAPPING[activeTab]}
				handleClick={HANDLE_CLICK_MAPPINGS[activeTab]}
			/>
		),
	}));

	if (loading) {
		return <LoadingState rowsCount={1} />;
	}

	return (
		<div>
			<div>
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
									{loading
										? (
											<LoadingState />
										)
										: (
											<Carousel
												size="md"
												slides={CAROUSELDATA}
												itemsToShow={4}
												itemsToScroll={4}
												showDots={false}
												showArrow
											/>
										)}
								</div>
							</TabPanel>
						))}
					</Tabs>
				</div>
			</div>

			<div>
				<div className={styles.main_heading}>Explore Courses</div>
				<div className={styles.category_head}>
					<div style={{ color: '#6FA5AB' }}>By Category</div>
					<Button
						themeType="tertiary"
					>
						See All
						{' '}
						<IcMArrowRight />
					</Button>
				</div>
				<CategoryCard CourseCategoryData={CourseCategoryData} />
			</div>

			<div>
				<div className={styles.category_head}>
					<div style={{ color: '#6FA5AB' }}>Recommended for You</div>
					<div className={styles.category_head}>
						See All
						{' '}
						<IcMArrowRight />
					</div>
				</div>

				<div>
					<RecommemndedCourses />
				</div>
			</div>
		</div>

	);
}

export default HomePage;
