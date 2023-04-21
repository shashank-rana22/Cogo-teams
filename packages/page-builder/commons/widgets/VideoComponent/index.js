import { IcMVideoCall } from '@cogoport/icons-react';

import FileUploader from '../FileUploader';

import styles from './styles.module.css';

function VideoComponent(props) {
	const { components, setComponents, childId, selectedRow, widget } = props;

	const { content = '' } = widget || {};

	const handleFileChange = (val) => {
		if (val) {
			const { parentId, id } = selectedRow || {};
			const data = components;
			const selectedComponentIndex = (data.layouts || []).findIndex((component) => (component.id === id));

			if (parentId) {
				data.layouts[selectedComponentIndex].children[childId].content = val;
			} else {
				data.layouts[selectedComponentIndex].content = val;
			}

			setComponents((prev) => ({ ...prev, layouts: data.layouts }));
		}
	};

	return (
		<div>
			{content ? (
				<div
					role="presentation"
				>
					<iframe
						className={styles.video_frame}
						scrolling="no"
						frameBorder="0"
						title="Preview"
						src={content}
						alt="upload-img"
					/>
				</div>
			) : (
				<FileUploader
					value={content}
					onChange={(val) => handleFileChange(val)}
					uploadDesc="Upload"
					uploadIcon={<IcMVideoCall width="60px" height="60px" />}

				/>
			) }
		</div>
	);
}

export default VideoComponent;
