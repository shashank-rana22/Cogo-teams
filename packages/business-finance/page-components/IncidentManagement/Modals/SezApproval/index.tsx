/* eslint-disable react/jsx-closing-tag-location */
import { Textarea, Modal, Button } from '@cogoport/components';
import { useEffect, useState } from 'react';

import useApproveConcor from '../../apisModal/useApproveConcor';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

interface ConcorInterface {
	bookingProof: string[],
	quotation: string[],
	sid: string,
	totalBuyPrice: number | string,
}

interface Props {
	concorData: ConcorInterface,
	id: string,
	refetch:()=>void,
}

function SezApproval({ concorData, id, refetch }:Props) {
	console.log('concorDAta-', concorData);

	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		remarks: null,
	});

	const { name, pincode, taxNumber, address, documentUrls } = concorData || {};

	// const { useOnAction:OnAction, loading } = useApproveConcor({
	// 	refetch,
	// 	setShowModal,
	// 	id,
	// 	bookingProof,
	// 	quotation,
	// 	sid,
	// 	totalBuyPrice,
	// });

	const concorDetails = [
		{ title: 'Name', value: <div>{name}</div> },
		{ title: 'Address', value: <div>{address}</div> },
		{ title: 'Pincode', value: <div>{pincode}</div> },
		{ title: 'Tax Number', value: <div>{taxNumber}</div> },
		{
			title : 'Documents',
			value : <div>
				{(documentUrls || []).map((item) => (
					<div>
						<a
							target="_blank"
							href={item}
							style={{ color: '#0000EE', textDecoration: 'underline' }}
							rel="noreferrer"
						>
							{item?.split('/')?.pop()}
						</a>
					</div>
				))}
			</div>,
		},
	];

	// const isDisabled = loading || !inputValues.remarks;

	useEffect(() => {
		if (!showModal) {
			setInputValues({
				utr           : null,
				paymentProof  : null,
				remarks       : null,
				bankAccountNo : null,
				bankId        : null,
				bankname      : null,
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
						{concorDetails.map((detail) => (
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
									onChange={(value: string) => setInputValues({ ...inputValues, remarks: value })}
									style={{ height: '100px', marginBottom: '12px' }}
								/>
							</div>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button}>
							<Button
								size="md"
								style={{ marginRight: '8px' }}
								// disabled={isDisabled}
								onClick={() => {
									// OnAction(inputValues);
								}}
							>
								Approve
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}
		</div>
	);
}
export default SezApproval;
