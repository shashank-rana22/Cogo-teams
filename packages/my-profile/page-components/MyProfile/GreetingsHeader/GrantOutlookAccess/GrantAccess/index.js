import { MultiSelect, Button, Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import useGetAutorizationUrl from './hooks/useGetAutorizationUrl';
import useLocalStorage from './hooks/useLocalStorage';
import useScopes from './hooks/useScopes';
import styles from './styles.module.css';

function GrantAccess({ email = '', showAccessUrl = false }) {
	const [scopes, setScopes] = useState([]);
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { scopeOptions } = useScopes({ showAccessUrl, scopes });
	const { getAuthorizationUrl = () => {} } = useGetAutorizationUrl();
	const { setItems } = useLocalStorage();

	useEffect(() => {
		if (scopeOptions.length) {
			setScopes([...scopeOptions.map((item) => item.value)]);
		}
		// eslint-disable-next-line
	}, [scopeOptions.length]);

	const handleRedirect = async () => {
		try {
			const redirect_url = `${process.env.NEXT_PUBLIC_PARTNER_URL}/generate-outlook-token`;

			const res = await getAuthorizationUrl({ scopes: scopes || [], redirect_url });
			const url = res?.data;
			setItems({ email, scopes, partner_id: query.partner_id });
			// eslint-disable-next-line no-undef
			window.open(url, '_blank');
		} catch (err) {
			Toast.error('Errors in getting url');
		}
	};

	return (
		<div className={styles.container}>
			<p className={styles.email_id}>
				(
				{email}
				)
			</p>

			<p>
				Select Email permission. (We highly suggest keep all permission for
				seamless experience)
			</p>

			<MultiSelect
				options={scopeOptions}
				onChange={setScopes}
				value={scopes}
				multiple
			/>

			<div className={styles.button_container}>
				<Button
					onClick={handleRedirect}
					style={{
						marginTop    : '16px',
						marginBottom : '16px',
					}}
					className="primary"
				>
					Authorise
				</Button>
			</div>
		</div>
	);
}

export default GrantAccess;
