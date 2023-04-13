import { Textarea, Modal, Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import useSezApproveReject from '../../apisModal/useSezApproveReject';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

interface SezInterface {
	name?: string,
	pincode?: number | string,
	taxNumber?: number | string,
	address?: string,
	documentUrls?: string[],
}

interface Org {
	businessName?:string,
	tradePartyType?:string,
}

interface Props {
	sezRequest?: SezInterface,
	id?: string,
	refetch?:()=>void,
	organization?:Org,
	isEditable?:boolean,
	remark?:string,
}

function SezApproval({ sezRequest, organization, id, refetch = () => {}, isEditable = true, remark }:Props) {
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		remarks: null,
	});

	const { name, pincode, taxNumber, address, documentUrls } = sezRequest || {};
	const { businessName:organizationName, tradePartyType = '' } = organization || {};

	const { useOnAction:OnAction, loading } = useSezApproveReject({
		refetch,
		setShowModal,
		id,
		sezRequest,
	});

	const details = [
		{ title: 'Organization Name', value: <div>{organizationName || ''}</div> },
		{ title: 'Trade Party Type', value: <div>{tradePartyType?.replaceAll('_', ' ') || ''}</div> },
		{ title: 'Business Name', value: <div>{name || ''}</div> },
		{ title: 'Bill Address', value: <div>{address || ''}</div> },
		{ title: 'Pincode', value: <div>{pincode || ''}</div> },
		{ title: 'Tax Number', value: <div>{taxNumber || ''}</div> },
		{
			title : 'Documents',
			value : (
				<div>
					{(documentUrls || []).map((item) => (
						<div className={styles.doc}>
							<a
								target="_blank"
								href={item}
								className={styles.file_link}
								rel="noreferrer"
							>
								View Document
							</a>
							<div className={styles.eye}><IcMEyeopen /></div>
						</div>
					))}
				</div>),
		},
	];

	const isDisabled = loading || !inputValues.remarks;

	useEffect(() => {
		if (!showModal) {
			setInputValues({
				remarks: null,
			});
		}
	}, [showModal]);

	return (
		<div>
			<div>
				<ViewButton state={setShowModal} />
			</div>
			{showModal && (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header title="Sez Approval" />
					<Modal.Body>
						{details?.map((detail) => (
							<div key={detail.title} className={styles.flex}>
								<div className={styles.title}>
									{detail.title}
								</div>
								<div className={styles.divider}>
									:
								</div>
								<div className={styles.name}>
									<div>{detail.value}</div>
								</div>
							</div>
						))	}

						<div>
							<div style={{ display: 'flex' }}>
								<div className={styles.input_titles}>Remarks*</div>
								<span className={styles.divider}>:</span>
								<Textarea
									name="remark"
									size="sm"
									placeholder="Enter Remarks Here..."
									disabled={!isEditable}
									onChange={(value: string) => setInputValues({ ...inputValues, remarks: value })}
									value={remark}
									className={styles.text_area}
								/>
							</div>
						</div>

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										OnAction({ inputValues, status: 'APPROVED' });
									}}
								>
									Approve
								</Button>
								<Button
									themeType="secondary"
									size="md"
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										OnAction({ inputValues, status: 'REJECTED' });
									}}
								>
									Reject
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default SezApproval;
