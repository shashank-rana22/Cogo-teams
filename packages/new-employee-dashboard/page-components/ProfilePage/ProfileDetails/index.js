import { Accordion, Pill, Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EditIdentificationDocuments from './EditIdentificationDocuments';
import IdentificationDocuments from './IdentificationDocuments';
import PersonalDetails from './PersonalDetails';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

const DOC_MAPPING = ['aadhaar_card', 'pan_card'];

function RenderPills({ name = '', isCompleted = false, isDocsApproved }) {
	if (isCompleted) {
		return <Pill color="green">Completed</Pill>;
	}

	if (!isDocsApproved && name === 'identification_documents') {
		return <Pill color="orange">Approval Pending</Pill>;
	}

	return <Pill color="yellow">Pending</Pill>;
}

function ProfileDetails({ loading, profileData, getEmployeeDetails, getEmployeeDetailsLoading }) {
	const [show, setShow] = useState(false);

	const { progress_stats = {}, documents } = profileData || {};
	const {
		personal_details = {},
	} = progress_stats;

	const {
		address_details = false,
		identification_documents = false,
		personal_information = false,
	} = personal_details;

	const MAPPING = [
		{
			name        : 'personal_information',
			content     : PersonalInformation,
			isCompleted : address_details && personal_information,
			component   : PersonalDetails,
		},
		{
			name        : 'identification_documents',
			content     : IdentificationDocuments,
			isCompleted : identification_documents,
			component   : EditIdentificationDocuments,
		},
	];

	const isDocsApproved = (documents || []).filter((doc) => (
		DOC_MAPPING.includes(doc?.document_type))).every((ele) => (ele?.status === 'approved'));

	return (
		<div className={styles.container}>
			{(MAPPING || []).map((item) => {
				const { content: Component = null, isCompleted, name, component : ModalComponent } = item || {};

				return (
					<div
						key={item.title}
						role="presentation"
						className={styles.accordion}
					>
						<Accordion
							type="text"
							title={(
								<div className={styles.status}>
									<div className={styles.accordion_title}>{startCase(name)}</div>

									<RenderPills
										isDocsApproved={isDocsApproved}
										name={name}
										isCompleted={isCompleted}
									/>
									<Button themeType="secondary" onClick={() => { setShow(name); }}> Edit </Button>
									{show === name ? (
										<Modal
											size="xl"
											show={show}
											onClose={() => setShow(false)}
											placement="top"
											closeOnOuterClick
										>
											<Modal.Header title={name} />
											<Modal.Body>
												<ModalComponent
													data={profileData}
													getEmployeeDetails={getEmployeeDetails}
												/>
											</Modal.Body>
										</Modal>
									) : null}
								</div>
							)}
							animate={false}
						>
							<Component
								mainApiLoading={loading}
								profileData={profileData}
								getEmployeeDetails={getEmployeeDetails}
								getEmployeeDetailsLoading={getEmployeeDetailsLoading}
							/>
							{' '}
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default ProfileDetails;
