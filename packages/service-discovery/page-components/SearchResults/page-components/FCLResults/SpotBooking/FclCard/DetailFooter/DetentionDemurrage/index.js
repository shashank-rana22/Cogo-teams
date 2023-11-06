import { Button, Popover } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import Detention from './Detention';
import styles from './styles.module.css';

function DetentionDemurrage({
	setDetentionValues = () => {},
	detentionValues = {},
}) {
	const [showDnD, setShowDnD] = useState(false);

	const {
		origin_detention,
		// origin_demurrage,
		destination_detention,
		// destination_demurrage,
	} = detentionValues;

	return (
		<div className={styles.container}>
			<div className={styles.tag}>Origin</div>

			<div className={styles.days_count}>
				<div>{`Detention: ${origin_detention} Free Days`}</div>
				{/* <div style={{ marginLeft: '4px' }}>{`Demurrage. ${origin_demurrage} Days`}</div> */}
			</div>

			<div className={styles.tag} style={{ marginLeft: '24px' }}>Destination</div>

			<div className={styles.days_count}>
				<div>{`Detention: ${destination_detention} Free Days`}</div>
				{/* <div style={{ marginLeft: '4px' }}>{`Demurrage. ${destination_demurrage} Days`}</div> */}
			</div>

			<Popover
				placement="bottom"
				visible={showDnD}
				caret={false}
				onClickOutside={() => setShowDnD(false)}
				render={(
					<Detention
						heading="Update No. of Free Days"
						buttonTitle="Update"
						setShow={setShowDnD}
						detentionValues={detentionValues}
						setDetentionValues={setDetentionValues}
					/>
				)}
			>
				<Button
					type="button"
					size="sm"
					themeType="secondary"
					onClick={() => setShowDnD(true)}
					style={{ marginLeft: '12px' }}
				>
					<IcMEdit style={{ marginRight: '4px' }} />
					Edit Days
				</Button>
			</Popover>
		</div>
	);
}

export default DetentionDemurrage;
