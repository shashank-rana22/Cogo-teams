import { Textarea, Modal, Button } from '@cogoport/components';
import { useEffect, useState } from 'react';

import useApproveConcor from '../../apisModal/useApproveConcor';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import { getBankDetails, getInvoiceDetails, getOrganisationDetails } from './getDetails';
import styles from './styles.module.css';

interface ConcorInterface {
	bookingProof: string[],
	quotation: string[],
	sid: string,
	totalBuyPrice: number | string,
	supplierName: string;
	entity: string;
	placeOfSupply: string;
	placeOfDestination: string;
	documentDate: string;
	dueDate : string;
	isTaxApplicable: boolean;
}
const defaultConcorData: ConcorInterface = {
	bookingProof       : [],
	quotation          : [],
	sid                : '',
	totalBuyPrice      : 0,
	supplierName       : '',
	entity             : '',
	placeOfSupply      : '',
	placeOfDestination : '',
	documentDate       : '',
	dueDate            : '',
	isTaxApplicable    : false,
};

interface Props {
	concorData: ConcorInterface,
	id: string,
	refetch:()=>void,
	referenceId: string;
	isEditable: boolean;
	remark: string;
	row: {};
}

function ConcorModal({
	concorData = defaultConcorData,
	id = '',
	refetch = () => {},
	referenceId = '',
	isEditable = true,
	remark = '',
	row = {},
}: Props) {
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({ remarks: null });

	const { useOnAction: onAction, loading } = useApproveConcor({
		refetch,
		setShowModal,
		id,
		concorData,
	});

	const invoiceDetailsMapping = getInvoiceDetails({ concorData, referenceId });
	const concorDetails = getOrganisationDetails(concorData);
	const bankData = getBankDetails(concorData);
	const isDisabled = loading || !inputValues.remarks;

	useEffect(() => {
		if (!showModal) {
			setInputValues({ remarks: null });
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
					<Modal.Header title={`Concor PDA Approval : ${referenceId}`} />
					<Modal.Body>
						{!isEditable ? <ApproveAndReject row={row} /> : null}
						<div className={styles.bank}>
							{concorDetails.map((detail) => (
								<div key={detail.title} className={styles.flex}>
									<div className={styles.title}>
										{detail.title}
									</div>
									<div className={styles.divider}>
										:
									</div>
									<div className={styles.name}>
										<div>{detail.value || '-'}</div>
									</div>
								</div>
							))	}
						</div>
						<div className={styles.hr} />
						<div>
							<div className={styles.flex}>
								<div className={styles.name}>
									Invoice Details
								</div>
								<div className={styles.tag}>
									Type: Advance
								</div>
							</div>
							<div className={styles.bank}>
								{(invoiceDetailsMapping || []).map((item) => (
									<div key={item.title} className={styles.flex}>
										<div className={styles.title}>
											{item.title}
										</div>
										<div className={styles.divider}>
											:
										</div>
										<div className={styles.name}>
											<div>{item.value || '-'}</div>
										</div>
									</div>

								))}

								<div className={styles.hr} />

								{(bankData || []).map((item) => (
									<div key={item.title} className={styles.flex}>
										<div className={styles.title}>
											{item.title}
										</div>
										<div className={styles.divider}>
											:
										</div>
										<div className={styles.name}>
											<div>{item.value || '-'}</div>
										</div>
									</div>
								))}
							</div>

							<div style={{ display: 'flex' }}>
								<div className={styles.input_titles}>Remarks*</div>
								<span className={styles.divider}>:</span>
								<Textarea
									name="remark"
									size="sm"
									defaultValue={remark}
									disabled={!isEditable}
									placeholder="Enter Remarks Here..."
									onChange={(value: string) => setInputValues({ ...inputValues, remarks: value })}
									style={{ height: '100px', marginBottom: '12px', marginRight: '12px' }}
								/>
							</div>
						</div>

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										onAction(inputValues, 'REJECTED');
									}}
								>
									Reject
								</Button>
								<Button
									size="md"
									disabled={isDisabled}
									onClick={() => {
										onAction(inputValues, 'APPROVED');
									}}
								>
									Approve
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default ConcorModal;
