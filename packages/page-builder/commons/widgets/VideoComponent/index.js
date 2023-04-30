import { IcMVideoCall } from '@cogoport/icons-react';

import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';
import FileUploader from '../FileUploader';

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
	} = props;

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
				<FileUploader
					value={content}
					onChange={(val) => handleUpdateContent(val, rowData)}
					uploadDesc="Upload"
					uploadIcon={<IcMVideoCall width="60px" height="60px" />}

				/>
			) }
		</div>
	);
}

export default VideoComponent;
