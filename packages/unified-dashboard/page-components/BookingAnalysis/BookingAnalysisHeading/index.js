import FilterTabs from '../../../common/FilterTabs';

import PopoverFilter from './PopoverFilter';
import styles from './styles.module.css';

function BookingAnalysisHeading({
	heading = '',
	loading,
	setParams = () => {},
	params = {},
	selectedFilterTab,
	setSelectedFilterTab = () => {},
	isBookingAnalysis = true,
	enableFilter = true,
}) {
	return (
		<div>
			{isBookingAnalysis ? (
				<div className={styles.container}>
					<div className={styles.heading}>
						<div className={styles.heading_text}>
							{heading}
						</div>
						<div>
							<FilterTabs
								setFilters={setParams}
								filters={params}
								loading={loading}
								selectedFilterTab={selectedFilterTab}
								setSelectedFilterTab={setSelectedFilterTab}
							/>
						</div>
					</div>
					<PopoverFilter
						loading={loading}
						setParams={setParams}
						params={params}
					/>
				</div>
			) : (
				<div className={styles.not_container}>
					<div className={styles.not_heading}>
						<div className={styles.not_heading_text}>
							{heading}
						</div>
					</div>

					{enableFilter && (
						<div>
							<FilterTabs
								selectedFilterTab={selectedFilterTab}
								setSelectedFilterTab={setSelectedFilterTab}
								setFilters={setParams}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default BookingAnalysisHeading;
