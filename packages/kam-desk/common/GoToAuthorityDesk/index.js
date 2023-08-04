import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

export default function GoToAuthorityDesk({ service_type = '' }) {
	const router = useRouter();

	const handleClick = () => {
		let newHref = '';
		if (service_type === 'ocean') {
			newHref = `${window.location.origin}/v2/${router?.query?.partner_id}/bl-do`;
		} else {
			newHref = `${window.location.origin}/${router?.query?.partner_id}/bl-do`;
		}
		window.location.href = newHref;
	};

	return (
		<div className={styles.container}>
			<Button
				themeType="tertiary"
				onClick={handleClick}
			>
				Go to Authority Desk
			</Button>
			<IcMArrowNext />
		</div>
	);
}
