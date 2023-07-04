import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useMemo, useState, useEffect, useContext, useCallback } from 'react';

import useCreateCustomerInvoice from '../../hooks/useCreateCustomerInvoice';
import useListOrganizationAssets from '../../hooks/useListOrganizationAssets';
import AWSUploadModal from '../AWSUploadModal';

import AddOrganizationAssetModal from './AddOrganizationAssetModal';
import useCreateOrganizationAsset from './AddOrganizationAssetModal/hooks/useCreateOrganizationAsset';
import styles from './styles.module.css';

const SkeletonGroup = ['A', 'B', 'C'].map((item) => (
	<div key={item} height="100px" width="100%" />
));

function VerifyAssetModal({ truckList = [], setShow = () => {} }) {
	const [showInternal, setShowInternal] = useState(false);
	const [showUploadDoc, setShowUploadDoc] = useState(false);
	const [uploadProof, setUploadProof] = useState(null);

	const { shipment_data } = useContext(ShipmentDetailContext);
	const { createCustomerInvoice } = useCreateCustomerInvoice({ shipment_data });

	const truckNumbers = useMemo(
		() => truckList.map((truck) => truck?.truck_number),
		[truckList],
	);

	const organizationId = truckList[GLOBAL_CONSTANTS.zeroth_index]?.service_provider_id;
	const { data: verifiedTruckList, getData: getVerifiedTruckList } = useListOrganizationAssets({
		id: organizationId,
		truckNumbers,
	});

	const { createOrgAsset, createOrganizationAssetAPI } = useCreateOrganizationAsset({
		fetch           : getVerifiedTruckList,
		organization_id : organizationId,
		item            : showInternal,
		setItem         : setShowInternal,
	});

	const { loading } = createOrganizationAssetAPI;

	const createCustomerInvoicefn = useCallback(async (truckObj) => {
		const truck = truckList.find(
			(truckData) => truckData.truck_number === truckObj?.data?.truck_number,
		);
		await createCustomerInvoice({
			uploadProof   : truckObj?.image_url,
			file_name     : `ftl_registration_certificate_${truck?.id}`,
			service_id    : truck?.id,
			document_type : 'ftl_registration_certificate',
		});
	}, [truckList, createCustomerInvoice]);

	const onSubmit = useCallback(async (values) => {
		await createOrgAsset(values);
	}, [createOrgAsset]);

	useEffect(() => {
		if (uploadProof && showInternal) {
			setShowUploadDoc(false);
			onSubmit({
				name                      : showInternal?.name,
				organization_branch_id    : showInternal?.organization_branch_id,
				asset_type                : showInternal?.asset_type,
				owner_name                : showInternal?.data?.owner_name,
				vehicle_category          : showInternal?.data?.vehicle_category,
				vehicle_type              : showInternal?.data?.vehicle_type,
				truck_number              : showInternal?.name,
				asset_registration_number : showInternal?.data?.asset_registration_number,
				registration_date         : showInternal?.data?.registration_date,
				rc_valid_till             : showInternal?.data?.rc_valid_till,
				insurance_valid_till      : showInternal?.data?.insurance_valid_till,
				insurance_policy_type     : showInternal?.data?.insurance_policy_type,
				insurance_policy_number   : showInternal?.data?.insurance_policy_number,
				image_url                 : uploadProof,
			});
		}
	}, [uploadProof, onSubmit, showInternal]);

	const categorisedTruckList = useMemo(
		() => truckList.reduce(
			(acc, truck) => {
				const foundTruckObj = (verifiedTruckList?.list || []).find(
					(verifiedTruck) => verifiedTruck.data?.truck_number === truck.truck_number,
				);
				if (foundTruckObj) {
					if (foundTruckObj.verification_status === 'verified') acc.verified.push(foundTruckObj);
					else acc.unverified.push(foundTruckObj);
				} else acc.unverified.push(truck);
				return acc;
			},
			{ verified: [], unverified: [] },
		),
		[verifiedTruckList, truckList],
	);

	const truckListJSX = useMemo(
		() => Object.entries(categorisedTruckList).map(([truckType, listOfTrucks]) => (listOfTrucks.length ? (
			<div className={styles.truck_type_heading} key={truckType}>
				<span className={styles.truck_type}>
					{truckType}
					&nbsp;
					trucks
				</span>
				<ul>
					{listOfTrucks.map((truck) => (
						<li key={truck.truck_number || truck?.data?.truck_number}>
							<div className="truckBox">
								<span>
									Truck Number:
									&nbsp;
									{truck.truck_number || truck?.data?.truck_number}
								</span>
								<div className={styles.action_row}>
									<Button
										onClick={() => setShowInternal(truck)}
										disabled={truckType === 'verified'}
									>
										Edit Info
									</Button>
									&nbsp;
									<Button
										onClick={() => {
											setUploadProof(null);
											setShowInternal(truck);
											setShowUploadDoc(true);
										}}
										disabled={!truck?.image_url}
										style={{ marginLeft: '10px' }}
									>
										Upload Document
									</Button>
									<Button
										onClick={() => {
											createCustomerInvoicefn(truck);
										}}
										disabled={!truck?.image_url}
										style={{ marginLeft: '10px' }}
									>
										Sync document with shipment data
									</Button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		) : null)),
		[categorisedTruckList, createCustomerInvoicefn],
	);

	if (!truckList?.length) {
		return (
			<Modal
				show
				onClose={() => setShow(false)}
				closeOnOuterClick={false}
				showCloseIcon
			>
				<Modal.Header
					title={(
						<div className={styles.heading}>
							Truck List
						</div>
					)}
				/>
				<Modal.Body>
					<div style={{ marginTop: '1rem' }}>No Truck Found</div>
				</Modal.Body>
			</Modal>
		);
	}

	return (
		<Modal
			show
			onClose={() => setShow(false)}
			closeOnOuterClick={false}
			showCloseIcon={!loading}
		>
			<Modal.Header title={(
				<div>
					Truck List
				</div>
			)}
			/>
			<Modal.Body>
				<div>
					{showUploadDoc ? (
						<AWSUploadModal
							hide={() => {
								setShowInternal(null);
								setShowUploadDoc(false);
							}}
							setUploadProof={setUploadProof}
							uploadProof={uploadProof || showInternal?.image_url}
							customText="RC Proof"
						/>
					) : (
						<div>
							{!loading ? (
								<>
									{truckListJSX}
									<AddOrganizationAssetModal
										showInternal={showInternal}
										setShowInternal={setShowInternal}
										organization_id={organizationId}
										fetch={getVerifiedTruckList}
										setShow={setShow}
									/>
								</>
							) : (
								{ SkeletonGroup }
							)}
						</div>
					)}
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default VerifyAssetModal;
