/* eslint-disable max-len */
import { Modal } from '@cogoport/components';
import { useState } from 'react';

import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';
import UploadImageModal from '../../UploadImageModal';

import styles from './styles.module.css';

function VideoComponent(props) {
	const {
		pageConfiguration,
		setPageConfiguration,
		widget,
		rowData,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		modeType,
	} = props;

	const [showUploadModal, setShowUploadModal] = useState(false);

	const { component } = widget || {};

	const { content = '' } = component || {};

	const { handleUpdateContent } = useUpdateComponentsContent({
		pageConfiguration,
		setPageConfiguration,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		type: 'video',
		modeType,
	});

	return (
		<div>
			{content ? (
				<div
					role="presentation"
				>

					<iframe
						className={styles.video_frame}
						src={content}
						frameBorder="0"
						scrolling="no"
						allow="autoplay; gyroscope; picture-in-picture"
						allowFullScreen
						title="Preview"
					/>
				</div>
			) : (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div
						onClick={() => { if (modeType === 'edit') { setShowUploadModal(true); } }}
						role="presentation"
						className={styles.video_drop}
					>
						<img
							alt=""
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output%20(5).png"
							width="48px"
							height="48px"
						/>
						<div>Add your YouTube or video content</div>
					</div>
				</div>
			) }

			{showUploadModal && (
				<Modal
					size="md"
					placement="top"
					show={showUploadModal}
					onClose={() => setShowUploadModal(false)}
				>
					<UploadImageModal
						setShowUploadModal={setShowUploadModal}
						handleChange={handleUpdateContent}
						rowData={rowData}
						type="video"
						accept=".mp4"
					/>
				</Modal>
			)}
		</div>
	);
}

export default VideoComponent;
