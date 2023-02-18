import useListUserVoiceCalls from '../../../../hooks/useListUserVoiceCalls';

import Header from './Header';
import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';

function VoiceCall({ activeVoiceCard = {} }) {
	const { user_id = null, user_number = '' } = activeVoiceCard || {};
	console.log('user_id', user_id);
	console.log('user_number', user_number);

	const {
		loading,
		listData :{ list = [] },

		handleScroll,
	} = useListUserVoiceCalls({
		user_id     : user_id || undefined,
		user_number : !user_id ? user_number : undefined,
	});
	console.log('list', list);
	const loader = (
		<div className={styles.loader}>
			<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spinner.svg" alt="load" />
		</div>
	);
	return (
		<>
			<div className={styles.container}>
				<Header activeVoiceCard={activeVoiceCard} />
			</div>
			{loading && loader}
			<div className={styles.message_container} onScroll={(e) => handleScroll(e.target.scrollTop)}>
				{([...list] || []).reverse().map((eachList) => (eachList?.call_type === 'incoming'
					? <ReceiveDiv eachList={eachList} />
					: <SentDiv eachList={eachList} />))}
			</div>
		</>
	);
}

export default VoiceCall;
