import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useMemo, useState, useEffect, useContext, useCallback } from 'react';

import useCreateCustomerInvoice from '../../hooks/useCreateCustomerInvoice';
import useListOrganizationPocs from '../../hooks/useListOrganizationPocs';
import AWSUploadModal from '../AWSUploadModal';

import AddOrganizationPoc from './AddPoc';
import useCreateOrganizationPoc from './AddPoc/hooks/useCreateOrganizationPoc';
import styles from './styles.module.css';

const SkeletonGroup = ['A', 'B', 'C'].map((item) => (
	<div key={item} height="100px" width="100%" />
));

function VerifyDriverModal({ driverList = [], setShow = () => {} }) {
	const organizationId = driverList[GLOBAL_CONSTANTS.zeroth_index]?.service_provider_id;
	const [showInternal, setShowInternalInternal] = useState(false);
	const [showInternalUploadDoc, setShowInternalInternalUploadDoc] = useState(false);
	const [uploadProof, setUploadProof] = useState(null);

	const mobileNumberList = useMemo(
		() => driverList.map((driver) => driver?.contact_number),
		[driverList],
	);

	const { data: verifiedDriverList, getData: getVerifiedDriverList } = useListOrganizationPocs({
		id: organizationId,
		mobileNumberList,
	});

	const { createOrgPoc, createOrganizationPocAPI } = useCreateOrganizationPoc({
		fetch           : getVerifiedDriverList,
		organization_id : organizationId,
		item            : showInternal,
		setItem         : setShowInternalInternal,
	});

	const { shipment_data } = useContext(ShipmentDetailContext);

	const { createCustomerInvoice } = useCreateCustomerInvoice({ shipment_data });

	const categorisedDriverList = useMemo(
		() => driverList.reduce(
			(acc, driver) => {
				const foundDriverObj = (verifiedDriverList?.list || []).find(
					(verifiedDriver) => verifiedDriver.mobile_number === driver.contact_number,
				);
				if (foundDriverObj) {
					if (foundDriverObj?.data?.verification_status === 'verified') acc.verified.push(foundDriverObj);
					else acc.unverified.push(foundDriverObj);
				} else acc.unverified.push(driver);
				return acc;
			},
			{ verified: [], unverified: [] },
		),
		[verifiedDriverList, driverList],
	);

	const { loading } = createOrganizationPocAPI;

	const createCustomerInvoicefn = useCallback(async (driverObj) => {
		const driver = driverList.find(
			(driverData) => driverData.contact_number === driverObj.mobile_number,
		);
		await createCustomerInvoice({
			uploadProof   : driverObj?.data?.driving_license_document,
			file_name     : `ftl_driver_licence_certificate_${driver?.service_id}`,
			service_id    : driver?.service_id,
			document_type : 'ftl_driver_licence_certificate',
		});
	}, [driverList, createCustomerInvoice]);

	const onSubmit = useCallback(async (values) => {
		await createOrgPoc(values);
	}, [createOrgPoc]);

	useEffect(() => {
		if (uploadProof && showInternal) {
			setShowInternalInternalUploadDoc(false);
			onSubmit({
				name                   : showInternal?.name,
				email                  : showInternal?.email,
				organization_branch_id : showInternal?.organization_branch_id,
				mobile_number          : {
					mobile_country_code : showInternal?.mobile_country_code,
					mobile_number       : showInternal?.mobile_number,
				},
				dob                      : showInternal?.data?.dob,
				address                  : showInternal?.data?.address,
				pincode                  : showInternal?.data?.pincode,
				address_proof_type       : showInternal?.data?.address_proof_type,
				address_proof_number     : showInternal?.data?.address_proof_number,
				pan_number               : showInternal?.data?.pan_number,
				pan_url                  : showInternal?.data?.pan_url,
				driver_license_type      : showInternal?.data?.driver_license_type,
				dl_number                : showInternal?.data?.dl_number,
				last_date_of_validity_dl : showInternal?.data?.last_date_of_validity_dl,
				bank_name                : showInternal?.data?.bank_account_details?.bank_name,
				branch_name              : showInternal?.data?.bank_account_details?.branch_name,
				ifsc_number              : showInternal?.data?.bank_account_details?.ifsc_number,
				account_holder_name:
					showInternal?.data?.bank_account_details?.account_holder_name,
				bank_account_number:
					showInternal?.data?.bank_account_details?.bank_account_number,
				cancelled_cheque         : showInternal?.data?.bank_account_details?.cancelled_cheque,
				pan_details_heading      : '',
				empty_row                : '',
				driver_details_heading   : '',
				bank_details_heading     : '',
				address_details_heading  : '',
				driving_license_document : uploadProof,
			});
		}
	}, [uploadProof, onSubmit, showInternal]);

	const driverListJSX = useMemo(
		() => Object.entries(categorisedDriverList).map(([driverType, listOfDrivers]) => (listOfDrivers.length ? (
			<div key={driverType}>
				<span className={styles.driver_type}>
					{driverType}
					&nbsp;
					drivers
				</span>
				<ul>
					{listOfDrivers.map((driver) => (
						<li key={driver.name}>
							<div>
								<span>
									Driver Name:
									&nbsp;
									{driver.driver_name || driver.name}
								</span>
								<div className={styles.actionRow}>
									<Button
										onClick={() => setShowInternalInternal(driver)}
										disabled={driverType === 'verified'}
									>
										Edit Info
									</Button>
									&nbsp;
									<Button
										onClick={() => {
											setUploadProof(null);
											setShowInternalInternal(driver);
											setShowInternalInternalUploadDoc(true);
										}}
										disabled={!driver?.data}
										style={{ marginLeft: '10px' }}
									>
										Upload Document
									</Button>
									<Button
										onClick={() => {
											createCustomerInvoicefn(driver);
										}}
										disabled={!driver?.data?.driving_license_document}
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
		[categorisedDriverList, createCustomerInvoicefn],
	);

	if (!driverList?.length) {
		return (
			<Modal
				show
				onClose={() => setShow(false)}
				closeOnOuterClick={false}
				showInternalCloseIcon={!loading}
			>
				<Modal.Header title={(
					<div className={styles.heading}>
						Driver List
					</div>
				)}
				/>
				<Modal.Body>
					<div style={{ marginTop: '1rem' }}>No Driver Found</div>
					{SkeletonGroup}
				</Modal.Body>

			</Modal>
		);
	}

	return (
		<Modal
			show
			onClose={() => setShow(false)}
			closeOnOuterClick={false}
			showInternalCloseIcon={!loading}
		>
			<Modal.Header title={(
				<div className={styles.heading}>
					Driver List
				</div>
			)}
			/>
			<Modal.Body>
				<div>
					{showInternalUploadDoc ? (
						<AWSUploadModal
							hide={() => {
								setShowInternalInternal(null);
								setShowInternalInternalUploadDoc(false);
							}}
							setUploadProof={setUploadProof}
							uploadProof={uploadProof || showInternal?.data?.driving_license_document}
							customText="DL Proof"
						/>
					) : (
						<div>
							{!loading ? (
								<>
									{driverListJSX}
									<AddOrganizationPoc
										organization_id={organizationId}
										fetch={getVerifiedDriverList}
										showInternal={showInternal}
										setShowInternalInternal={setShowInternalInternal}
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

export default VerifyDriverModal;
