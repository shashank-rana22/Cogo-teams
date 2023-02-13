import { Button, Breadcrumb } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useCallback } from 'react';

import styles from './styles.module.css';

function AddAccount() {
	const router = useRouter();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onBack = useCallback(() => router.push('/list-accounts'), []);

	return (
		<div>
			<div className={styles.back_container}>
				<Button size="sm" themeType="secondary" onClick={onBack}>
					<IcMArrowBack fill="#221F20" style={{ marginRight: 4 }} />
				</Button>
				<p className={styles.back_text}>Back to Vendor Relationship Management</p>
			</div>
			<div className={styles.header}>Add New Vendor</div>
			<div className={styles.tab_panel}>
				<Breadcrumb>
					<Breadcrumb.Item label="Vendor Details" />
					<Breadcrumb.Item label="Contact Details" />
					<Breadcrumb.Item label="Vendor Services" />
					<Breadcrumb.Item label="Payment Details" />
					<Breadcrumb.Item label="Verification" />
				</Breadcrumb>
			</div>
		</div>
	);
}

export default AddAccount;
