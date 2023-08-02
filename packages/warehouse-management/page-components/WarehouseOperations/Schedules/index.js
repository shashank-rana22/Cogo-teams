import { Button } from '@cogoport/components';
// import { IcMEdit } from '@cogoport/icons-react';

import List from '../../../commons/List';
import scheduleFields from '../../../configurations/schedule-fields';

import styles from './styles.module.css';

function Schedules({
	// data = {},
	// handlePageChange = () => {},
	// page = 1,
	// setPage = () => {},
	activeTab = 'configure',
	truckStatus = 'truck_in',
}) {
	const { fields } = scheduleFields;

	const functions = {
		handleTruckStatus: () => (
			<>
				{truckStatus === 'truck_in' && (
					<Button
						themeType="linkUi"
						style={{ fontSize: 12 }}
						// onClick={() => { handleOnEdit(singleItem); }}
					>
						Truck-in
					</Button>
				)}
				{truckStatus === 'truck_in' && (
					<Button
						themeType="linkUi"
						style={{ fontSize: 12 }}
						// onClick={() => { handleOnEdit(singleItem); }}
					>
						Truck-out
					</Button>
				)}
			</>
		),
	};

	const DATA = {}; // This is actually obtained from the hook
	const { loading, page, setPage, total_count } = DATA;
	const handlePageChange = (pageVal) => {
		setPage(pageVal);
	};

	return (
		<div className={styles.body_container}>
			{loading ? <div>tejo</div> : (
				<div className={styles.details_list}>
					<List
						fields={fields}
						activeTab={activeTab}
						data={DATA}
						loading={loading}
						total_count={total_count}
						page={page}
						setPage={setPage}
						functions={functions}
						handlePageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}

export default Schedules;
