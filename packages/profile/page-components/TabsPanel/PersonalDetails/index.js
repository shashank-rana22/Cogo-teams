import React, { useState } from 'react';

import { personalInfo } from '../../../utils/info';
import { otherPersonalInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import EditModal from './EditModal';
import styles from './styles.module.css';

function PersonalDetails({ data = {}, loading = false, getEmployeeDetails }) {
	const [show, setShow] = useState(false);
	const [datatoedit, setDataToEdit] = useState({});
	const info = personalInfo;
	const otherInfo = otherPersonalInfo;

	const handleModal = () => {
		setShow(!show);
	};

	const handleClickDetails = (details) => {
		setDataToEdit(details);
		setShow(!show);
	};
	return (
		<>
			<div className={styles.tab_content}>
				<div className={styles.main_container}>
					<div className={styles.flex}>
						<div className={styles.heading}>
							<span className={styles.personal}>PERSONAL DETAILS</span>
							<span className={styles.detail}>View and manage employee details</span>
						</div>
					</div>
					<div className={styles.info_container}>
						{info.map(({ heading, details, key }) => (
							<div key={heading}>
								<DetailsCard
									heading={heading}
									details={details}
									data={data}
									loading={loading}
									key={heading}
									keyMapping={key}
									handleClickDetails={handleClickDetails}
								/>
							</div>
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

export default PersonalDetails;
