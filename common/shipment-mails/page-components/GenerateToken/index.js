import useGenerateToken from '@cogo/business-modules/Emails/hooks/useGenerateToken';
import useLocalStorage from '@cogo/business-modules/Emails/hooks/useLocalStorage';
import { useSelector } from '@cogo/store';
import React, { useEffect, useState } from 'react';

import { Container } from './styles';

function GenerateToken() {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const [isGenerated, setIsGenerated] = useState(null);
	const { generateToken } = useGenerateToken();
	const { getItems, removeItems } = useLocalStorage();

	const handleTokenGenerate = async () => {
		const { email, scopes, partner_id } = getItems();
		try {
			await generateToken({ email, auth_code: query.code, scopes });
			setIsGenerated('generated');
			if (partner_id) {
				window.open(`/${partner_id}/my-profile`);
			}
			removeItems();
		} catch (err) {
			setIsGenerated('failed');
			removeItems();
		}
	};

	useEffect(() => {
		if (query.code) {
			handleTokenGenerate();
		}
	}, []);
	let text = 'Generating Token Please wait......';
	if (isGenerated === 'generated') {
		text =			'Outlook token has been generated successfully...You can close this window now.  Enjoy All your mails at cogoport';
	}
	if (isGenerated === 'failed') {
		text = 'Token Generation failed please try again';
	}
	return (
		<Container className={isGenerated === 'generated' ? 'done' : ''}>
			{text}
		</Container>
	);
}

export default GenerateToken;
