/* eslint-disable no-mixed-spaces-and-tabs */
import { Popover, Button } from '@cogoport/components';
import React from 'react';

import DeleteModal from '../DeleteModal';
import ViewRequested from '../ViewRequested';

import styles from './styles.module.css';

function ActionRejected({ itemData, reftech }) {
	const REMARKS = [
		{ name: 'View', value: 'View' },
		{ name: 'Accept', value: 'ACCEPT' },
		{ name: 'Raise Again', value: 'RAISED_AGAIN' },
	];

	const { type, userIncidentStatus } = itemData || {};
	const content = () => (
		<div>
			<div className={styles.main_container}>
				{REMARKS?.map(({ name }) => (
					<div>
						<div className={styles.container}>
							{(name === 'View')
								? <ViewRequested itemData={itemData} name="View" reftech={reftech} />
                            	: null}
							{name === 'Accept' ? <DeleteModal itemData={itemData} reftech={reftech} /> : null}
							{(name === 'Raise Again') && (type === 'TDS_APPROVAL' || type === 'BANK_DETAIL_APPROVAL')
							&& (userIncidentStatus === 'PENDING_ACTION')
								? <ViewRequested itemData={itemData} name="Raise Again" reftech={reftech} /> : null}
						</div>
						{name !== 'Raise Again'
						&& <div className={styles.hr} />}
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div>
			<Popover placement="bottom" caret={false} render={content()}>
				<Button size="md" themeType="secondary">Action</Button>
			</Popover>
		</div>
	);
}

export default ActionRejected;
