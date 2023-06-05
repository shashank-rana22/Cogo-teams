import { Accordion, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import AddressDetails from './AddressDetails';
import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

function NewHireInformation({ setInformationPage, id, data, getEmployeeDetails }) {
	const { progress_stats = {}, documents } = data || {};
	const {
		personal_details = {},
	} = progress_stats;
	const {
		address_details = false,
		identification_documents = false,
		personal_information = false,
	} = personal_details;
	const content_mapping = [
		{
			name        : 'personal_information',
			content     : PersonalInformation,
			isCompleted : personal_information,
		},
		{
			name        : 'identification_documents',
			content     : IdentificationDocuments,
			isCompleted : identification_documents,
		},
		{
			name        : 'address_details',
			content     : AddressDetails,
			isCompleted : address_details,
		},
	];

	const isDocsApproved = (documents || []).filter((doc) => (
		['aadhaar_card', 'pan_card'].includes(doc?.document_type))).every((ele) => (ele?.status === 'approved'));

	const renderPills = ({ name, isCompleted }) => {
		if (isCompleted) {
			return <Pill color="green">Completed</Pill>;
		}

		if (!isDocsApproved && name === 'identification_documents') {
			return <Pill color="orange">Waiting for approval</Pill>;
		}

		return <Pill color="yellow">Pending</Pill>;
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>NEW HIRE INFORMATION</div>
			</div>
			<div className={styles.subcontainer}>

				{content_mapping.map((item) => {
					const { content: Component, isCompleted, name } = item;

					return (
						<div
							key={name}
							role="presentation"
							className={styles.accordion}
						>
							<Accordion
								type="text"
								title={(
									<div className={styles.status}>
										<div className={styles.accordion_title}>{startCase(name)}</div>

										{renderPills({ isCompleted })}

									</div>
								)}
								animate={false}
							>
								<Component
									id={id}
									data={data}
									getEmployeeDetails={getEmployeeDetails}
								/>
							</Accordion>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default NewHireInformation;
