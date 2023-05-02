import { Modal, Popover, cl } from '@cogoport/components';
import { IcMDocument, IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function AttachementsUrl({ externalAttachements }) {
	const [showPreview, setShowPreview] = useState(null);
	const [showPopover, setShowPopover] = useState(false);
	const attachements = (externalAttachements || []).map((attachment) => {
		const parts = attachment.split('/');
		const file_name = parts[parts.length - 1];
		return {
			name : file_name,
			id   : attachment,
			url  : attachment,
		};
	});

	const handleDownLoad = (data) => {
		window.open(data?.url, '_blank');
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{attachements.map((item) => (
					<div className={styles.item} key={item.id}>
						<div
							className={cl`${styles.row} ${styles.doc}`}
							role="button"
							tabIndex={0}
							onClick={() => setShowPreview(item)}
						>
							<IcMDocument style={{ width: '1.5em', height: '1.5em' }} />
							<div
								className={cl`${styles.item_name} ${styles.name}`}
							>
								{item.name}

							</div>
						</div>
						<Popover
							theme="light"
							interactive
							visible={showPopover}
							content={(
								<div>
									<div
										className={styles.action}
										role="button"
										tabIndex={0}
										onClick={() => {
											setShowPreview(item);
											setShowPopover(false);
										}}
									>
										Preview
									</div>
									<div
										className={styles.action}
										role="button"
										tabIndex={0}
										onClick={() => handleDownLoad(item)}
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
								className={cl`${styles.row} ${styles.icon}`}
								role="button"
								tabIndex={0}
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
					size="lg"
					placement="top"
					show={showPreview}
					closeOnOuterClick={false}
					onClose={() => setShowPreview(null)}
				>
					<Modal.Body>
						<object
							height="700px"
							width="800px"
							aria-label="Doc Preview"
							data={showPreview.url}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</div>
	);
}

export default AttachementsUrl;
