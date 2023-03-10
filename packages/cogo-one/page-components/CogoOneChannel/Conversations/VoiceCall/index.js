import { useRef, useEffect } from 'react';

import useListUserVoiceCalls from '../../../../hooks/useListUserVoiceCalls';

import Header from './Header';
import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';

function VoiceCall({ activeVoiceCard = {} }) {
	const { user_id = null, user_number = '' } = activeVoiceCard || {};
	const messageRef = useRef(null);
	const scrollBottom = () => {
		setTimeout(() => {
			messageRef?.current?.scrollTo({
				top      : (messageRef?.current.scrollHeight || 0) + 10,
				behavior : 'smooth',
			});
		}, 300);
	};
	const {
		loading,
		listData: { list = [] },
		handleScroll,
	} = useListUserVoiceCalls({
		user_id     : user_id || undefined,
		user_number : !user_id ? user_number : undefined,
	});
	useEffect(() => {
		if (!loading) {
			scrollBottom();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageRef, JSON.stringify(activeVoiceCard), loading]);
	const loader = (
		<div className={styles.loader}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spinner.svg"
				alt="load"

			/>
		</div>
	);
	return (
		<>
			<div className={styles.container}>
				<Header activeVoiceCard={activeVoiceCard} />
			</div>

			<div
				className={styles.message_container}
				onScroll={(e) => handleScroll(e.target.scrollTop)}
				ref={messageRef}
			>
				{loading && loader}
				{([...list] || []).reverse().map((eachList) => (eachList?.call_type === 'incoming' ? (
					<ReceiveDiv eachList={eachList} />
				) : (
					<SentDiv eachList={eachList} />
				)))}
			</div>
		</>
	);
}

export default VoiceCall;
