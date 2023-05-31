import { Accordion, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import AddressDetails from './AddressDetails';
import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

function NewHireInformation({ setInformationPage, id, data, getEmployeeDetails }) {
	const { progress_stats = {} } = data || {};
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
			title     : 'PERSONAL INFORMATION',
			content   : PersonalInformation,
			isPending : personal_information,
		},
		{
			title     : 'IDENTIFICATION DOCUMENTS',
			content   : IdentificationDocuments,
			isPending : identification_documents,
		},
		{
			title     : 'ADDRESS DETAILS',
			content   : AddressDetails,
			isPending : address_details,
		},
	];

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
					const { content: Component, isPending } = item;

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
										<div className={styles.accordion_title}>{item.title}</div>

										{isPending
											? <Pill color="green">Completed</Pill>
											: <Pill color="yellow">Pending</Pill>}

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
