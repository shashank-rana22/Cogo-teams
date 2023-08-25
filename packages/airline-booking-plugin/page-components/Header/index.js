import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function Header({ setShow = () => {} }) {
	const { t } = useTranslation(['airlineBookingPlugin']);
	return (
		<header className={styles.header_container}>
			<div className={styles.heading}>{t('airlineBookingPlugin:heading')}</div>
			<div className={styles.button_head}>
				<div className={styles.button_style}>
					<ScopeSelect size="md" showChooseAgent={false} apisToConsider={['list_air_india_awb_numbers']} />
				</div>

				<div className={styles.button_style}>
					<Button onClick={() => setShow(true)} className="primary sm">
						<div className={styles.plus_icon}>
							<IcMPlus height={20} width={20} />
						</div>
						{t('airlineBookingPlugin:create_booking_button')}
					</Button>
				</div>
			</div>
		</header>
	);
}

export default Header;
