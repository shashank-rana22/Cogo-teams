import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import LoadingState from '../../../../../commons/LoadingState';

import CategoryCard from './CategoryCard';
import styles from './styles.module.css';

const CARDS_TO_SHOW = 8;

function RightComponent({ data = {}, listLoading = false, setShowCoursesModal = () => {} }) {
	const router = useRouter();

	const { list = [] } = data || {};

	if (listLoading) {
		return <LoadingState rowsCount={3} />;
	}

	return (
		<div className={styles.container}>
			{list.map((item, index) => {
				if (index > CARDS_TO_SHOW) {
					return null;
				}

				if (index === CARDS_TO_SHOW) {
					return (
						<div
							key={item.id}
							role="presentation"
							className={styles.outer_container}
							onClick={() => {
								setShowCoursesModal(false);
								router.push('/learning/course?viewType=all_courses');
							}}
						>
							<div className={styles.see_all}>
								<div>
									See All
									{'  '}
								</div>

								<IcMArrowRight width={18} height={18} />
							</div>
						</div>
					);
				}

				return (
					<CategoryCard
						item={item}
						key={item.id}
					/>
				);
			})}
		</div>
	);
}

export default RightComponent;
