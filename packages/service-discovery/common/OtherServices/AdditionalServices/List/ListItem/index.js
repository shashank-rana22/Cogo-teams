import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import DeleteServiceModal from '../../../common/DeleteServiceModal';
import useDeleteAdditionalService from '../../hooks/useDeleteAdditionalService';
import ICONS_MAPPING from '../../icons-mapping';

import styles from './styles.module.css';

const INITIAL_REDUCE_VALUE = 0;

function ListItem({
	serviceItem = {},
	loading,
	onClickAdd = () => {},
	refetch = () => {},
	SERVICES_CANNOT_BE_REMOVED = [],
}) {
	const [isHovered, setIsHovered] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { isSelected = false, name = '', service_type = '', title = '' } = serviceItem;

	const {
		handleRemoveService,
		loading:deleteLoading,
	} = useDeleteAdditionalService({ service: serviceItem, refetch });

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

	const renderRate = () => {
		if (!isSelected) return null;

		const { rateData = [] } = serviceItem;

		if (!rateData || isEmpty(rateData) || !rateData[GLOBAL_CONSTANTS.zeroth_index]?.total_price_discounted) {
			return 'No Rates';
		}

		let currency = '';
		const totalPrice = rateData
			.map((rateItem) => {
				currency = rateItem.total_price_currency;
				return rateItem.total_price_discounted;
			})
			.reduce((accumulator, value) => accumulator + value, INITIAL_REDUCE_VALUE);

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

	const SelectedIcon = isHovered ? IcMMinusInCircle : IcCFtick;

	return (
		<div
			key={name}
			disabled={loading}
			className={`${styles.service} ${isSelected ? styles.active : null}`}
		>

			<div className={styles.service_div}>
				<span className={styles.icon}>{ICONS_MAPPING[service_type]}</span>

				<span className={styles.service_text}>{title}</span>
			</div>

			<div className={styles.icn_container}>
				<strong className={styles.rate}>{renderRate()}</strong>

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
						onClick={handleRemoveService}
						loading={deleteLoading}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ListItem;
