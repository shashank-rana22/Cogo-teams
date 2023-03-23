import { cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useEffect, useState, useCallback } from 'react';

import useGenerateToken from '../../hooks/useGenerateToken';
import useLocalStorage from '../../hooks/useLocalStorage';

import styles from './styles.module.css';

function GenerateToken() {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const [isGenerated, setIsGenerated] = useState(null);
	const { generateToken } = useGenerateToken();
	const { getItems, removeItems } = useLocalStorage();

	const handleTokenGenerate = useCallback(() => {
		(async () => {
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
		})();
	}, [query.code, generateToken, getItems, removeItems]);

	useEffect(() => {
		if (query.code) {
			handleTokenGenerate();
		}
	}, [handleTokenGenerate, query.code]);

	let text = 'Generating Token Please wait......';
	if (isGenerated === 'generated') {
		text =	`Outlook token has been generated successfully...You can close this window now. 
		 Enjoy All your mails at cogoport`;
	}
	if (isGenerated === 'failed') {
		text = 'Token Generation failed please try again';
	}
	return (
		<div className={cl`${styles.container} ${!isGenerated ? styles.done : ''}`}>
			{text}
		</div>
	);
}

export default GenerateToken;
