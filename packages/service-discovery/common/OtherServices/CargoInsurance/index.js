import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcACarriageInsurancePaidTo, IcCFtick, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import DeleteServiceModal from '../DeleteServiceModal';

import CargoInsuranceModal from './CargoInsuranceModal';
import useDeleteCargoInsurance from './CargoInsuranceModal/hooks/useDeleteCargoInsurance';
import styles from './styles.module.css';

const isCargoInsurancePresent = (services) => {
	const isAlreadyPresent = Object.values(services || {}).find(
		(item) => item.service_type === 'cargo_insurance',
	);
	return isAlreadyPresent;
};

function CargoInsurance({ data = {}, refetch = () => {} }) {
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const primary_service = data?.search_type || data?.primary_service;

	const {
		spot_search_id = '',
		checkout_id = '',
		service_details = {},
		importer_exporter_id = '',
		trade_type = '',
		importer_exporter = {},
		user_id = '',
	} = data || {};

	const { loading, handleDelete } = useDeleteCargoInsurance({
		service_details,
		checkout_id,
		spot_search_id,
		setShow: setShowDeleteModal,
		refetch,
	});

	const cargoInsuranceAlreadyTaken = isCargoInsurancePresent(service_details);

	const [isSelected, setIsSelected] = useState(cargoInsuranceAlreadyTaken);

	const primaryServiceDetails = Object.values(service_details || {}).find(
		(item) => item.service_type === primary_service,
	);

	const service_type = primaryServiceDetails?.service_type || primary_service;

	const { destination_country_id = '', origin_country_id = '' } = primaryServiceDetails || {};

	const onClickDelete = async () => { await handleDelete(); };

	const handleMouseEnter = () => { setIsHovered(true); };

	const handleMouseLeave = () => { setIsHovered(false); };

	const SelectedIcon = isHovered ? IcMMinusInCircle : IcCFtick;

	useEffect(() => {
		setIsSelected(cargoInsuranceAlreadyTaken);
	}, [cargoInsuranceAlreadyTaken]);

	console.log('isgcfvhb', isSelected);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Other Services</div>

			<div className={styles.wrapper}>
				<div className={styles.left_section}>

					<IcACarriageInsurancePaidTo
						width={32}
						height={32}
					/>

					<span className={styles.label}>Cargo Insurance</span>
				</div>

				<div className={styles.right_section}>
					{isEmpty(isSelected) ? (
						<div className={styles.starting_at_price}>Starting at $0.25/km</div>
					) : (
						<strong className={styles.rate_found}>
							{formatAmount({
								currency : isSelected?.saas_rate?.currency,
								amount   : isSelected?.saas_rate?.totalCharges,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							})}
						</strong>
					)}

					{!isEmpty(isSelected) ? (
						<SelectedIcon
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							height={25}
							width={25}
							className={styles.tick_icon}
							onClick={() => setShowDeleteModal(true)}
						/>
					) : (
						<IcMPlus
							height={22}
							width={22}
							className={styles.add_icon}
							fill="black"
							onClick={() => setShowModal(true)}
						/>
					)}
				</div>
			</div>

			{showModal && (
				<CargoInsuranceModal
					destination_country_id={destination_country_id}
					origin_country_id={origin_country_id}
					trade_type={trade_type}
					importer_exporter_id={importer_exporter_id || importer_exporter?.id}
					user_id={user_id}
					service_type={service_type}
					spot_search_id={spot_search_id}
					refetch={refetch}
					importer_exporter={importer_exporter}
					addCargoInsurance={showModal}
					setAddCargoInsurance={setShowModal}
					setDone={setIsSelected}
					service_details={service_details}
					checkout_id={checkout_id}
				/>
			)}

			{showDeleteModal ? (
				<DeleteServiceModal
					show={showDeleteModal}
					setShow={setShowDeleteModal}
					service_name="cargo_insurance"
					onClick={onClickDelete}
					loading={loading}
				/>
			) : null}
		</div>
	);
}

export default CargoInsurance;
