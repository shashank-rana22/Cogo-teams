import { Modal, Button } from '@cogoport/components';

import CreateUser from './components/Customize/components/CreateUser';
import styles from './styles.module.css';
import useHandleQuotationModal from './useHandleQuotationModal';

function QuotationModal({
	modalSize = '',
	setShowShareQuotationModal = () => {},
	showShareQuotationModal = false,
	detail = {},
	checkout_type = '',
	...restProps
}) {
	const {
		activeState,
		org_id,
		triggerListOrgUsers,
		MAPPING,
		handleEmailSend,
	} = useHandleQuotationModal({
		...restProps,
		setShowShareQuotationModal,
		detail,
		checkout_type,
	});

	const {
		component: ActiveComponent,
		buttons: activeButtons,
		compoenntProps: activeComponentProps,
	} = MAPPING[activeState];

	return (
		<Modal
			show={showShareQuotationModal}
			onClose={() => setShowShareQuotationModal(false)}
			placement="top"
			size={modalSize}
		>
			{activeState === 'select_recipient' ? (
				<Modal.Header
					className={styles.modal_container}
					title={(
						<div className={styles.flex}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div className={styles.heading}>Add Recipeints</div>

								<CreateUser
									organization_id={org_id}
									onCreate={triggerListOrgUsers}
									branch_id={detail.importer_exporter_branch_id}
								/>
							</div>

							<Button
								type="button"
								themeType="accent"
								onClick={() => handleEmailSend()}
							>
								Save
							</Button>
						</div>
					)}
				/>
			) : null}

			<ActiveComponent {...activeComponentProps} />

			<Modal.Footer>
				<div className={styles.button_container}>
					{activeButtons.map((item) => {
						const { key, label, ...buttonProps } = item;

						return (
							<Button key={key} type="button" {...buttonProps}>
								{label}
							</Button>
						);
					})}
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default QuotationModal;
