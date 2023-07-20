import { Button, Popover } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import Detention from '../../../../../common/Detention';

import styles from './styles.module.css';

function DetentionDemurrage() {
	return (
		<Popover placement="bottom" render={<Detention heading="Update No. of Free Days" />} caret={false}>
			<Button size="md" themeType="link" className={styles.button}>

				<IcMPlus height={22} width={22} className={styles.add_icon} fill="black" />
				Add Free Days
			</Button>
		</Popover>
	);
}

export default DetentionDemurrage;
