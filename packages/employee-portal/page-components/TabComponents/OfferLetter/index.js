import { Button, Modal } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import PreviewDocumet from '../../../commons/PreviewDocument';
import useGetDocumentSigningUrl from '../../../hooks/useGetDocumentSigningUrl';

import styles from './styles.module.css';
import useUpdateOfferLetter from './useUpdateOfferLetter';

function OfferLetter({ setInformationPage, data, getEmployeeDetails, getEmployeeDetailsLoading }) {
	const { id, document_url, status, signed_document_url: detail_signed_document_url } = data?.offer_letter || {};

	const { updateData } = useUpdateOfferLetter({ document_url, id, getEmployeeDetails, setInformationPage });

	const [showModal, setShowModal] = useState(false);

	const { onClickSignDocument, data: docData, loading } = useGetDocumentSigningUrl(
		{ getEmployeeDetails, document_type: 'offer_letter' },
	);

	const { signed_document_url } = docData || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>OFFER LETTER</div>
			</div>

			{status === 'approved' ? (
				<div className={styles.button_container}>
					<div style={{ paddingRight: 10 }}>
						<Button
							themeType="secondary"
							size="md"
							onClick={() => setShowModal(true)}
							loading={getEmployeeDetailsLoading || loading}
						>
							Reject
						</Button>
					</div>

					<Button
						themeType="primary"
						size="md"
						onClick={() => onClickSignDocument(id)}
						loading={getEmployeeDetailsLoading || loading}
					>
						Accept
					</Button>
				</div>
			) : null}

			<Modal
				size="sm"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
				showCloseIcon={false}
			>
				<Modal.Header title="Are you sure you want to reject this Offer Letter?" />

				<Modal.Body>
					<div className={styles.btn_container}>
						<Button
							type="button"
							themeType="secondary"
							onClick={() => setShowModal(false)}
							className={styles.btn_container}
						>
							Cancel
						</Button>

						<Button
							type="button"
							style={{ marginLeft: '8px' }}
							onClick={() => {
								updateData({ status: 'rejected_by_user' });
								setShowModal(false);
							}}
						>
							Reject
						</Button>
					</div>
				</Modal.Body>
			</Modal>

			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<PreviewDocumet
					height="700px"
					width="800px"
					document_url={detail_signed_document_url || signed_document_url || document_url}
				/>
			</div>
		</div>
	);
}

export default OfferLetter;
