import { Loader, cl, Tooltip, Placeholder, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick, IcMInfo, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useSpotSearchService from '../../../../../page-components/SearchResults/hooks/useCreateSpotSearchService';
import DeleteServiceModal from '../../../common/DeleteServiceModal';
import { getServiceWisePayload } from '../../configs';
import useDeleteAdditionalService from '../../hooks/useDeleteAdditionalService';
import ICONS_MAPPING from '../../icons-mapping';

import styles from './styles.module.css';

const INITIAL_REDUCE_VALUE = 0;
const DEFAULT_PRICE_VALUE = 0;

const formatPrice = (currency, amount) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 0,
	},
});

function ListItem({
	serviceItem = {},
	detail = {},
	rateCardData = {},
	setHeaderProps = () => {},
	refetch = () => {},
	SERVICES_CANNOT_BE_REMOVED = [],
	startingPrices = [],
	startingPriceLoading = false,
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
		setShowDeleteModal(true);
	};

	const handleAddServices = async (service) => {
		if (!service.controls.length) {
			const payload = getServiceWisePayload({ primary_service: detail.primary_service || detail.service_type })({
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
		if (startingPriceLoading && !isSelected) {
			return <Placeholder height="24px" width="100px" style={{ borderRadius: 4 }} />;
		}

		if (!isSelected) {
			const priceObj = (startingPrices || []).find((item) => item.id === serviceItem.name);

			const { price = 0 } = priceObj || {};

			if (!price) return null;

			return (
				<span className={styles.starting_price}>
					Starting at
					{' '}
					<strong>{formatPrice(rateCardData?.total_price_currency, price)}</strong>
					/Ctr.
				</span>
			);
		}

		const { rateData = [], source:rateCardSource = '' } = serviceItem;

		if (!rateData || isEmpty(rateData) || !rateData[GLOBAL_CONSTANTS.zeroth_index]?.total_price_discounted) {
			if (serviceItem.service_type === 'fcl_freight_local') {
				if (rateCardSource === 'cogo_assured_rate') {
					return (
						<div>
							<div className={styles.rate_not_available_for_all}>
								<strong>No Rates</strong>

								<Button
									size="sm"
									themeType="accent"
									className={styles.remove_service_button}
									onClick={handleDelete}
								>
									Remove service
								</Button>
							</div>
							<span className={styles.remove_heading}>** Remove this service to continue</span>
						</div>
					);
				} return 'At Actuals';
			}
			return 'No Rates';
		}
		const currency = rateData?.[GLOBAL_CONSTANTS.zeroth_index]?.total_price_currency;
		let ratesAvailableForAll = true;

		const totalPrice = rateData
			.map((rateItem) => {
				if (!rateItem.total_price_discounted) {
					ratesAvailableForAll = false;
				}
				return rateItem.total_price_discounted || DEFAULT_PRICE_VALUE;
			})
			.reduce((accumulator, value) => accumulator + value, INITIAL_REDUCE_VALUE);

		const formattedAmount = formatPrice(currency, totalPrice);

		if (!ratesAvailableForAll) {
			return (
				<div className={styles.rate_not_available_for_all}>
					<span>{formattedAmount}</span>

					<Tooltip
						content={(
							<div className={styles.tooltip_content}>
								Rates for all configurations might not be available
							</div>
						)}
						placement="top"
					>
						<IcMInfo height={12} width={12} className={styles.more_icon} />
					</Tooltip>
				</div>
			);
		}

		return formattedAmount;
	}

	function RenderIcon() {
		const isServiceRemovable = !SERVICES_CANNOT_BE_REMOVED.includes(serviceItem.name);

		const SelectedIcon = isHovered && isServiceRemovable ? IcMMinusInCircle : IcCFtick;

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
					onClick={(event) => isServiceRemovable && handleDelete(event)}
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
						onClickDelete={handleRemoveService}
						loading={deleteLoading}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ListItem;
