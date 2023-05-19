import { Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';
import DragPreview from '../../DragPreview';

import ButtonEditorModal from './ButtonEditorModal';
import styles from './styles.module.css';

function ButtonComponent(props) {
	const {
		widget,
		rowData,
		modeType,
		pageConfiguration,
		setPageConfiguration,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
	} = props;

	const [editorModal, setEditorModal] = useState({
		show      : false,
		placement : 'bottom-right',
		size      : 'sm',
	});

	const {
		type,
		component,
	} = widget || {};

	const {
		content = 'Click Here',
		themeType = 'primary',
		size = 'md',
		redirectUrl,
	} = component;

	const { handleUpdateContent } = useUpdateComponentsContent({
		pageConfiguration,
		setPageConfiguration,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		type: 'button',
		modeType,
	});

	const { isDraggingPreview } = component;

	if (isDraggingPreview) {
		return (
			<DragPreview showBackDrop={false} type="button" />
		);
	}

	const handleClick = () => {
		window.open(redirectUrl, '_blank');
	};

	return (
		<div className={styles.button_wrapper} contentEditable>
			<Button
				style={rowData.component.buttonStyle}
				type={type}
				themeType={themeType}
				size={size}
				onClick={modeType === 'edit' ? () => setEditorModal((prev) => ({
					...prev,
					show: true,
				})) : () => handleClick()}
				contentEditable
			>
				{content}
			</Button>

			<ButtonEditorModal
				handleUpdateContent={handleUpdateContent}
				setEditorModal={setEditorModal}
				rowData={rowData}
				editorModal={editorModal}
			/>

		</div>
	);
}

export default ButtonComponent;
