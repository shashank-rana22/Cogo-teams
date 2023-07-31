import { Tooltip, Loader, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import DeleteServiceModal from '../../common/DeleteServiceModal';
import useAddSubsidiaryService from '../hooks/useAddSubsidiaryService';
import useDeleteSubsidiaryService from '../hooks/useDeleteSubsidiaryService';

import styles from './styles.module.css';

function ServiceItem({
	itemData = {},
	data = {},
	selectedServices = [],
	popularServices = [],
	possible_subsidiary_services = [],
	setPopularServices = () => {},
	refetch = () => {},
	disabled = false,
	setIsDisabled = () => {},
	checkout_id = '',
}) {
	const [isHovered, setIsHovered] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	const {
		loading: addServiceLoading,
		handleAddSubsidiaryService: handleAddService,
	} = useAddSubsidiaryService({
		possible_subsidiary_services,
		data,
		refetch,
		checkout_id,
	});

	const { loading: deleteLoading, handleDeleteService } = useDeleteSubsidiaryService({
		refetch,
		data,
		setShow        : setShowDelete,
		checkout_id,
		spot_search_id : data?.spot_search_id,
	});

	const { label, value } = itemData || {};

	const onClickDelete = async () => {
		const deleted = await handleDeleteService(value.split('_')[GLOBAL_CONSTANTS.zeroth_index]);
		if (!deleted) return;

		setPopularServices([...popularServices, { ...itemData }]);
	};

	const onClickAdd = async () => {
		setIsDisabled(value);

		const added = await handleAddService(value);
		setIsDisabled('');
		if (!added) return;

		setPopularServices((prev) => (prev.filter((item) => item.value !== value)));
	};

	const handleMouseEnter = () => { setIsHovered(true); };
	const handleMouseLeave = () => { setIsHovered(false); };

	const SelectedIcon = isHovered ? IcMMinusInCircle : IcCFtick;

	const renderIcon = () => {
		if (addServiceLoading) {
			return <Loader themeType="primary" />;
		}

		if (selectedServices.some((item) => item.value === value)) {
			return (
				<SelectedIcon
					className={styles.selected_icon}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					height={22}
					width={22}
					onClick={() => setShowDelete(true)}
				/>
			);
		}

		return (
			<IcMPlus
				height={22}
				width={22}
				className={cl`${styles.add_icon} ${disabled ? styles.disabled : {}}`}
				fill="black"
				onClick={onClickAdd}
			/>
		);
	};

	return (
		<div className={styles.container}>
			<Tooltip
				content={<div className={styles.tooltip_content}>{label}</div>}
				placement="top"
			>
				<div className={styles.text}>{label}</div>
			</Tooltip>

			{renderIcon()}

			{showDelete ? (
				<DeleteServiceModal
					loading={deleteLoading}
					show={showDelete}
					setShow={setShowDelete}
					service_name={label}
					onClick={onClickDelete}
				/>
			) : null}

		</div>
	);
}

export default ServiceItem;
