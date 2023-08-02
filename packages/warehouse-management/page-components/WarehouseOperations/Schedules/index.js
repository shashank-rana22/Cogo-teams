import { Button } from '@cogoport/components';
// import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import List from '../../../commons/List';
import scheduleFields from '../../../configurations/schedule-fields';
import useListSchedules from '../../../hooks/useListSchedules';

import styles from './styles.module.css';
import TruckInModal from './TruckInModal';

function Schedules({
	activeTab = 'configure',
	truckStatus = 'truck_in',
	searchValue = '',
}) {
	const { fields } = scheduleFields;
	const [truckIn, setTruckIn] = useState(false);

	const functions = {
		handleTruckStatus: (item) => (
			<>
				{truckStatus === 'truck_in' && (
					<Button
						themeType="linkUi"
						style={{ fontSize: 12 }}
						onClick={() => {
							<TruckInModal
								truckIn={truckIn}
								setTruckIn={setTruckIn}
								item={item}
							/>;
						}}
					>
						Truck-in
					</Button>
				)}
				{truckStatus === 'truck_out' && (
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

	const { data, loading, page, setPage, total_count } = useListSchedules(activeTab, truckStatus, searchValue);
	const handlePageChange = (pageVal) => {
		setPage(pageVal);
	};

	return (
		<div className={styles.body_container}>
			{loading ? <div>nodf</div> : (
				<div className={styles.details_list}>
					<List
						fields={fields}
						activeTab={activeTab}
						truckStatus={truckStatus}
						data={data}
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
