import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import { otherEducationInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import EducationDetailsEdit from '../EducationDetailsEdit';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';
import useGetEducationInfo from './useGetEducationInfo';

function EducationDetails({ data = {}, loading = false, getEmployeeDetails = () => {} }) {
	const { employee_detail } = data || {};
	const { employee_education_details } = employee_detail || {};
	const [show, setShow] = useState(false);

	console.log(employee_education_details, 'detailsEmployee');

	const info = useGetEducationInfo(employee_education_details);
	const otherInfo = otherEducationInfo;
	const [detailsToEdit, setDetailsToEdit] = useState(null);

	const handleClickDetails = ({ heading }) => {
		setShow(true);
		const detailsInfo = info.find((item) => item.heading === heading);
		setDetailsToEdit(detailsInfo);
	};

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.flex}>
					<div className={styles.heading}>
						<span className={styles.personal}>EDUCATION DETAILS</span>
						<span className={styles.detail}>View and manage educational details</span>
					</div>
				</div>
				{
					!isEmpty(employee_education_details) ? (
						<div className={styles.info_container}>
							{info?.map(({ heading, details }) => (
								<div key={heading}>
									<DetailsCard
										heading={heading}
										details={details}
										data={data}
										loading={loading}
									/>
									<Button
										className={styles.info_button}
										size="md"
										themeType="secondary"
										onClick={() => handleClickDetails({ heading, details })}
									>
										<IcMEdit style={{ marginRight: '5px' }} />
										Edit
									</Button>
								</div>
							))}
						</div>
					) : (<EmptyState />)
				}
			</div>
			<RightGlance otherInfo={otherInfo} data={data} loading={loading} />
			{
					!isEmpty(detailsToEdit) && (
						<EducationDetailsEdit
							heading={detailsToEdit.heading}
							details={detailsToEdit.details}
							data={data}
							detailsToEdit={detailsToEdit}
							key={detailsToEdit.heading}
							loading={loading}
							show={show}
							setShow={setShow}
							getEmployeeDetails={getEmployeeDetails}
						/>
					)
			}
		</div>
	);
}

export default EducationDetails;
