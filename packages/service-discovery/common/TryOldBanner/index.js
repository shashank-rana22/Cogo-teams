import { Button, cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const TIMEOUT = 500;

function TryOldBanner(props) {
	const { setIsBannerVisible = () => {} } = props || {};

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
				Want to switch to our default booking flow
				{' '}
				<Button
					type="button"
					themeType="link"
					onClick={handleRedirect}
				>
					Click here
				</Button>
			</div>

			<IcMCross
				style={{ cursor: 'pointer' }}
				onClick={() => {
					setShowBanner(false);
					setIsBannerVisible(false);
				}}
			/>
		</div>
	);
}

export default TryOldBanner;
