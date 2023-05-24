import { Accordion } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

const content_mapping = [
	{ title: 'PERSONAL INFORMATION', content: PersonalInformation },
	{ title: 'IDENTIFICATION DOCUMENTS', content: IdentificationDocuments },

];

function NewHireInformation({ setInformationPage, id, data }) {
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
					const { content: Component } = item;

					return (
						<div
							key={item.title}
							role="presentation"
							className={styles.accordion}
						>
							<Accordion
								type="text"
								title={item.title}
								animate
							>
								<Component id={id} data={data} />
							</Accordion>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default NewHireInformation;
