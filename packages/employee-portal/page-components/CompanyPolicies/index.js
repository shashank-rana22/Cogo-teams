import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CompanyPolicies({ setInformationPage }) {
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
				<div className={styles.title}>COMPANY POLICIES</div>
			</div>
			<div> Company Policies!</div>
		</div>
	);
}

export default CompanyPolicies;
