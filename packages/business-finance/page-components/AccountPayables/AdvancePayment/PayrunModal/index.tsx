import { Modal, Button, Radio } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import { CURRENCY_DATA } from '../common/constants';
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
	const [payRunType, setPayRunType] = useState(false);
	const { text = '', id = '' } = currencyValue || {};
	const currency = text;

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
						{(CURRENCY_DATA || []).map((item) => {
							const { id:itemId, icon:itemIcon, text:itemText } = item || {};
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
									<div className={styles.icon_show}>{itemIcon}</div>
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
							const { name, icon: Icon } = value as { name: string; icon: React.ElementType } || {};
							return (
								<div key={key}>
									{key === activeEntity && (
										<div className={styles.entity_container}>
											<Radio name="selected" disabled={false} checked />
											<div className={styles.text}>
												{key}
												{' '}
												-
												{' '}
												{name}
											</div>
											<div className={styles.entity_icon}>
												<Icon height={20} width={20} />
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="secondary" onClick={() => setShow(false)}>Cancel</Button>
					<div className={styles.button}>
						<Button onClick={() => {
							setPayRunType(true);
							getAdvancedPayment();
							setShow(false);
						}}
						>
							Create

						</Button>
					</div>
				</Modal.Footer>
			</Modal>

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

		</div>
	);
}
export default PayRunModal;
