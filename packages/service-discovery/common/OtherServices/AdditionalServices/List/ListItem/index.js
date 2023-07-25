import { Toast } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import DeleteServiceModal from '../../../DeleteServiceModal';
import useDeleteAdditionalService from '../../hooks/useDeleteAdditionalService';
import ICONS_MAPPING from '../../icons-mapping';

import styles from './styles.module.css';

const getRates = (service = {}) => {
	const { rateData = [] } = service;

	if (!rateData || isEmpty(rateData)) {
		return 'No Rates';
	}

	let currency = '';

	const totalPrice = rateData
		.map((rateItem) => {
			currency = rateItem.total_price_currency;
			return rateItem.total_price_discounted;
		})
		.reduce((accumulator, value) => accumulator + value, 0);

	return formatAmount({
		amount  : totalPrice,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});
};

function ListItem({
	serviceItem = {},
	loading,
	onClickAdd = () => {},
	setIsOpen = () => {},
	isOpen = {},
	SERVICES_CANNOT_BE_REMOVED = [],
}) {
	const [isHovered, setIsHovered] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { isSelected = false, name = '', service_type = '', title = '' } = serviceItem;

	const { handleRemoveService } = useDeleteAdditionalService({ service: serviceItem });

	const handleMouseEnter = () => { setIsHovered(true); };
	const handleMouseLeave = () => { setIsHovered(false); };
	const handleDelete = (event) => {
		event.stopPropagation();
		event.preventDefault();

		if (SERVICES_CANNOT_BE_REMOVED.includes(serviceItem.name)) {
			Toast.error('This service cannot be removed');
			return;
		}
		setShowDeleteModal(true);
	};
	const handleClickOnContainer = () => {
		if (isOpen.name === serviceItem.name) {
			setIsOpen(false);
		} else setIsOpen(serviceItem);
	};

	const SelectedIcon = isHovered ? IcMMinusInCircle : IcCFtick;

	return (
		<div
			role="presentation"
			key={name}
			disabled={loading}
			className={`${styles.service} ${isSelected ? styles.active : null}`}
			onClick={handleClickOnContainer}
		>

			<div className={styles.service_div}>
				<span className={styles.icon}>{ICONS_MAPPING[service_type]}</span>

				<span className={styles.service_text}>{title}</span>
			</div>

			<div className={styles.icn_container}>
				{isSelected ? (
					<strong className={styles.rate}>{getRates(serviceItem)}</strong>
				) : null}

				{isSelected ? (
					<SelectedIcon
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						height={25}
						width={25}
						className={styles.tick_icon}
						onClick={handleDelete}
					/>
				) : (
					<IcMPlus
						disabled={loading}
						height={22}
						width={22}
						className={styles.add_icon}
						fill="black"
						onClick={() => {
							onClickAdd(serviceItem);
						}}
					/>
				)}
			</div>

			{showDeleteModal ? (
				<div
					role="presentation"
					onClick={(event) => {
						event.stopPropagation();
						event.preventDefault();
					}}
				>
					<DeleteServiceModal
						show={showDeleteModal}
						setShow={setShowDeleteModal}
						service_name={serviceItem.title}
						onClick={(event) => {
							event.stopPropagation();
							event.preventDefault();
							handleRemoveService();
						}}
						loading={loading}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ListItem;
