import { Modal, Popover, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument, IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const NUMRICAL_ONE = 1;

function Attachements({ externalAttachements = [] }) {
	const [showPreview, setShowPreview] = useState(null);
	const [showPopover, setShowPopover] = useState(false);
	function baseToArrayBuffer(base64) {
		const binaryString = window.atob(base64);
		const binaryLen = binaryString.length;
		const bytes = new Uint8Array(binaryLen);
		for (let i = 0; i < binaryLen;) {
			const ascii = binaryString.charCodeAt(i);
			bytes[i] = ascii;
			i += NUMRICAL_ONE;
		}
		return bytes;
	}

	function saveByteArray(data, byte) {
		const blob = new Blob([byte], { type: data.contentType });
		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		const fileName = data?.name;
		link.download = fileName;
		link.click();
	}

	const handleDownLoad = (data) => {
		const sampleArr = baseToArrayBuffer(data.contentBytes);
		saveByteArray(data, sampleArr);
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{externalAttachements.map((item) => (
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
					size="xl"
					placement="top"
					show={showPreview}
					closeOnOuterClick
					onClose={() => setShowPreview(null)}
				>
					<Modal.Body>
						<object
							height="700px"
							width="1090px"
							aria-label="Doc Preview"
							data={`data:${externalAttachements[GLOBAL_CONSTANTS.zeroth_index].contentType};base64,
						${externalAttachements[GLOBAL_CONSTANTS.zeroth_index].contentBytes}`}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</div>
	);
}

export default Attachements;
