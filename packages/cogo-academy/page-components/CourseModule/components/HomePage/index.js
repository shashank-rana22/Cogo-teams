import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import CategoryCard from '../CategoryCard';

import MyCourses from './components/MyCourses';
import RecommemndedCourses from './components/RecommemndedCourses';
import styles from './styles.module.css';

function HomePage({ user_id, courseCategoryData, categoryLoading, setCurrentCategory }) {
	const router = useRouter();

	const [ongoingCategories, setOngoingCategories] = useState({ loaded: false, data: [] });

	return (
		<div>
			<MyCourses
				user_id={user_id}
				setOngoingCategories={setOngoingCategories}
				ongoingCategories={ongoingCategories}
			/>

			<div style={{ margin: '60px 0px' }}>
				<div className={styles.main_heading}>Explore Courses</div>

				<div className={styles.category_head}>
					<div className={styles.sub_category}>By Category</div>

					<Button
						themeType="tertiary"
						onClick={() => router.push('/learning/course?viewType=all_courses')}
					>
						See All
						{' '}
						<IcMArrowRight />
					</Button>
				</div>

				<CategoryCard
					courseCategoryData={courseCategoryData}
					categoryLoading={categoryLoading}
					setCurrentCategory={setCurrentCategory}
				/>
			</div>

			<div>
				<div className={styles.category_head}>
					<div className={styles.sub_category}>Recommended for You</div>
					<Button
						themeType="tertiary"
						onClick={() => router.push('/learning/course?viewType=all_courses')}
					>
						See All
						{' '}
						<IcMArrowRight />
					</Button>
				</div>

				<RecommemndedCourses
					user_id={user_id}
					ongoingCategories={ongoingCategories}
				/>
			</div>
		</div>

	);
}

export default HomePage;
