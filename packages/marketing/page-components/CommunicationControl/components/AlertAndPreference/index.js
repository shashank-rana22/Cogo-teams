import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetOrganizationUsers from '../../hooks/useGetOrganizationUsers';
import useGetPreferences from '../../hooks/useGetPreferences';

import CategoryForm from './CategoryForm';
import Header from './Header';
import styles from './styles.module.css';

function AlertAndPreference() {
	const router = useRouter();
	const { org_name = '', company_id = '' } = router?.query || {};

	const [formData, setFormData] = useState({});
	const [user, setUser] = useState('');

	const { list = [] } = useGetOrganizationUsers({ orgId: company_id });
	const userOptions = list.map((item) => ({
		label : item?.name,
		value : item?.user_id,
	}));
	const listUserOptions = [{ label: 'Select All', value: '' }, ...userOptions];

	const { preferences = {} } = useGetPreferences({ companyId: company_id, userId: user });
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
				formData={formData}
				setFormData={setFormData}
				user={user}
				setUser={setUser}
			/>
			<CategoryForm
				query={router?.query}
				back={router?.back}
				data={preferences}
			/>
		</div>
	);
}
export default AlertAndPreference;
