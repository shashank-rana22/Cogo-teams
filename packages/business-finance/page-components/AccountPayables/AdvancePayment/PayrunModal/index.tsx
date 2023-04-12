import { Modal, Button, Radio } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import {
	IcCCountrySingapore,
	IcCCountryNetherland,
	IcCCountryVietnam,
	IcCCountryIndia, IcMFsingaporeDollar, IcMFeuro,
	IcMFdong, IcMFpound, IcMFdollar, IcMFrupee,
} from '@cogoport/icons-react';
import React, { ComponentType, useState } from 'react';

import PayRunTypeModal from './PayRunTypeModal';
import styles from './styles.module.css';

type IconProps = {
	width: number;
	height: number;
};

  type IconType = ComponentType<IconProps>;

const CURRENCY_ICON_MAPPING = {
	[GLOBAL_CONSTANTS.currency_code.INR] : IcMFrupee,
	[GLOBAL_CONSTANTS.currency_code.USD] : IcMFdollar,
	[GLOBAL_CONSTANTS.currency_code.SGD] : IcMFsingaporeDollar,
	[GLOBAL_CONSTANTS.currency_code.GBP] : IcMFpound,
	[GLOBAL_CONSTANTS.currency_code.EUR] : IcMFeuro,
	[GLOBAL_CONSTANTS.currency_code.VND] : IcMFdong,
};
const getContentMapping = ({ width, height, mapping }:
{ width: number; height: number;
	mapping: Record<string, IconType | undefined> }) => Object.entries(mapping).reduce((pv, [key, Icon]) => ({
	...pv,
	...(Icon && {
		[key]: <Icon width={width} height={height} />,
	}),
}), {});

const CURRENCY_DATA_MAPPING = getContentMapping({
	width   : 35,
	height  : 35,
	mapping : CURRENCY_ICON_MAPPING,
});

const CURRENCY_DATA = Object.keys(CURRENCY_DATA_MAPPING).map(
	(currency, index) => ({
		id   : index,
		icon : CURRENCY_DATA_MAPPING[currency],
		text : currency,
	}),
);

function PayRunModal({ show, setShow, activeEntity }) {
	const [currencyValue, setCurrencyValue] = useState(CURRENCY_DATA[0]);
	const [payRunType, setPayRunType] = useState(false);
	const ENTITY_MAPPING = [
		{
			entityCode : '101',
			label      : '101 - COGO FREIGHT PVT LTD',
			icon       : <IcCCountryIndia height={20} width={20} />,
		},
		{
			entityCode : '201',
			label      : '201 - Cogoport Netherlands',
			icon       : <IcCCountryNetherland height={20} width={20} />,
		},
		{
			entityCode : '301',
			label      : '301 - COGOPORT PRIVATE LIMITED',
			icon       : <IcCCountryIndia height={20} width={20} />,
		},
		{
			entityCode : '401',
			label      : '401 - Cogo Universe Pte. Ltd',
			icon       : <IcCCountrySingapore height={20} width={20} />,
		},
		{
			entityCode : '501',
			label      : '501 - Cogoport Vietnam',
			icon       : <IcCCountryVietnam height={20} width={20} />,
		},
	];

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
						}}
						>
							Create

						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			{payRunType && <PayRunTypeModal payRunType={payRunType} setPayRunType={setPayRunType} />}
		</div>
	);
}
export default PayRunModal;
