import { IcMArrowLeft, IcMTeam, IcMLocation, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetBranchStats from '../../../hooks/useGetBranchStats';
import EmployeeList from '../EmployeeList';

import Locations from './Locations';
import styles from './styles.module.css';

const tempaccess = [
	{
		id         : 1,
		teamname   : 'Temporary Access',
		num_people : 500,
		status     : 'active',
		location   : 'Mumbai, Gurgaon',
	},
];

function Geolocation({ handlePolicy = () => {} }) {
	const [selectedLocation, setSelectedLocation] = useState('');
	const { loading, data } = useGetBranchStats();

	const handleBack = () => {
		if (isEmpty(selectedLocation)) {
			handlePolicy('');
		} else {
			setSelectedLocation('');
		}
	};

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.left_header} aria-hidden onClick={handleBack}>
						<div><IcMArrowLeft width={20} height={20} /></div>
						<div className={styles.card_content}>
							{selectedLocation ? <span className={styles.above_text}>Manager Access</span>
								: <span className={styles.above_text}>GEOLOCATION</span>}
							<span className={styles.below_text}>Manage Geolocation access for employees</span>
						</div>

					</div>
				</div>
				{isEmpty(selectedLocation) && (
					<div className={styles.container}>
						<div className={styles.above_text}>Temporary Access</div>
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
											<IcMTeam />
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
				)}

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
