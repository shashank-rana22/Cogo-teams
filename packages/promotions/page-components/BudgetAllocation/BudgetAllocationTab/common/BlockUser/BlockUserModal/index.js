import { Modal, Button } from '@cogoport/components';

import useBlockUserBudgetAllocation from '../../../hooks/useBlockUserBudgetAllocation';

import styles from './styles.module.css';

function BlockUserModal({ block = false, setBlock = () => {}, item = {}, refetch = () => {} }) {
	const onClose = () => {
		setBlock(false);
	};
	const blockAndRefetch = () => {
		setBlock(false);
		refetch();
	};
	const { loading = true, blockUserBudget = () => {} } = useBlockUserBudgetAllocation({ refetch: blockAndRefetch });
	return (
		block
			? (
				<Modal
					show
					position="primary sm"
					onOuterClick={onClose}
					onClose={onClose}
					showCloseIcon
					placement="top"
				>
					<Modal.Header
						title={`Are you sure you want to
			 ${item?.status === 'active' ? 'BLOCK' : 'UNBLOCK'} this agent?`}
					/>
					<Modal.Footer>
						<div className={styles.button_flex}>
							<Button className="secondary sm" onClick={() => setBlock(false)}>
								No
							</Button>
							<Button
								onClick={() => blockUserBudget(item)}
								className={`primary sm ${styles.space_left}`}
								disabled={loading}
							>
								Yes
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)
			: null
	);
}

export default BlockUserModal;
