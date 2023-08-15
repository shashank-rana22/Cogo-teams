import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

export default function GoToKamDesk() {
	const router = useRouter();

	const handleClick = () => {
		const newHref = `${window.location.origin}/v2/${router?.query?.partner_id}/kam-desk`;
		window.location.href = newHref;
	};

	return (
		<div className={styles.container}>
			<Button
				themeType="tertiary"
				onClick={handleClick}
			>
				Go To Kam Desk
			</Button>
			<IcMArrowNext />
		</div>
	);
}
