import { IcMArrowLeft, IcMAppProfile, IcMLocation, IcMArrowRight } from '@cogoport/icons-react';
// import { display } from 'cogo-admin/git-precommit-checks.config';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetBranchStats from '../../../hooks/useGetBranchStats';
import EmployeeList from '../EmployeeList';

// eslint-disable-next-line import/order
/* eslint-disable */
import Locations from './Locations';
// import GeoTabs from '../GeoTabs';

import styles from './styles.module.css';

const tempaccess = [
	{
		id         : 1,
		teamname   : 'Temporary Access',
		num_people : 600,
		status     : 'active',
		location   : 'Mumbai, Gurgaon',
	},
];

function Geolocation({ handlePolicy }) {
	const [selectedLocation, setSelectedLocation] = useState('');
	const { loading, data } = useGetBranchStats();
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.left_header} aria-hidden onClick={() => handlePolicy('')}>
						<div><IcMArrowLeft width={20} height={20} /></div>
						<div className={styles.card_content}>
							{selectedLocation ? <span className={styles.above_text}>NEW COHORT</span>
								: <span className={styles.above_text}>GEOLOCATION</span>}
							<span className={styles.below_text}>Manage Geolocation access for employees</span>

						</div>

					</div>
				</div>
				<div className={styles.container}>
					<div className={styles.above_text}>Temporaray Access</div>
					{ tempaccess.map((item) => (
						<div key={item.id} className={styles.card}>
							<div className={styles.card_container}>

								<div className={styles.card_content}>
									<div className={styles.left_card}>
										<div className={styles.location}>
											<span>{item.teamname}</span>
										</div>
									</div>
								</div>
								<div className={styles.arrow_section}>
									<div className={styles.below_text}>
										<IcMAppProfile />
										<span>{item.num_people}</span>
										<IcMLocation />
										<span>{item.location}</span>
									</div>
									<div><IcMArrowRight width={20} height={20} /></div>
								</div>
							</div>
						</div>

					))}
				</div>
				{!isEmpty(selectedLocation) ? <EmployeeList selectedLocation={selectedLocation} /> : (
					<Locations
						data={data}
						setSelectedLocation={setSelectedLocation}
						loading={loading}
					/>
				)}

			</div>

		</div>

	);
}

export default Geolocation;
