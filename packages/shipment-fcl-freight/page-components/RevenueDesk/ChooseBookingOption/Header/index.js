import React from 'react';
import getHoursElasped from '../../../../utils/revenueDeskUtils/getHoursElapsed';
import {IcMFtaskCompleted, IcMFtaskUnableToDo, IcMTimer} from '@cogoport/icons-react';
// import Chat from '../../../../commons/Layout/Chat';
import Details from './Details';
import StakeHolderDetails from './StakeHolderDetails';
import styles from './styles.module.css';
// import SopRevenueDesk from '../../Sop';

function Header({
	data, expanded, statsLoading, stats, activeTab,
}) {
	return (
		<div>
			<div className={styles.headerCon}>
				<div className={styles.headerLeft}>
					<div className={styles.headerText}>
						{stats?.length ? <IcMFtaskCompleted height={20} width={20}/> : <IcMFtaskUnableToDo  height={20} width={20}/>}

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

			<div className={styles.timerContainer}>
				{activeTab === 'pending' ? (
					<div>
						<IcMTimer />
					</div>
				) : null}

				<p className={styles.timerInfo}>
					{activeTab === 'pending'
						? `(Due ${getHoursElasped(
							data?.confirmed_by_importer_exporter_at,
						  )})`
						: ''}
				</p>
			</div>
			<Details data={data} />

			<StakeHolderDetails data={data} />

			{!statsLoading && stats?.length > 0 ? null : (
				<div className={styles.bookingOptionsText} style={{ opacity: expanded ? 0.5 : null }}>
					Booking Options Available (Select and Priortise Preferences)
				</div>
			)}

			{data?.is_flashed && !(stats?.length > 0) && !statsLoading ? (
				<div className={styles.flashedInformation}>
					<div className={styles.text}>Revert from Ongoing Flash Rates</div>

					<div>
						<div className={styles.loadingState} />
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