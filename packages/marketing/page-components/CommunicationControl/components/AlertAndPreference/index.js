import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetPreferences from '../../hooks/useGetPreferences';
import useUpdatePreference from '../../hooks/useUpdatePreference';

import CategoryForm from './CategoryForm';
import Header from './Header';
import styles from './styles.module.css';

function AlertAndPreference() {
	const router = useRouter();
	const { org_name = '', company_id = '' } = router?.query || {};

	const [user, setUser] = useState('');

	const DEFAULT_PARAMS = {
		companyId : company_id,
		userId    : user,
	};

	const { preferences = {}, loading:getPreferencesLoading = '' } = useGetPreferences({
		DEFAULT_PARAMS,
	});
	const { updatePreference, loading:updateLoading } = useUpdatePreference();

	const handleSave = async (payload) => {
		await updatePreference({ ...(payload || {}), user_id: user });
		router?.back();
	};

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
					handleSave={handleSave}
					query={router?.query}
					data={preferences}
					getPreferencesLoading={getPreferencesLoading}
					updateLoading={updateLoading}
				/>
			) : null}
		</div>
	);
}
export default AlertAndPreference;
