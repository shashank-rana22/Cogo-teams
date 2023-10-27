import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import { employmentInfo } from '../../../utils/info';
import { otherEmploymentInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import EditModal from '../PersonalDetails/EditModal';
import RightGlance from '../RightGlance';

import EmploymentStatus from './EmploymentStatus';
import styles from './styles.module.css';

function EmploymentDetails({ data = {}, loading = false, getEmployeeDetails }) {
	const [show, setShow] = useState(false);
	const info = employmentInfo;
	console.log('🚀 ~ file: index.js:16 ~ EmploymentDetails ~ info:', info);
	const otherInfo = otherEmploymentInfo;
	const handleModal = () => {
		setShow(!show);
	};

	const [datatoedit, setDataToEdit] = useState({});

	const handleClickDetails = (details) => {
		setDataToEdit(details);
		setShow(!show);
	};

	console.log('info', info);

	return (
		<>
			<div className={styles.tab_content}>
				<div className={styles.main_container}>
					<div className={styles.heading}>
						<span className={styles.personal}>EMPLOYMENT DETAILS</span>
						<span className={styles.detail}>View and manage employee details</span>
					</div>
					<div className={styles.info_container}>
						{info.map(({ heading, details, key }, index) => (
							<>
								<DetailsCard
									heading={heading}
									details={details}
									data={data}
									loading={loading}
									key={heading}
									keyMapping={key}
									handleClickDetails={handleClickDetails}
								/>
								{(index === GLOBAL_CONSTANTS.zeroth_index)
									? <EmploymentStatus data={data} loading={loading} /> : null}
							</>
						))}
					</div>
				</div>
				<RightGlance otherInfo={otherInfo} data={data} loading={loading} />
			</div>
			{show && (
				<EditModal
					show={show}
					handleModal={handleModal}
					data={data}
					mappingKey={datatoedit}
					getEmployeeDetails={getEmployeeDetails}
				/>
			)}
		</>
	);
}

export default EmploymentDetails;
