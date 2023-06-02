import { Button, Skeleton } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useMemo, useState, useEffect, useContext, useCallback } from 'react';

import useCreateCustomerInvoice from '../../hooks/useCreateCustomerInvoice';
import useListOrganizationPocs from '../../hooks/useListOrganizationPocs';
import AWSUploadModal from '../AWSUploadModal';

import AddOrganizationPoc from './AddPoc';
import useCreateOrganizationPoc from './AddPoc/hooks/useCreateOrganizationPoc';
import styles from './styles.module.css';

const SkeletonGroup = [1, 2, 3].map((item) => (
	<Skeleton key={item} height="100px" width="100%" />
));

function VerifyDriverModal({ driverList = [], organizationId }) {
	const [show, setShow] = useState(false);
	const [showUploadDoc, setShowUploadDoc] = useState(false);
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
		item            : show,
		setItem         : setShow,
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
		if (uploadProof && show) {
			setShowUploadDoc(false);
			onSubmit({
				name                   : show?.name,
				email                  : show?.email,
				organization_branch_id : show?.organization_branch_id,
				mobile_number          : {
					mobile_country_code : show?.mobile_country_code,
					mobile_number       : show?.mobile_number,
				},
				dob                      : show?.data?.dob,
				address                  : show?.data?.address,
				pincode                  : show?.data?.pincode,
				address_proof_type       : show?.data?.address_proof_type,
				address_proof_number     : show?.data?.address_proof_number,
				pan_number               : show?.data?.pan_number,
				pan_url                  : show?.data?.pan_url,
				driver_license_type      : show?.data?.driver_license_type,
				dl_number                : show?.data?.dl_number,
				last_date_of_validity_dl : show?.data?.last_date_of_validity_dl,
				bank_name                : show?.data?.bank_account_details?.bank_name,
				branch_name              : show?.data?.bank_account_details?.branch_name,
				ifsc_number              : show?.data?.bank_account_details?.ifsc_number,
				account_holder_name:
					show?.data?.bank_account_details?.account_holder_name,
				bank_account_number:
					show?.data?.bank_account_details?.bank_account_number,
				cancelled_cheque         : show?.data?.bank_account_details?.cancelled_cheque,
				pan_details_heading      : '',
				empty_row                : '',
				driver_details_heading   : '',
				bank_details_heading     : '',
				address_details_heading  : '',
				driving_license_document : uploadProof,
			});
		}
	}, [uploadProof, onSubmit, show]);

	const driverListJSX = useMemo(
		() => Object.entries(categorisedDriverList).map(([driverType, listOfDrivers]) => (listOfDrivers.length ? (
			<div className={styles.driver_type_heading} key={driverType}>
				<span className="driver_type">
					{driverType}
					{' '}
					drivers
				</span>
				<ul>
					{listOfDrivers.map((driver) => (
						<li key={driver.name}>
							<div className="driverBox">
								<span>
									driver Name:
									{' '}
									{driver.driver_name || driver.name}
								</span>
								<div className="actionRow">
									<Button
										onClick={() => setShow(driver)}
										className="secondary md"
										disabled={driverType === 'verified'}
									>
										Edit Info
									</Button>
									{' '}
									<Button
										className="secondary md"
										onClick={() => {
											setUploadProof(null);
											setShow(driver);
											setShowUploadDoc(true);
										}}
										disabled={!driver?.data}
										style={{ marginLeft: '10px' }}
									>
										Upload Document
									</Button>
									<Button
										className="secondary md"
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
			<>
				<div className={styles.heading}>Driver List</div>
				<div style={{ marginTop: '1rem' }}>No Driver Found</div>
				{SkeletonGroup}
			</>
		);
	}

	return (
		<div>
			{showUploadDoc ? (
				<AWSUploadModal
					hide={() => {
						setShow(null);
						setShowUploadDoc(false);
					}}
					setUploadProof={setUploadProof}
					uploadProof={uploadProof || show?.data?.driving_license_document}
					customText="DL Proof"
				/>
			) : (
				<>
					<div className={styles.heading}>Driver List</div>
					{!loading ? (
						<>
							{driverListJSX}
							<AddOrganizationPoc
								organization_id={organizationId}
								fetch={getVerifiedDriverList}
								show={show}
								setShow={setShow}
							/>
						</>
					) : (
						{ SkeletonGroup }
					)}
				</>
			)}
		</div>
	);
}

export default VerifyDriverModal;
