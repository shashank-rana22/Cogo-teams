import { IcMFtaskCompleted, IcMFtaskUnableToDo, IcMTimer } from '@cogoport/icons-react';
import React from 'react';

import getHoursElasped from '../../../../utils/revenueDeskUtils/getHoursElapsed';

import Details from './Details';
import StakeHolderDetails from './StakeHolderDetails';
import styles from './styles.module.css';
// import SopRevenueDesk from '../../Sop';

function Header({
	data, expanded, statsLoading, stats, activeTab,
}) {
	return (
		<div>

			<div className={styles.header_container}>
				<div className={styles.header_left}>
					<div className={styles.header_text}>
						{stats?.length
							? <IcMFtaskUnableToDo height={20} width={20} />
							: <IcMFtaskCompleted height={20} width={20} />}

						<div style={{ marginLeft: '5px' }}>
							{stats?.length
								? 'Choosen Booking Option'
								: 'Choose Booking Option'}
						</div>
					</div>
				</div>

				{/* <HeaderRight>
						<Chat />
						<SopRevenueDesk data={data} />
					</HeaderRight> */}
			</div>

			<div className={styles.timer_container}>
				{activeTab === 'pending' ? (
					<div>
						<IcMTimer />
					</div>
				) : null}

				<p className={styles.timer_info}>
					{activeTab === 'pending'
						? `(Due ${getHoursElasped(
							data?.confirmed_by_importer_exporter_at,
						)})`
						: ''}
				</p>
			</div>
			<Details data={data} />

			<StakeHolderDetails data={data} />

			{(!statsLoading && stats?.length > 0) ? null : (
				<div className={styles.booking_options_text} style={{ opacity: expanded ? 0.5 : null }}>
					Booking Options Available (Select and Priortise Preferences)
				</div>
			)}

			{data?.is_flashed && !(stats?.length > 0) && !statsLoading ? (
				<div className={styles.flashed_information}>
					<div className={styles.text}>Revert from Ongoing Flash Rates</div>

					<div>
						<div className={styles.loading_state} />
					</div>

					<div className={styles.text} style={{ fontSize: '12px' }}>
						Fetching More Supplier Rates....
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Header;
