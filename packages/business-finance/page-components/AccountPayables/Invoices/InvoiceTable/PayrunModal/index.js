import { Modal, Button, Radio, Toggle, RadioGroup, Select, cl } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import { CURRENCY_DATA, CATEGORY_OPTIONS, EXPENSE_OPTIONS, SERVICE_TYPE } from '../../Constants';
import useGetPayrunId from '../../hooks/useGetPayrunId';

import styles from './styles.module.css';

function PayRunModal({ showPayrunModal = false, setShowPayrunModal = () => {}, activeEntity = '' }) {
	const [categoryValue, setCategoryValue] = useState('normal_payrun');
	const [toggleValue, setToggleValue] = useState(true);
	const [serviceType, setServiceType] = useState('');
	const [serviceAgent, setServiceAgent] = useState('');
	const [currencyValue, setCurrencyValue] = useState(CURRENCY_DATA[GLOBAL_CONSTANTS.zeroth_index]);

	const { text = '', id = '' } = currencyValue || {};

	const onToggleChange = () => {
		if (toggleValue) {
			setCategoryValue('overheads');
		} else {
			setCategoryValue('normal_payrun');
		}
		setServiceAgent('');
		setServiceType('');
		setToggleValue((prev) => !prev);
	};

	const onOptionChange = (item) => {
		setServiceAgent('');
		setServiceType('');
		setCategoryValue(item);
	};

	const {
		getPayrunId = '',
		loading = false,
	} = useGetPayrunId({
		activeEntity,
		currency: text,
		setShowPayrunModal,
		serviceType,
		serviceAgent,
		categoryValue,
	});

	return (
		<Modal size="md" show={showPayrunModal} onClose={() => setShowPayrunModal(false)} placement="top">
			<Modal.Header title="Select Filters" />
			<Modal.Body>
				<div className={styles.category}>
					<div className={styles.header}>
						Category
					</div>

					<Toggle
						onLabel="expense"
						offLabel="bill"
						size="sm"
						value={toggleValue}
						onChange={onToggleChange}
					/>
				</div>

				<div className="radiogrp">
					<RadioGroup
						options={
							toggleValue ? CATEGORY_OPTIONS : EXPENSE_OPTIONS
						}
						value={categoryValue}
						onChange={onOptionChange}
					/>

					{categoryValue === 'overseas_agent' && (
						<div className={styles.form}>
							<div className={styles.element}>
								<div>Select Agent</div>

								<AsyncSelect
									size="sm"
									placeholder="Select Agent"
									valueKey="organizationId"
									labelKey="organizationName"
									asyncKey="list_overseas_trade_parties"
									value={serviceAgent}
									onChange={setServiceAgent}
									initialCall
								/>
							</div>

							<div className={styles.element}>
								<div>Select Service</div>

								<Select
									size="sm"
									placeholder="Select Service"
									options={SERVICE_TYPE}
									value={serviceType}
									onChange={setServiceType}
								/>
							</div>

						</div>
					)}
				</div>

				<div className={styles.header}>
					Currency
				</div>
				<div className={styles.currency}>
					{(CURRENCY_DATA).map((item) => {
						const { id: itemId = '', icon: Icon = null, text: itemText = '' } = item || {};
						return (
							<div
								key={itemId}
								className={cl`${styles.common_currency_values} 
								${id === itemId ? styles.selected_currency_values
									: styles.unselected_currency_values}`}
								onClick={() => {
									setCurrencyValue(item);
								}}
								role="presentation"
							>
								<div className={styles.icon_show}>
									{Icon ? <Icon height={35} width={35} /> : null}
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
					<Button
						onClick={getPayrunId}
						disabled={loading
							|| (categoryValue === 'overseas_agent'
								&& (serviceAgent === '' || serviceType === ''))}
					>
						Create
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default PayRunModal;
