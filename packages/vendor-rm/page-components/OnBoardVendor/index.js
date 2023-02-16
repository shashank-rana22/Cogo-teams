import { Button, Stepper } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState, useCallback } from 'react';

import TABS_MAPPING from '../../constants/tabs';

import styles from './styles.module.css';

function OnBoardVendor() {
	const router = useRouter();

	const [activeStepper, setActiveStepper] = useState(TABS_MAPPING[3]);

	const Element = activeStepper?.component;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onBack = useCallback(() => router.push('/vendors-list'), []);

	return (
		<div>
			<div className={styles.back_container}>
				<Button size="sm" themeType="secondary" onClick={onBack}>
					<IcMArrowBack fill="#221F20" style={{ marginRight: 4 }} />
				</Button>
				<div className={styles.back_text}>Back to Vendor Relationship Management</div>
			</div>
			<div className={styles.header}>Add New Vendor</div>
			<div className={styles.tab_container}>
				<Stepper
					active={activeStepper?.key}
					items={TABS_MAPPING}
					shadowed
					arrowed
					style={{ background: '#FFFFFF', padding: '2px', margin: '-15px' }}
				/>
			</div>
			<div className={styles.form_container}>
				<Element
					activeStepper={activeStepper}
					setActiveStepper={setActiveStepper}
				/>
			</div>
		</div>
	);
}

export default OnBoardVendor;
