import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetPreferences from '../../hooks/useGetPreferences';

import CategoryForm from './CategoryForm';
import Header from './Header';
import styles from './styles.module.css';

function AlertAndPreference() {
	const router = useRouter();
	const { org_name = '', company_id = '' } = router?.query || {};

	const [user, setUser] = useState('');

	const DEFAULT_PARAMS = {
		organization_id : company_id,
		user_id         : user,
	};
	const { preferences = {}, loading:getPreferencesLoading = '' } = useGetPreferences({
		DEFAULT_PARAMS,
	});

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<IcMArrowBack
					className={styles.arrow_back}
					onClick={router?.back}
				/>
				<h1 className={styles.title}>Alert And Preference</h1>
			</div>
			<Header
				orgName={org_name}
				user={user}
				setUser={setUser}
				orgId={company_id}
			/>
			{!getPreferencesLoading ? (
				<CategoryForm
					data={preferences}
					preferencesLoading={getPreferencesLoading}
					user={user}
				/>
			) : null}
		</div>
	);
}
export default AlertAndPreference;
