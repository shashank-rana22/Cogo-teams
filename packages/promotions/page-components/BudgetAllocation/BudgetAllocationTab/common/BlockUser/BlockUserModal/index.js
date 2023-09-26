import { Modal, Button } from '@cogoport/components';

import useBlockUserBudgetAllocation from '../../../hooks/useBlockUserBudgetAllocation';

import styles from './styles.module.css';

function BlockUserModal({ block, setBlock, item, refetch }) {
	const onClose = () => {
		setBlock(false);
	};
	const { loading, blockUserBudget } = useBlockUserBudgetAllocation({
		setBlock,
		refetch,
	});
	return (
		<Modal
			show={block}
			position="primary sm"
			onOuterClick={onClose}
			onClose={onClose}
		>
			<div className={styles.styled_flex}>
				<div className={styles.styled_text}>
					Are you sure you want to
					<span style={{ fontWeight: '600' }}>
						{item?.status === 'active' ? <> BLOCK </> : <> UNBLOCK </>}
					</span>
					this agent?
				</div>
			</div>

			<div className={styles.button_flex}>
				<Button className="secondary sm" onClick={() => setBlock(false)}>
					No
				</Button>
				<Button
					onClick={() => blockUserBudget(item)}
					className="primary sm space-left"
					disabled={loading}
				>
					Yes
				</Button>
			</div>
		</Modal>
	);
}

export default BlockUserModal;
