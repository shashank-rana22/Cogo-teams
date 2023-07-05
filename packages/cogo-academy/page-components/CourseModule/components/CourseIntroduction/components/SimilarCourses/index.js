import { Carousel } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../commons/EmptyState';
import LoadingState from '../../../../commons/LoadingState';

import styles from './styles.module.css';
import useHandleSimilarCourses from './useHandleSimilarCourses';

function SimilarCourses({ course_details }) {
	const {
		loading,
		CAROUSELDATA,
		data,
	} = useHandleSimilarCourses({ course_details });

	if (loading) {
		return <LoadingState rowsCount={2} />;
	}

	return (
		<div className={styles.container}>
			<b style={{ marginLeft: '8px' }}>Similar Courses</b>

			{isEmpty(data.list)
				? (
					<EmptyState
						emptyText="No similar courses found"
						flexDirection="column"
						textSize="20px"
					/>
				) : (
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
				)}
		</div>
	);
}

export default SimilarCourses;
