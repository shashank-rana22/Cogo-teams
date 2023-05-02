import { Modal, Button, Radio } from '@cogoport/components';
import React, { useState } from 'react';

import { CURRENCY_DATA, ENTITY_MAPPING } from '../common/constants';
import useGetCreatePayRunType from '../hooks/useGetCreatePayRunType';

import PayRunTypeModal from './PayRunTypeModal';
import styles from './styles.module.css';

interface Props {
	activeEntity:string,
	show:boolean,
	setShow:Function,
}

function PayRunModal({ show, setShow, activeEntity }:Props) {
	const [currencyValue, setCurrencyValue] = useState(CURRENCY_DATA[0]);
	const currency = currencyValue?.text;
	const [payRunType, setPayRunType] = useState(false);
	const {
		data, getAdvancedPayment,
		loading,
		filters,
		setFilters,
	} = useGetCreatePayRunType({ activeEntity, currency });

	return (
		<div>
			<Modal size="md" show={show} onClose={() => setShow(false)} placement="top">
				<Modal.Header title="Select Filters" />
				<Modal.Body>
					<div className={styles.header}>
						Currency
					</div>
					<div className={styles.currency}>
						{CURRENCY_DATA.map((item) => (
							<div
								className={currencyValue.id === item.id ? styles.selected_currency_values
									: styles.unselected_currency_values}
								onClick={() => {
									setCurrencyValue(item);
								}}
								role="presentation"
							>
								<div className={styles.icon_show}>{item.icon}</div>
								<div className={styles.text_show}>{item.text}</div>
							</div>
						))}
					</div>
					<div className={styles.entity}>
						Entity
					</div>
					<div>
						{ENTITY_MAPPING.map((item) => (
							<div>
								{item.entityCode === activeEntity
                                && (
	<div className={styles.entity_container}>
		<Radio name="selected" disabled={false} checked />
		<div className={styles.text}>
			{item.label}
		</div>
		<div className={styles.entity_icon}>
			{item.icon}
		</div>

	</div>
                                )}
							</div>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="secondary" onClick={() => setShow(false)}>Cancel</Button>
					<div className={styles.button}>
						<Button onClick={() => {
							setPayRunType(true);
							getAdvancedPayment();
						}}
						>
							Create

						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			{payRunType && (
				<PayRunTypeModal
					payRunType={payRunType}
					setPayRunType={setPayRunType}
					data={data}
					loading={loading}
					filters={filters}
					setFilters={setFilters}
					activeEntity={activeEntity}
					currency={currency}
					setShow={setShow}
				/>
			)}
		</div>
	);
}
export default PayRunModal;
