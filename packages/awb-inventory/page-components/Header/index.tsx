import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select';
import React from 'react';

import styles from './styles.module.css';

interface Props {
	setShow?: Function;
}

function Header({ setShow = () => {} }:Props) {
	return (
		<header className={styles.header_container}>
			<div className={styles.heading}>AWB Inventory</div>
			<div className={styles.button_head}>
				<div className={styles.button_style}>
					<ScopeSelect size="md" showChooseAgent={false} />
				</div>

				<div className={styles.button_style}>
					<Button onClick={() => setShow(true)} className="primary sm">
						<div className={styles.plus_icon}>
							<IcMPlus height={20} width={20} />
						</div>
						Add AWB Number
					</Button>
				</div>
			</div>
		</header>
	);
}

export default Header;
