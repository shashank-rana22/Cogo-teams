import { Tooltip } from '@cogoport/components';
import { IcMAppDocumentUpload, IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const INFO_ICON_DIM = 16;
const UPLOAD_ICON_DIM = 24;
const TOOLTIP_WIDTH = 1000;

function List({ item = {} }) {
	return (
		<div className={styles.container}>
			<IcMAppDocumentUpload height={UPLOAD_ICON_DIM} weight={UPLOAD_ICON_DIM} />

			<div className={styles.doc_name_div}>
				<div className={styles.doc_label}>Document Name</div>

				<div className={styles.doc_name_info}>
					<div className={styles.doc_name}>
						{item?.docName || item?.file_name}
					</div>

					{item?.docExpNotes || item?.data?.doc_description ? (
						<Tooltip
							theme="light"
							placement="bottom"
							interactive
							maxWidth={TOOLTIP_WIDTH}
							content={(
								<div className={styles.tooltip_content}>
									{item?.docExpNotes || item?.data?.doc_description}
								</div>
							)}
						>
							<IcMInfo height={INFO_ICON_DIM} width={INFO_ICON_DIM} className={styles.info_icon} />
						</Tooltip>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default List;
