/* eslint-disable max-len */
import { Popover, Modal } from '@cogoport/components';
import { IcMArrowDown, IcMDocument } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function MailAttachments({ allAttachements, loading = false }) {
	const [showPreview, setShowPreview] = useState(false);
	const [showPopover, setShowPopover] = useState(false);
	// console.log('allAttachements:', allAttachements);
	const externalAttachements = allAttachements.filter((att) => !att.isInline);
	// console.log('externalAttachements:', externalAttachements);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{externalAttachements.map((item) => (
					<div className={styles.preview_wrapper} key={item.id}>
						<div
							role="presentation"
							className={styles.doc_content}
							onClick={() => setShowPreview(item)}
						>
							<IcMDocument />
							<div className={styles.name}>{item.name}</div>
						</div>
						<Popover
							theme="light"
							interactive
							visible={showPopover}
							content={(
								<div>
									<div
										role="presentation"
										className={styles.preview_container}
										onClick={() => {
											setShowPreview(item);
											setShowPopover(false);
										}}
									>
										Preview
									</div>
									<div
										role="presentation"
										className={styles.preview_container}
										// onClick={() => handleDownLoad(item)}
									>
										Download

									</div>
								</div>
							)}
							placement="bottom"
							animation="shift-away"
							onClickOutside={() => setShowPopover(false)}
						>
							<div
								role="presentation"
								className={styles.content}
								// className="icon"
								onClick={() => setShowPopover(true)}
							>
								<div>
									<IcMArrowDown />
								</div>
							</div>
						</Popover>
					</div>
				))}
			</div>
			{showPreview ? (
				<Modal
					show={showPreview}
					onClose={() => setShowPreview(null)}
					className="primary lg"
					onOuterClick={() => setShowPreview(null)}
					closable={false}
				>
					<Modal.Body>
						<object
							height="700px"
							width="800px"
							aria-label="Doc Preview"
							data={`data:${externalAttachements[0].contentType};base64,${externalAttachements[0].contentBytes}`}
						/>
					</Modal.Body>

				</Modal>
			) : null}
		</div>
	);
}

export default MailAttachments;
