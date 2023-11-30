import { Button, Modal } from '@cogoport/components';

import Body from '../../../common/ViewModal/Body';
import Header from '../../../common/ViewModal/Header';

import getComponentMapping from './MAPPING';

function PdaApproval({
	itemData = {},
	setRemarks = () => {},
	remarks = '',
	onSave = () => {},
	showModal = false,
	setShowModal = () => {},
	loadingOnSave = false,
}) {
	const onClose = () => setShowModal(false);

	const { beneficiaryName = '', documentUrls = [] } = itemData?.data?.concorPdaApprovalRequest || {};

	const MAPPING = getComponentMapping({ data: itemData?.data?.concorPdaApprovalRequest });

	return (
		<>
			<Button size="md" themeType="secondary" onClick={() => setShowModal(true)}>
				View
			</Button>

			{showModal ? (
				<Modal show={showModal} onClose={onClose}>

					<Modal.Header title={(
						<Header
							title="PDA APPROVAL"
							subTitle={beneficiaryName}
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
export default PdaApproval;
