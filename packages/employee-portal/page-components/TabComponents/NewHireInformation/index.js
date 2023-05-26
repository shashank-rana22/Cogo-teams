import { Accordion, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

function NewHireInformation({ setInformationPage, id, data, getEmployeeDetails }) {
	const content_mapping = [
		{ title: 'PERSONAL INFORMATION', content: PersonalInformation, key: 'detail' },
		{ title: 'IDENTIFICATION DOCUMENTS', content: IdentificationDocuments, key: 'documents' },

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
					const { content: Component, key } = item;

					const getStatus = () => {
						if (isEmpty(data[key])) {
							return false;
						}
						return true;
					};

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
										<Pill color="green">
											{getStatus()
												? 'Completed' : 'Pending'}
										</Pill>
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
