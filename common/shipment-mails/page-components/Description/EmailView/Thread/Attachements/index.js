import { Popover } from '@cogoport/components';
import { IcMDocument, IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Attachements({ externalAttachements }) {
	const [showPopover, setShowPopover] = useState(false);
	function base64ToArrayBuffer(base64) {
		const binaryString = window.atob(base64);
		const binaryLen = binaryString.length;
		const bytes = new Uint8Array(binaryLen);
		for (let i = 0; i < binaryLen;) {
			const ascii = binaryString.charCodeAt(i);
			bytes[i] = ascii;
			i += 1;
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
		const sampleArr = base64ToArrayBuffer(data.contentBytes);
		saveByteArray(data, sampleArr);
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{externalAttachements.map((item) => (
					<div className={styles.item} key={item.id}>
						<div className={styles.row} role="button" tabIndex={0} onClick={() => setPreview(item)}>
							<IcMDocument />
							<span className={styles.item_name}>{item.name}</span>
						</div>
						<Popover
							theme="light"
							interactive
							visible={showPopover}
							content={(
								<div>
									<div
										role="button"
										tabIndex={0}
										className={styles.action}
										onClick={() => {
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
								className={styles.row}
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

		</div>
	);
}

export default Attachements;
