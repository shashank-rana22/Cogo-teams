import { Select, Button, Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import useGetAutorizationUrl from './hooks/useGetAutorizationUrl';
import useLocalStorage from './hooks/useLocalStorage';
import useScopes from './hooks/useScopes';

function GrantAccess({ email = '' }) {
	const [scopes, setScopes] = useState([]);
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const { scopeOptions } = useScopes();
	const { getAuthorizationUrl } = useGetAutorizationUrl();
	const { setItems } = useLocalStorage();

	useEffect(() => {
		if (scopeOptions.length) {
			setScopes([...scopeOptions.map((item) => item.value)]);
		}
		// eslint-disable-next-line
	}, [scopeOptions.length]);

	const handleRedirect = async () => {
		try {
			const redirect_url = `${process.env.PARTNER_URL}/generate-outlook-token`;
			const res = await getAuthorizationUrl({ scopes, redirect_url });
			const url = res?.data;
			setItems({ email, scopes, partner_id: query.partner_id });
			// eslint-disable-next-line no-undef
			window.open(url, '_blank');
		} catch (err) {
			console.log(err);
			Toast.error('Errors in getting url');
		}
	};

	return (
		<div>
			<p>{email}</p>
			<p>
				Select Email permission. (We highly suggest keep all permission for
				seamless experience)
			</p>
			<Select
				options={scopeOptions}
				onChange={setScopes}
				value={scopes}
				multiple
			/>
			<Button onClick={handleRedirect} style={{ marginTop: 16 }}>
				Authorise
			</Button>
		</div>
	);
}

export default GrantAccess;
