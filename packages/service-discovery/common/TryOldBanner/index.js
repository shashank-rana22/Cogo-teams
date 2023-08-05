import { Button, cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

const TIMEOUT = 500;

function TryOldBanner() {
	const { partnerId } = useSelector(({ profile }) => ({
		partnerId: profile?.partner?.id,
	}));

	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowBanner(true);
		}, TIMEOUT);
	}, []);

	if (!showBanner) {
		return null;
	}

	const handleRedirect = () => {
		window.location.href = `/${partnerId}/sales/dashboards`;
	};

	return (
		<div className={cl`${styles.try_old_banner} ${showBanner && styles.visible}`}>
			<div className={styles.text}>
				Want to switch to old search to checkout
				{' '}
				<Button
					type="button"
					themeType="link"
					onClick={handleRedirect}
				>
					Click here
				</Button>
			</div>

			<IcMCross style={{ cursor: 'pointer' }} onClick={() => setShowBanner(false)} />
		</div>
	);
}

export default TryOldBanner;
