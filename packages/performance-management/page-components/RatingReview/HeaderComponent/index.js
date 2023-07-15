import { Button, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetRatingCycles from '../hooks/useGetRatingCycles';
import useGetRatingReviewDetails from '../hooks/useGetRatingReviewDetails';
import usePublishRatings from '../hooks/usePublicRatings';
import KraModal from '../KraModal';
import RenderVerticalHeadComponent from '../RenderVerticalHeadComponent';

import styles from './styles.module.css';

const EMPLOYEES_OPTIONS = [{ label: 'All Employees', value: 'all_employees' }];

function HeaderComponent({ props = {} }) {
	const {
		selectValue, level, selectedEmployees, setSelectValue, selectOptions, setSelectedEmployees,
		setShow, show, activeTab,
	} = props || {};

	const {
		ratingCycleOptions,
		selectCycle,
		setSelectCycle,
	} = useGetRatingCycles({ });

	const { data, fetchRatingReviewDetails, loading: getRatingApiLoading } = useGetRatingReviewDetails(
		{ selectValue, level, selectCycle, activeTab },
	);

	const {
		loading: publishButtonLoading,
		publishRatings,
		toggleVal,
		setToggleVal,
	} = usePublishRatings({ selectedEmployees, level, data, selectCycle, activeTab, fetchRatingReviewDetails });

	return (
		<div>
			<div className={styles.select_row}>
				<div className={styles.select_container}>
					<Select
						value={selectValue}
						onChange={setSelectValue}
						options={activeTab === 'vertical_head' ? selectOptions : EMPLOYEES_OPTIONS}
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
							loading={publishButtonLoading}
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
				activeTab={activeTab}
				getRatingApiLoading={getRatingApiLoading}
			/>

			{show ? (
				<KraModal
					show={show}
					setShow={setShow}
					selectCycle={selectCycle}
					fetchRatingReviewDetails={fetchRatingReviewDetails}
				/>
			) : null}
		</div>
	);
}

export default HeaderComponent;
