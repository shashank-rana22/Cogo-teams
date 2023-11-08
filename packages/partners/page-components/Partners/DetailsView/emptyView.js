import styles from './styles.module.css';

function EmptyView() {
	return (
		<div style={{ padding: '0px 20px 0px 20px' }}>
			<div className={styles.help}>
				Click on a card to see the full details and then update details.
			</div>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/bg.svg"
				alt="background"
				style={{
					width    : '100%',
					height   : 'auto',
					maxWidth : '222px',
					margin   : '45px auto 0',
					display  : 'block',
				}}
			/>
		</div>
	);
}
export default EmptyView;
