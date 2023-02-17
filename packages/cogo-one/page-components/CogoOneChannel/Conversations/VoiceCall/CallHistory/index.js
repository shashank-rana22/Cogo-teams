import styles from './styles.module.css';

function CallHistory({ type = 'user' }) {
	const ICON_MAPPING = {
		user: {

			start      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disabled call.svg',
			end        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/call.svg',
			compStyles : { borderTopLeftRadius: '0px', background: '#FFFFFF' },
		},
		agent: {
			start : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/call hangup.svg',
			end   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/omni_channel.svg',

			compStyles: { borderTopRightRadius: '0px', background: '#FFFCE6' },
		},
	};
	const { start = '', end = '', compStyles = {} } = ICON_MAPPING[type] || {};
	return (
		<div>
			<div className={styles.flex} style={compStyles}>
				<img src={start} alt="logo" />
				<div className={styles.padding}>
					<div>
						Audio call started
					</div>
					<div>
						11:19
					</div>
				</div>
			</div>
			<div className={styles.flex} style={compStyles}>
				<img src={end} alt="logo" />
				<div className={styles.padding}>
					<div>
						Audio call ended
					</div>
					<div>
						11:19
					</div>
				</div>
			</div>
		</div>
	);
}
export default CallHistory;
