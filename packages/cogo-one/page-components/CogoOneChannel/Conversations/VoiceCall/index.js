import { useRef, useEffect } from 'react';

import useListUserVoiceCalls from '../../../../hooks/useListUserVoiceCalls';

import Header from './Header';
import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';
import VoiceCallLoader from './VoiceCallLoader';

const COUNT_THREE_HUNDRED = 300;
const COUNT_ZERO = 0;
const COUNT_TEN = 10;

function VoiceCall({
	activeVoiceCard = {},
	isMobile = false,
	setActiveTab = () => {},
}) {
	const { user_id = null, user_number = '' } = activeVoiceCard || {};
	const messageRef = useRef(null);

	const scrollBottom = () => {
		setTimeout(() => {
			messageRef?.current?.scrollTo({
				top      : (messageRef?.current?.scrollHeight || COUNT_ZERO) + COUNT_TEN,
				behavior : 'smooth',
			});
		}, COUNT_THREE_HUNDRED);
	};

	const {
		loading,
		listData: { list = [], initialLoad = false } = {},
		handleScroll,
	} = useListUserVoiceCalls({
		userId     : user_id,
		userNumber : user_number,
	});

	useEffect(() => {
		if (initialLoad) {
			scrollBottom();
		}
	}, [activeVoiceCard, initialLoad]);

	return (
		<div className={styles.container}>
			<Header
				activeVoiceCard={activeVoiceCard}
				isMobile={isMobile}
				setActiveTab={setActiveTab}
			/>

			<div
				className={styles.message_container}
				onScroll={(e) => handleScroll(e.target.scrollTop)}
				ref={messageRef}
			>
				{loading && <VoiceCallLoader />}
				{([...list] || []).reverse().map((eachList) => (eachList?.call_type === 'incoming' ? (
					<ReceiveDiv key={eachList?.created_at} eachList={eachList} />
				) : (
					<SentDiv key={eachList?.created_at} eachList={eachList} />
				)))}
			</div>
		</div>
	);
}

export default VoiceCall;
