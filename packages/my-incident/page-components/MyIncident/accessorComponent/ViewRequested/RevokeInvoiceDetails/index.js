import { Button, Textarea, Modal } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import getComponentMapping from './MAPPING';
import styles from './styles.module.css';

function Header({ title = '', subTitle = '' }) {
	return (
		<>
			<h4>{title}</h4>
			<div className={styles.sub_title}>{subTitle}</div>
		</>
	);
}

function RevokeInvoiceDetails({
	itemData = {},
	setRemarks = () => {},
	remarks = '',
	onSave = () => {},
	showModal = false,
	setShowModal = () => {},
	loadingOnSave = false,
}) {
	const onClose = () => setShowModal(false);

	const { invoiceNumber = '', documentUrls = [] } = itemData?.data?.revokeInvoiceRequest || {};

	const MAPPING = getComponentMapping({ data: itemData?.data?.revokeInvoiceRequest });

	return (
		<>
			<Button size="md" themeType="secondary" onClick={() => setShowModal(true)}>
				View
			</Button>

			{showModal ? (
				<Modal show={showModal} onClose={onClose}>

					<Modal.Header title={(
						<Header
							title="REVOKE INVOICE"
							subTitle={invoiceNumber}
						/>
					)}
					/>

					<Modal.Body>
						{MAPPING?.map((section) => {
							const { label = '', key = '', subItems = [] } = section || {};
							return (
								<>
									<h4 key={key}>{label}</h4>
									<div className={styles.sub_items_container}>
										{subItems.map((subSection) => {
											const { subLabel = '', value = '', subKey = '' } = subSection || {};
											return (
												<div className={styles.sub_item} key={subKey}>
													<h6>{subLabel}</h6>
													<p className={styles.sub_value}>{value}</p>
												</div>
											);
										})}
									</div>
								</>
							);
						})}

						{!isEmpty(documentUrls) ? (
							<div className={styles.document_container}>

								<h4> Documents : </h4>

								{(documentUrls || []).map((url) => (
									<a key={url} href={url} target="_blank" rel="noreferrer">
										View Document
										<IcMEyeopen className={styles.icon} />
									</a>
								))}

							</div>
						) : null}

						<div className={styles.remarks_style}>
							<h4> Notes (only visible to self) </h4>

							<Textarea
								name="remarks"
								className={styles.text_area}
								size="lg"
								placeholder="Enter here..."
								onChange={setRemarks}
								defaultValue={itemData?.userNotes}
							/>
						</div>
					</Modal.Body>

					<Modal.Footer>
						<Button disabled={!remarks || loadingOnSave} onClick={onSave}>
							Save
						</Button>
					</Modal.Footer>

				</Modal>
			) : null}

		</>

	);
}
export default RevokeInvoiceDetails;
