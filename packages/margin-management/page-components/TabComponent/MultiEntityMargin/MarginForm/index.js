import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { forwardRef } from 'react';

import CreateEntityMargin from '../CreateEntityMargin';
import ViewEntityMargin from '../ViewEntityMargin';

import styles from './styles.module.css';

const componentMapping = {
	view   : ViewEntityMargin,
	create : CreateEntityMargin,
	edit   : CreateEntityMargin,
};

function MarginForm({ showModal = {}, setShowModal = () => { } }, ref) {
	const {
		entities = [],
		action = '',
		activeService = '',
	} = showModal || {};

	const fromEntity = entities[GLOBAL_CONSTANTS.zeroth_index]?.business_name || '';
	const toEntity = entities[1]?.business_name || '';

	const Component = componentMapping[action] || ViewEntityMargin;
	return (
		<>
			<div className={styles.header_left}>
				<div className={styles.entity_names}>
					<div className={styles.entity_name}>
						{fromEntity}
					</div>
					{' TO '}
					<div className={styles.entity_name}>
						{toEntity}
					</div>
				</div>
				<div className={styles.btnwrap}>
					<Button
						onClick={() => setShowModal((pv) => ({
							...pv,
							action: showModal?.action === 'create' ? 'view' : 'create',
						}))}
					>
						{showModal?.action === 'create' ? 'View' : '+ Add/Edit Slab'}
					</Button>
				</div>
			</div>
			<div style={{ flex: 1 }}>
				<Component
					showModal={showModal}
					setShowModal={setShowModal}
					service={activeService}
					ref={ref}
				/>
			</div>
		</>
	);
}

export default forwardRef(MarginForm);
