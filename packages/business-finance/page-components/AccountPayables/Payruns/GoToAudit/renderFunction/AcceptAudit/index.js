import Button from '@cogoport/components';

import styles from './styles.module.css';

function AcceptAudit({ item = {}, remarks = [], updateLoading = false, onClick = () => {} }) {
	if (['APPROVED', 'REJECTED'].includes(item?.status)) { return <div>{item?.status}</div>; }

	return (
		<div className={styles.button_container}>
			<div>
				<Button
					themeType="secondary"
					onClick={() => onClick('APPROVED', remarks?.[item?.id], item?.id)}
					disabled={updateLoading}
				>
					Accept
				</Button>

			</div>
			<div className={styles.accept_button}>
				<Button
					disabled={!remarks[item?.id] || updateLoading}
					onClick={() => onClick('REJECTED', remarks?.[item?.id], item?.id)}
				>
					Reject
				</Button>
			</div>
		</div>
	);
}

export default AcceptAudit;
