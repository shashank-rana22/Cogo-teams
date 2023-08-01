import { Modal, Button } from '@cogoport/components';
import { isEmpty, upperCase } from '@cogoport/utils';

import useUpdateCheckoutIncoTerm from '../hooks/useUpdateCheckoutIncoTerm';

function ChangeIncoTermModal({
	incoTermModalData = {},
	setIncoTermModalData = () => {},
	searchLoading = false,
	getCheckout = () => {},
	incoterm = '',
	checkout_id = '',
}) {
	const { updateCheckoutIncoTerm, loading } = useUpdateCheckoutIncoTerm({
		getCheckout,
		setIncoTermModalData,
		checkout_id,
	});

	return (
		<Modal
			show={!isEmpty(incoTermModalData)}
			onClose={() => {
				setIncoTermModalData({});
			}}
		>
			<Modal.Header title="Add Line Item" />

			<Modal.Body>
				<div>
					You have changed the Incoterm from
					{' '}
					<b>{upperCase(incoterm)}</b>
					{' '}
					to
					{' '}
					<b>{upperCase(incoTermModalData?.selectedValue)}</b>
					. As a result, we will remove services( if any) that are not applicable fot this incoterm.
					If you want to keep the same services, please leave the Incoterm unchanged
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					disabled={loading || searchLoading}
					onClick={() => setIncoTermModalData({})}
					style={{ marginRight: '12px' }}
					themeType="secondary"
				>
					Cancel
				</Button>

				<Button
					type="button"
					loading={loading || searchLoading}
					onClick={() => updateCheckoutIncoTerm({
						inco_term: incoTermModalData?.selectedValue,
					})}
					themeType="accent"
				>
					{loading || searchLoading ? 'Changing...' : 'Change'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeIncoTermModal;
