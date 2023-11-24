import { Modal, Button, Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from './Headers';
import styles from './styles.module.css';

function ChargeModal({
	openCharge = false, setOpenCharge = () => {}, data = [], openRateForm = false,
	setRateValue = () => {}, PortName = {}, portNameValue = {}, rateValue = {}, setOpenRateForm = () => {},
	selectRequired = false,
}) {
	const [isChecked, setIsChecked] = useState(false);

	const handelChangeData = (val) => {
		setRateValue(val);
		setIsChecked(val?.id);
	};

	const handelForm = () => {
		setRateValue('');
		setOpenRateForm(!openRateForm);
	};

	return (
		<Modal size="md" show={openCharge} onClose={() => setOpenCharge(!openCharge)} placement="top">
			<Header
				PortName={PortName}
				portNameValue={portNameValue}
				rateValue={rateValue}
				openRateForm={openRateForm}
				setOpenRateForm={setOpenRateForm}
				selectRequired={selectRequired}
			/>
			<Modal.Body>
				<div>
					{(data || []).map((val) => (
						<div className={styles.container} key={val?.id}>
							<div className={styles.header}>
								<Checkbox checked={val?.id === isChecked} onChange={() => handelChangeData(val)} />
								<div className={styles.provider_name}>
									Service Provider :
									{' '}
									{val?.service_provider?.business_name}
								</div>
							</div>
							<div className={styles.body}>
								Local Charges
								<div className={styles.value}>
									{isEmpty(val?.commodity) ? 'All Commoditities' : val?.commodity}
								</div>
							</div>
							<div className={styles.footer}>
								<div style={{ color: '#828282' }}>
									Updated At :
									{' '}
									{formatDate({
										date       : val?.updated_at,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})}
								</div>
								<div style={{ fontSize: '20px', fontWeight: '600' }}>
									{formatAmount({
										amount   : val?.total_price,
										currency : val?.total_price_currency,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'symbol',
											maximumFractionDigits : 2,
										},
									})}
								</div>
							</div>
						</div>
					))}
				</div>
			</Modal.Body>
			{!openRateForm && (
				<Modal.Footer>
					<Button size="md" themeType="secondary" onClick={() => setOpenCharge(!openCharge)}>
						Close
					</Button>

					<Button size="md" onClick={handelForm} style={{ marginLeft: '10px' }}>
						{' '}
						<IcMPlus />
						{' '}
						Add Local Charge
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
}

export default ChargeModal;
