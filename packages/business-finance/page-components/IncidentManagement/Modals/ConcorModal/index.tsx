import { Input, Textarea, Modal, Button } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { useEffect, useState } from 'react';

import useApproveConcor from '../../apisModal/useApproveConcor';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

interface ObjectInterface {
	bankAccountNo:string | number,
	bankId: string,
	bankname: string
}

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

function ConcorModal({ concorData, id, refetch }:Props) {
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		utr           : null,
		paymentProof  : null,
		remarks       : null,
		bankAccountNo : null,
		bankId        : null,
		bankname      : null,
	});

	const { bookingProof = [], quotation = [], sid = '', totalBuyPrice } = concorData || {};

	const { useOnAction:OnAction, loading } = useApproveConcor({
		refetch,
		setShowModal,
		id,
		bookingProof,
		quotation,
		sid,
		totalBuyPrice,
	});

	const concorDetails = [
		{ title: 'Organization Name', value: <div>CONCOR</div> },
		{ title: 'SID', value: <div>{sid}</div> },
		{ title: 'Total Buy Price', value: <div>{totalBuyPrice}</div> },
		{
			title: 'Booking Proof (Indent)',
			value:
	<div>
		{bookingProof.map((url, index) => (
			<div key={url}>
				<a className={styles.link} href={url} target="_blank" rel="noreferrer">{url}</a>
				{index !== bookingProof.length - 1 ? ('     ,') : null}
			</div>
		))}
	</div>,
		},
		{
			title: 'Quotation',
			value:
	<div>
		{quotation.map((url, index) => (
			<div key={url}>
				<a className={styles.link} href={url} target="_blank" rel="noreferrer">{url}</a>
				{index !== quotation.length - 1 ? ('     ,') : null}
			</div>
		))}
	</div>,
		},
	];

	const handleUpload = (val:string) => {
		if (val) {
			setInputValues({ ...inputValues, paymentProof: val });
		}
	};

	const isDisabled = loading || !inputValues.paymentProof
	|| !inputValues.remarks || !inputValues.utr || !inputValues.bankname;

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
					<Modal.Header title="Concor PDA Approval" />
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
							<div className={styles.section}>
								<div className={styles.input_titles}>Bank*</div>
								<span className={styles.divider}>:</span>
								<AsyncSelect
									name="bank"
									asyncKey="allot_bank"
									valueKey="bankname"
									labelKey="bankname"
									value={inputValues.bankname}
									initialCall={false}
									placeholder="Select Bank"
									microService="business_finance"
									onChange={(value:string, obj:ObjectInterface) => setInputValues({
										...inputValues,
										bankAccountNo : obj?.bankAccountNo,
										bankId        : obj?.bankId,
										bankname      : obj?.bankname,
									})}
								/>
							</div>

							<div className={styles.section}>
								<div className={styles.input_titles}>UTR*</div>
								<span className={styles.divider}>:</span>
								<Input
									name="utr"
									size="xs"
									placeholder="Enter UTR"
									onChange={(value: string) => setInputValues({ ...inputValues, utr: value })}
									style={{ width: '30%', height: '36px' }}
								/>
							</div>

							<div className={styles.section}>
								<div className={styles.input_titles}>Payment Proof*</div>
								<span className={styles.divider}>:</span>
								<FileUploader
									value={inputValues.paymentProof}
									onChange={(e:string) => handleUpload(e)}
									showProgress
									draggable
								/>
							</div>

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
								disabled={isDisabled}
								onClick={() => {
									OnAction(inputValues);
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
export default ConcorModal;
