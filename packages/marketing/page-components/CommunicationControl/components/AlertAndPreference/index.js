import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import Header from './Header';
import styles from './styles.module.css';

function AlertAndPreference() {
	const router = useRouter();
	const { org_name = '' } = router?.query || {};
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<IcMArrowBack
					className={styles.arrow_back}
					// onClick={() => console.log('first')}
				/>
				<h1 className={styles.title}>Alert And Preference</h1>
			</div>
			<Header
				orgName={org_name}
			/>
		</div>
	);
}
export default AlertAndPreference;
