import { Accordion } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const data = [{ title: 'PERSONAL INFORMATION', content: 'Personal Information' },
	{ title: 'EDUCATIONAL QUALIFICATION', content: 'Personal Information' },
	{ title: 'EMPLOYMENT HISTORY', content: 'Personal Information' },
	{ title: 'IDENTIFICATION DOCUMENTS', content: 'Personal Information' },
	{ title: 'RESUME', content: 'Personal Information' },
	{ title: 'BANK DETAILS', content: 'Personal Information' }];

function NewHireInformation() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack className={styles.back_icon} width={20} height={20} />
				<div className={styles.title}>NEW HIRE INFORMATION</div>
			</div>
			<div className={styles.subcontainer}>

				{data.map((item) => (
					<Accordion key={item.title} type="text" title={item.title} className={styles.accordion}>
						{item.content}
					</Accordion>
				))}

			</div>
		</div>
	);
}

export default NewHireInformation;
