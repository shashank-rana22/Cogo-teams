import { Tabs, TabPanel, Input } from '@cogoport/components';
import React, { useState } from 'react';
import {IcMSearchlight} from '@cogoport/icons-react';
import CompletedJobs from './CompletedJobs';
import PendingJobs from './PendingJobs';
import styles from './styles.module.css';

function RevenueList({
	hookSetters = () => {},
	loading = false,
	listData = [],
	setShowBookingOption = () => {},
	total,
	page = 1,
	filters = {},
	refetch = () => {},
	setClickedCard = () => {},
	clickedCard,
	setActiveTab = () => {},
	activeTab = 'pending',
	controls = [],
	shipment_type,
}) {

	const [showFilters, setShowFilters] = useState(false);
	const [serialId, setSerialId] = useState('');



	const handleChangeSerial = (value) => {
		console.log(value);
		hookSetters.setFilters({ q: value });
		setSerialId(value);
	};
	
	return (
		<div>
			<div className={styles.heading}>
				FCL Revenue Desk    
			</div>
			<div className={styles.row}>

				<div className={styles.input}>
					<Input
						name="q"
						value={serialId}
						onChange={(e) => handleChangeSerial(e)}
						placeholder="Search by SID"
						style={{ width: '300px' }}
						inputIcon={<IcMSearchlight style={{ marginTop: '5px' }} />}
					/>
				</div>

				{/* <Popover
						render={renderBody()}
						className="primary_md"
						placement="bottom"
					>
					<FclFilters onClick={() => setShowFilters(!showFilters)}>
							<FilterIcon />
					</FclFilters>
					</Popover> */}

			</div>



			<Tabs
				activeTab={activeTab}
				onChange={(tab) => setActiveTab(tab)}
			>
				<TabPanel name="pending" title={<div className={styles.tab_label}>Pending Jobs</div>}>
					<PendingJobs
						setShowBookingOption={setShowBookingOption}
						total={total}
						data={listData}
						hookSetters={hookSetters}
						filters={filters}
						refetch={refetch}
						page={page}
						activeTab={activeTab}
						setClickedCard={setClickedCard}
						clickedCard={clickedCard}
						shipment_type={shipment_type}
					/>
				</TabPanel>

				<TabPanel name="completed" title={<div className={styles.tab_label}>Completed Jobs</div>}>
					<CompletedJobs
								setShowBookingOption={setShowBookingOption}
								total={total}
								data={listData}
								hookSetters={hookSetters}
								filters={filters}
								refetch={refetch}
								page={page}
								activeTab={activeTab}
								setClickedCard={setClickedCard}
								clickedCard={clickedCard}
								shipment_type={shipment_type}
							/>
				</TabPanel>
			</Tabs>

			<div>

			</div>

		</div>
	);
}
export default RevenueList;
