import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function UserActions({ confirmModalState, checkedRowsId, onClick = () => {} }) {
	const requestType = confirmModalState.type;

	const DISPLAY_TEXT_MAPPING = {
		approve: {
			title     : `${startCase(requestType)} allocation request`,
			body_text : `${startCase(requestType)} this Request`,
		},
		reject: {
			title     : `${startCase(requestType)} allocation request`,
			body_text : `${startCase(requestType)} this Request`,
		},
		delete: {
			title     : `${startCase(requestType)} allocation relation`,
			body_text : `${startCase(requestType)} this Allocation Relation`,
		},
		approve_all: {
			title     : `Bulk approve ${(checkedRowsId || []).length}  Requests`,
			body_text : `Approve ${(checkedRowsId || []).length}  Requests ?`,
		},

	};

	return (
		<>
			<Modal.Header title={`${DISPLAY_TEXT_MAPPING[requestType].title}`} />
			<Modal.Body>
				Are you sure you want to
				{' '}
				{DISPLAY_TEXT_MAPPING[requestType].body_text}
				?
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						type="button"
						size="md"
						themeType="secondary"
						style={{ marginRight: '10px' }}
						onClick={onClick}
					>
						CANCEL
					</Button>
					<Button type="submit" size="md" themeType="primary">
						{startCase(requestType)}
					</Button>
				</div>
			</Modal.Footer>
		</>

	);
}

export default UserActions;
