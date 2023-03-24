import { Popover } from '@cogoport/components';
import { IcMDocument, IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function AttachementsUrl({ externalAttachements }) {
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
						<div className={styles.row} tabIndex={0} role="button" onClick={() => setPreview(item)}>
							<IcMDocument />
							<div className={styles.item_name}>{item.name}</div>
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
										onClick={() => {
											setShowPopover(false);
										}}
									>
										Preview
									</div>
									<div
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
							<div className={styles.row} role="button" tabIndex={0} onClick={() => setShowPopover(true)}>
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

export default AttachementsUrl;
