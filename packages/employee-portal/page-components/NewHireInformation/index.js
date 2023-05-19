import { Accordion } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

const data = [{ title: 'PERSONAL INFORMATION', content: PersonalInformation },
	{ title: 'EDUCATIONAL QUALIFICATION', content: 'Personal Information' },
	{ title: 'EMPLOYMENT HISTORY', content: 'Personal Information' },
	{ title: 'IDENTIFICATION DOCUMENTS', content: 'Personal Information' },
	{ title: 'RESUME', content: 'Personal Information' },
	{ title: 'BANK DETAILS', content: 'Personal Information' }];

function NewHireInformation({ setInformationPage }) {
	const [moreDetails, setMoreDetails] = useState(false);

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

				{data.map((item) => {
					const { content: Component } = item;

					return (
						<div
							key={item.title}
							role="presentation"
							onClick={() => setMoreDetails((prev) => !prev)}
							className={moreDetails ? styles.accordion : styles.accordion_close}
						>
							<Accordion
								type="text"
								title={item.title}
							>
								<Component />
							</Accordion>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default NewHireInformation;
