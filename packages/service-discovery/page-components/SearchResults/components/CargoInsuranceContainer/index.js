import { IcCFtick, IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import CargoInsurance from '../../common/CargoInsurance';

import DeleteModal from './DeleteModal';
import styles from './styles.module.css';

const isCargoInsurancePresent = (services) => {
	const isAlreadyPresent = Object.values(services || {}).some(
		(item) => item.service_type === 'cargo_insurance',
	);
	return isAlreadyPresent;
};

function CargoInsuranceContainer({ data = {}, refetch = () => {}, card_id = '' }) {
	const primary_service = data?.search_type || data?.primary_service;

	const {
		spot_search_id = '',
		service_details = {},
		importer_exporter_id = '',
		trade_type = '',
		importer_exporter = {},
		user_id = '',
	} = data || {};

	const isCargoInsuranceAlreadyTaken = isCargoInsurancePresent(service_details);

	const [isSelected, setIsSelected] = useState(isCargoInsuranceAlreadyTaken);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const primaryServiceDetails = Object.values(service_details || {}).find(
		(item) => item.service_type === primary_service,
	);

	const service_type = primaryServiceDetails?.service_type || primary_service;

	const { destination_country_id = '', origin_country_id = '' } = primaryServiceDetails || {};

	const refetchSearch = () => refetch({
		screenObj: {
			screen: 'selectedCard',
			card_id,
		},
	});

	const handleDelete = () => {
		setShowDeleteModal(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Other Services</div>

			<div className={styles.wrapper}>
				<div className={styles.left_section}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image_221.svg"
						alt="insurance"
						width={32}
						height={32}
					/>

					<span className={styles.label}>Cargo Insurance</span>
				</div>

				<div className={styles.right_section}>
					<div className={styles.starting_at_price}>Starting at $0.25/km</div>

					{isSelected ? (
						<IcCFtick
							height={25}
							width={25}
							className={styles.tick_icon}
							onClick={handleDelete}
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
				<CargoInsurance
					destination_country_id={destination_country_id}
					origin_country_id={origin_country_id}
					trade_type={trade_type}
					importer_exporter_id={importer_exporter_id || importer_exporter?.id}
					user_id={user_id}
					service_type={service_type}
					spot_search_id={spot_search_id}
					refetch={refetchSearch}
					importer_exporter={importer_exporter}
					addCargoInsurance={showModal}
					setAddCargoInsurance={setShowModal}
					setDone={setIsSelected}
				/>
			)}

			{showDeleteModal ? (
				<DeleteModal
					show={showDeleteModal}
					setShow={setShowDeleteModal}
					service={{}}
				/>
			) : null}
		</div>
	);
}

export default CargoInsuranceContainer;
