import { Modal, Button, Radio } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import { CURRENCY_DATA } from '../../Constants';
import useGetPayrunId from '../../hooks/useGetPayrunId';

import styles from './styles.module.css';

function PayRunModal({ showPayrunModal, setShowPayrunModal, activeEntity }) {
	const [currencyValue, setCurrencyValue] = useState(CURRENCY_DATA[GLOBAL_CONSTANTS.zeroth_index]);
	const { text = '', id = '' } = currencyValue || {};

	const {
		getPayrunId,
		loading,
	} = useGetPayrunId({ activeEntity, currency: text, setShowPayrunModal });

	return (
		<div>
			<Modal size="md" show={showPayrunModal} onClose={() => setShowPayrunModal(false)} placement="top">
				<Modal.Header title="Select Filters" />
				<Modal.Body>
					<div className={styles.header}>
						Currency
					</div>
					<div className={styles.currency}>
						{(CURRENCY_DATA).map((item) => {
							const { id: itemId, icon: Icon, text: itemText } = item || {};
							return (
								<div
									key={itemId}
									className={id === itemId ? styles.selected_currency_values
										: styles.unselected_currency_values}
									onClick={() => {
										setCurrencyValue(item);
									}}
									role="presentation"
								>
									<div className={styles.icon_show}>
										<Icon height={35} width={35} />
									</div>
									<div className={styles.text_show}>{itemText}</div>
								</div>
							);
						})}
					</div>
					<div className={styles.entity}>
						Entity
					</div>
					<div>
						{Object.entries(GLOBAL_CONSTANTS.cogoport_entities).map(([key, value]) => {
							const { name, icon: Icon } = value || {};
							return (
								<div key={key}>
									{key === activeEntity ? (
										<div className={styles.entity_container}>
											<Radio name="selected" disabled={false} checked />
											<div className={styles.text}>
												{key}
												-
												{name}
											</div>
											<div className={styles.entity_icon}>
												<Icon height={20} width={20} />
											</div>
										</div>
									) : null}
								</div>
							);
						})}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="secondary" onClick={() => setShowPayrunModal(false)}>Cancel</Button>
					<div className={styles.button}>
						<Button onClick={getPayrunId} disabled={loading}>
							Create
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default PayRunModal;
