import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header({
	setOpenRateForm = () => {},
	openRateForm = false, PortName = {}, portNameValue = {}, rateValue = {}, selectRequired = false,
}) {
	const handelForm = () => {
		setOpenRateForm(!openRateForm);
	};

	return (
		<div className={styles.title}>
			<div style={{ display: 'flex' }}>
				{PortName}
				&nbsp;
				Port
				:
				{' '}
				<div className={styles.title_value}>
					{portNameValue}
				</div>
			</div>
			{selectRequired && (
				<Button
					size="sm"
					themeType="accent"
					style={{ marginLeft: '10px' }}
					onClick={handelForm}
					disabled={isEmpty(rateValue)}
				>
					Select
				</Button>
			)}
		</div>
	);
}

export default Header;
