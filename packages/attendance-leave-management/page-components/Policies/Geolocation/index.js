import { IcMArrowLeft, IcMArrowRight, IcMAppProfile, IcMLocation } from '@cogoport/icons-react';
// import { display } from 'cogo-admin/git-precommit-checks.config';
import React, { useState } from 'react';

import EmployeeList from '../EmployeeList';
// import GeoTabs from '../GeoTabs';

import styles from './styles.module.css';

const data = {
	tempaccess: [
		{
			id         : 1,
			teamname   : 'Temporary Access',
			num_people : 600,
			status     : 'active',
			location   : 'Mumbai, Gurgaon',
		},
	],
	Branches: [{
		id         : 1,
		teamname   : 'GGN Design Team',
		num_people : 500,
		status     : 'active',
		location   : 'Mumbai',
	}, {
		id         : 2,
		teamname   : 'Sales Team',
		num_people : 400,
		status     : 'inactive',
		location   : 'Gurugram',
	},

	],
};

function Geolocation({ handlePolicy }) {
	const [toAdd, setToAdd] = useState(false);
	const { tempaccess, Branches } = data;
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.left_header} aria-hidden onClick={() => handlePolicy('')}>
						<div><IcMArrowLeft width={20} height={20} /></div>
						<div className={styles.card_content}>
							{toAdd ? <span className={styles.above_text}>NEW COHORT</span>
								: <span className={styles.above_text}>GEOLOCATION</span>}
							<span className={styles.below_text}>Manage Geolocation access for employees</span>

						</div>

					</div>
				</div>
				{toAdd ? <EmployeeList /> : (
					<>
						{' '}
						<div className={styles.container}>
							<div className={styles.above_text}>Temporaray Access</div>
							{tempaccess.map((item) => (
								<div key={item.id} className={styles.card}>
									<div className={styles.card_container}>
										<div className={styles.card_content}>
											<div className={styles.left_card}>
												<div className={styles.location}>
													<span>{item.teamname}</span>
												</div>
											</div>
										</div>
										<div className={styles.below_text}>
											<IcMAppProfile />
											<span>{item.num_people}</span>
											<IcMLocation />
											<span>{item.location}</span>
										</div>
										<div><IcMArrowRight width={20} height={20} /></div>
									</div>
								</div>

							))}
						</div>
						<div className={styles.container}>
							<div className={styles.above_text}>BRANCHES</div>
							<div className={styles.branches_container}>
								{Branches.map((item) => (
									<div
										key={item.id}
										aria-hidden
										className={styles.card}
										onClick={() => setToAdd(true)}
									>
										<div className={styles.card_container}>
											<div className={styles.card_content}>
												<div className={styles.left_card}>
													<div className={styles.location}>
														<span>{item.location}</span>
													</div>
												</div>
											</div>
											<div className={styles.below_text}>
												<IcMAppProfile />
												<span>{item.num_people}</span>
											</div>
											<div><IcMArrowRight width={20} height={20} /></div>
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				)}

			</div>

		</div>

	);
}

export default Geolocation;
