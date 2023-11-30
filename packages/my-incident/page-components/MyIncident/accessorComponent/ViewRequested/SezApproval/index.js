import { Button, Modal } from '@cogoport/components';

import Body from '../../../common/ViewModal/Body';
import Header from '../../../common/ViewModal/Header';

import getComponentMapping from './MAPPING';

function SezApproval({
	itemData = {},
	setRemarks = () => {},
	remarks = '',
	onSave = () => {},
	showModal = false,
	setShowModal = () => {},
	loadingOnSave = false,
}) {
	const onClose = () => setShowModal(false);

	const { documentUrls = [] } = itemData?.data?.sezRequest || {};
	const { tradePartyName = '' } = itemData?.data?.organization || {};

	const MAPPING = getComponentMapping({ data: itemData?.data });

	return (
		<>
			<Button size="md" themeType="secondary" onClick={() => setShowModal(true)}>
				View
			</Button>

			{showModal ? (
				<Modal show={showModal} onClose={onClose}>

					<Modal.Header title={(
						<Header
							title="SEZ APPROVAL"
							subTitle={tradePartyName}
						/>
					)}
					/>

					<Modal.Body>
						<Body
							MAPPING={MAPPING}
							documentUrl={documentUrls}
							setRemarks={setRemarks}
							userNotes={itemData?.userNotes}
						/>
					</Modal.Body>

					<Modal.Footer>
						<Button disabled={!remarks || loadingOnSave} onClick={onSave}>
							Save
						</Button>
					</Modal.Footer>

				</Modal>
			) : null}

		</>

	);
}
export default SezApproval;
