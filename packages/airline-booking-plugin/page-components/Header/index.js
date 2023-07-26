import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select';
import React from 'react';

import styles from './styles.module.css';

function Header({ setShow = () => {} }) {
	return (
		<header className={styles.header_container}>
			<div className={styles.heading}>Airline Booking Plugin</div>
			<div className={styles.button_head}>
				<div className={styles.button_style}>
					<ScopeSelect size="md" showChooseAgent={false} apisToConsider={['list_air_india_awb_numbers']} />
				</div>

				<div className={styles.button_style}>
					<Button onClick={() => setShow(true)} className="primary sm">
						<div className={styles.plus_icon}>
							<IcMPlus height={20} width={20} />
						</div>
						Air-India Bookings
					</Button>
				</div>
			</div>
		</header>
	);
}

export default Header;
