import { Modal, ButtonIcon, Input } from '@cogoport/components';
import { IcMExpand, IcMMinus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const iconsMapping = {
	sm         : IcMExpand,
	fullscreen : IcMMinus,
};

const fields = {
	content     : 'Text',
	redirectUrl : 'URL',
};

function ButtonEditorModal({
	editorModal,
	setEditorModal,
	handleUpdateContent,
	rowData,
}) {
	const Icon = iconsMapping[editorModal.size];
	return (

		<Modal
			size={editorModal.size}
			placement={editorModal.placement}
			show={editorModal.show}
			onClose={() => setEditorModal((prev) => ({
				...prev,
				show      : false,
				placement : 'bottom-right',
				size      : 'sm',
			}))}
		>

			<Modal.Header title={(
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>Button Editor</div>
					<ButtonIcon
						onClick={() => setEditorModal((prev) => ({
							...prev,
							size: editorModal.size === 'sm' ? 'fullscreen' : 'sm',
						}))}
						style={{ marginRight: '12px' }}
						size="md"
						icon={<Icon />}
						themeType="primary"
					/>
				</div>
			)}
			/>

			<Modal.Body>
				<div>
					{Object.keys(fields).map((key) => (

						<div className={styles.input_field}>
							<div className={styles.label}>{startCase(fields[key])}</div>

							<Input
								placeholder={`Type ${fields[key]}`}
								onChange={(val) => handleUpdateContent(val, rowData, key)}
							/>
						</div>

					))}

				</div>

			</Modal.Body>
			<Modal.Footer />

		</Modal>
	);
}

export default ButtonEditorModal;
