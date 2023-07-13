import { Button, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetEmployeeLevels from './hooks/useGetEmployeeLevels';
import useGetRatingCycles from './hooks/useGetRatingCycles';
import useGetRatingReviewDetails from './hooks/useGetRatingReviewDetails';
import usePublishRatings from './hooks/usePublicRatings';
import KraModal from './KraModal';
import RenderVerticalHeadComponent from './RenderVerticalHeadComponent';
import styles from './styles.module.css';

function PerformanceRatingReview() {
	const {
		selectOptions,
		selectValue,
		setSelectValue,
		selectedEmployees,
		setSelectedEmployees,
		show,
		setShow,
		level,
	} = useGetEmployeeLevels();

	const {
		ratingCycleOptions,
		selectCycle,
		setSelectCycle,
	} = useGetRatingCycles({ });

	const { data } = useGetRatingReviewDetails({ selectValue, level, selectCycle });

	const {
		loading: Publish,
		publishRatings,
		toggleVal,
		setToggleVal,
	} = usePublishRatings({ selectedEmployees, level, data, selectCycle });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Performance Rating Review
			</div>

			<div className={styles.select_row}>
				<div className={styles.select_container}>
					<Select
						value={selectValue}
						onChange={setSelectValue}
						options={selectOptions}
					/>
				</div>

				<div className={styles.level}>
					<div className={styles.ratings_cycles}>
						<Select
							value={selectCycle}
							onChange={setSelectCycle}
							options={ratingCycleOptions}
							width="100px"
						/>
					</div>

					<div className={styles.publish_button}>
						<Button
							disabled={isEmpty(selectedEmployees)}
							onClick={publishRatings}
							loading={Publish}
						>
							Publish

						</Button>
					</div>
				</div>
			</div>

			<RenderVerticalHeadComponent
				list={data}
				setSelectedEmployees={setSelectedEmployees}
				selectedEmployees={selectedEmployees}
				level={level}
				setShow={setShow}
				toggleVal={toggleVal}
				setToggleVal={setToggleVal}
			/>

			{show ? <KraModal show={show} setShow={setShow} selectCycle={selectCycle} /> : null}
		</div>
	);
}

export default PerformanceRatingReview;
