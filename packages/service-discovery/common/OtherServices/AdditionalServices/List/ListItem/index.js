import { Loader, cl } from '@cogoport/components';
import { IcCFtick, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import useSpotSearchService from '../../../../../page-components/SearchResults/hooks/useCreateSpotSearchService';
import DeleteServiceModal from '../../../common/DeleteServiceModal';
import { getServiceWisePayload } from '../../configs';
import useDeleteAdditionalService from '../../hooks/useDeleteAdditionalService';
import ICONS_MAPPING from '../../icons-mapping';

import RenderRate from './RenderRate';
import styles from './styles.module.css';

function ListItem({
	serviceItem = {},
	detail = {},
	rateCardData = {},
	setHeaderProps = () => {},
	refetch = () => {},
	SERVICES_CANNOT_BE_REMOVED = [],
	startingPrices = [],
	startingPriceLoading = false,
	isMobile = false,
}) {
	const [isHovered, setIsHovered] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { addService = () => {}, loading } = useSpotSearchService({
		refetchSearch : refetch,
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

	function RenderIcon() {
		const isServiceRemovable = !SERVICES_CANNOT_BE_REMOVED.includes(serviceItem.name);

		const SelectedIcon = isHovered && isServiceRemovable ? IcMMinusInCircle : IcCFtick;

		if (loading) {
			return <Loader className={styles.loader} themeType="primary" />;
		}

		if (isSelected) {
			return (
				<SelectedIcon
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					height={isMobile ? 18 : 25}
					width={isMobile ? 18 : 25}
					className={styles.tick_icon}
					onClick={(event) => isServiceRemovable && handleDelete(event)}
				/>
			);
		}

		return (
			<IcMPlus
				disabled={loading}
				height={isMobile ? 16 : 22}
				width={isMobile ? 16 : 22}
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
			className={cl`${styles.service} ${isSelected && styles.active}`}
		>
			<div className={cl`${styles.service_div} ${!isSelected && styles.not_active}`}>
				<span className={styles.icon}>{ICONS_MAPPING[service_type]}</span>

				<span className={cl`${styles.service_text} ${!isSelected && styles.not_active}`}>{title}</span>
			</div>

			<div className={styles.icn_container}>
				<strong className={styles.rate}>
					<RenderRate
						serviceItem={serviceItem}
						rateCardData={rateCardData}
						handleDelete={handleDelete}
						startingPrices={startingPrices}
						startingPriceLoading={startingPriceLoading}
						source={source}
					/>
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
						isMobile={isMobile}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ListItem;
