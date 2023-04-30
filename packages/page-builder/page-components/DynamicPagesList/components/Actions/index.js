import { IcMTick, IcMCross } from '@cogoport/icons-react';

import useUpdateDynamicPage from '../../../../hooks/useUpdateDynamicPage';

import styles from './styles.module.css';

function ActionContent(props) {
	const { refetch, item } = props;

	const { onSubmit } = useUpdateDynamicPage();

	return (
		<div className={styles.action_container}>
			{item.status !== 'active' && (
				<div
					className={styles.workflow_cta}
					onClick={() => onSubmit('active', refetch, item)}
					role="presentation"
				>
					<div className={styles.cta_text}>
						<IcMTick width={20} height={20} style={{ marginRight: '6px' }} />
						Publish
					</div>
				</div>
			)}
			{item.status !== 'inactive' && (
				<div
					className={styles.workflow_cta}
					onClick={() => onSubmit('inactive', refetch, item)}
					role="presentation"
				>
					<div className={styles.cta_text}>
						<IcMCross width={16} height={16} style={{ marginRight: '10px' }} />
						Delete
					</div>
				</div>
			)}
		</div>
	);
}

export default ActionContent;
