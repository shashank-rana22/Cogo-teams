import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetOrganizationUsers from '../../hooks/useGetOrganizationUsers';
import useGetPreferences from '../../hooks/useGetPreferences';
import useUpdatePreference from '../../hooks/useUpdatePreference';

import CategoryForm from './CategoryForm';
import Header from './Header';
import styles from './styles.module.css';

function AlertAndPreference() {
	const router = useRouter();
	const { org_name = '', company_id = '' } = router?.query || {};

	const [user, setUser] = useState('');

	const { list = [] } = useGetOrganizationUsers({ orgId: company_id, setUser });
	const userOptions = list.map((item) => ({
		label : item?.name,
		value : item?.user_id,
	}));
	const listUserOptions = [{ label: 'Select All', value: '' }, ...userOptions];

	const { preferences = {}, loading:getPreferencesLoading = '' } = useGetPreferences({
		companyId : company_id,
		userId    : user,
	});
	const { updatePreference, loading:updateLoading } = useUpdatePreference();

	const handleSave = async (PAYLOAD) => {
		await updatePreference({ ...PAYLOAD, user_id: user });
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
				options={listUserOptions}
				user={user}
				setUser={setUser}
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
