import { Toast, Loader, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useSpotSearchService from '../../../../../page-components/SearchResults/hooks/useCreateSpotSearchService';
import DeleteServiceModal from '../../../common/DeleteServiceModal';
import { getFclPayload } from '../../configs';
import useDeleteAdditionalService from '../../hooks/useDeleteAdditionalService';
import ICONS_MAPPING from '../../icons-mapping';

import styles from './styles.module.css';

const INITIAL_REDUCE_VALUE = 0;

function ListItem({
	serviceItem = {},
	detail = {},
	rateCardData = {},
	setHeaderProps = () => {},
	refetch = () => {},
	SERVICES_CANNOT_BE_REMOVED = [],
}) {
	const [isHovered, setIsHovered] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { addService = () => {}, loading } = useSpotSearchService({
		refetchSearch : refetch,
		rateCardData,
		checkout_id   : detail?.checkout_id,
	});

	const { isSelected = false, name = '', service_type = '', title = '' } = serviceItem;

	const source = detail?.checkout_id ? 'checkout' : 'search_results';

	const {
		handleRemoveService,
		loading:deleteLoading,
	} = useDeleteAdditionalService({ service: serviceItem, refetch, source });

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

	const handleAddServices = async (service) => {
		if (!service.controls.length) {
			const payload = getFclPayload({
				rateCardData,
				detail,
				additionalFormInfo : {},
				service_name       : service.name,
			});
			await addService(payload);
			return;
		}

		setHeaderProps({
			key           : 'additional_services_details',
			rateCardData,
			setHeaderProps,
			service       : serviceItem,
			refetchSearch : refetch,
			detail,
		});
	};

	function RenderRate() {
		if (!isSelected) return null;

		const { rateData = [] } = serviceItem;

		if (!rateData || isEmpty(rateData) || !rateData[GLOBAL_CONSTANTS.zeroth_index]?.total_price_discounted) {
			if (serviceItem.service_type === 'fcl_freight_local') {
				return 'At Actuals';
			}
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
	}

	function RenderIcon() {
		const SelectedIcon = isHovered ? IcMMinusInCircle : IcCFtick;

		if (loading) {
			return <Loader style={{ marginRight: 24 }} themeType="primary" />;
		}

		if (isSelected) {
			return (
				<SelectedIcon
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					height={25}
					width={25}
					className={styles.tick_icon}
					onClick={handleDelete}
				/>
			);
		}

		return (
			<IcMPlus
				disabled={loading}
				height={22}
				width={22}
				className={styles.add_icon}
				fill="black"
				onClick={() => handleAddServices(serviceItem)}
			/>
		);
	}

	return (
		<div
			key={name}
			disabled={loading}
			className={cl`${styles.service} ${isSelected ? styles.active : null}`}
		>

			<div className={styles.service_div}>
				<span className={styles.icon}>{ICONS_MAPPING[service_type]}</span>

				<span className={styles.service_text}>{title}</span>
			</div>

			<div className={styles.icn_container}>
				<strong className={styles.rate}>
					<RenderRate />
				</strong>

				<RenderIcon />
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
