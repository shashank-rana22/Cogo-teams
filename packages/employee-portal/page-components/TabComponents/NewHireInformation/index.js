import { Accordion, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import AddressDetails from './AddressDetails';
import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

const DOC_MAPPING = ['aadhaar_card', 'pan_card'];

const KEY_COMPONENT_MAPPING = {
	personal_information     : PersonalInformation,
	identification_documents : IdentificationDocuments,
	address_details          : AddressDetails,
};

function RenderPills({ name, isCompleted, isDocsApproved }) {
	if (isCompleted) {
		return <Pill color="green">Completed</Pill>;
	}

	if (!isDocsApproved && name === 'identification_documents') {
		return <Pill color="orange">Waiting for approval</Pill>;
	}

	return <Pill color="yellow">Pending</Pill>;
}

function NewHireInformation({ setInformationPage, id, data, getEmployeeDetails }) {
	const { progress_stats = {}, documents } = data || {};
	const { personal_details = {} } = progress_stats;
	const {
		address_details = false,
		identification_documents = false,
		personal_information = false,
	} = personal_details;

	const CONTENT_MAPPING = [
		{
			name        : 'personal_information',
			isCompleted : personal_information,
		},
		{
			name        : 'identification_documents',
			isCompleted : identification_documents,
		},
		{
			name        : 'address_details',
			isCompleted : address_details,
		},
	];

	const isDocsApproved = (documents || []).filter((doc) => (
		DOC_MAPPING.includes(doc?.document_type))).every((ele) => (ele?.status === 'approved'));

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
				{CONTENT_MAPPING.map((item) => {
					const { isCompleted, name } = item;
					const Component = KEY_COMPONENT_MAPPING[name];

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

										<RenderPills
											isCompleted={isCompleted}
											name={name}
											isDocsApproved={isDocsApproved}
										/>
									</div>
								)}
								animate
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
