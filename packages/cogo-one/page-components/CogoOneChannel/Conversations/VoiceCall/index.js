import Header from './Header';
import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';

function VoiceCall({ activeVoiceCard = {} }) {
	const list = [{
		id                 : '1b9de34d-b567-4529-9d32-59750929b3e7',
		call_id            : '1676293898.12325211',
		call_type          : 'incoming',
		user_number        : '6468324492',
		user_id            : null,
		agent_number       : '8976761462',
		agent_id           : 'a03ccee5-2bd3-4fec-9a0a-097d143798fd',
		provider_number    : '918069195810',
		provider_name      : 'servtel',
		organization_id    : null,
		call_date          : '2023-02-13',
		duration_of_call   : '0',
		// recording_url      : 'https://customer.servetel.in/file/recording?callId=1676293898.12325211&type=rec&token=005f49a5c53a12e9ecf54f8aac106c70',
		description        : 'noanswer',
		initiated_by       : 'user',
		start_time_of_call : '2023-02-13 18:42:09',
		end_time_of_call   : '2023-02-13 18:42:09',
		call_status        : 'missed',
		live_call_status   : 'completed',
		created_at         : '2023-02-13T13:11:38.634Z',
		updated_at         : '2023-02-13T13:12:09.446Z',
		agent_data         : {
		  id                  : 'a03ccee5-2bd3-4fec-9a0a-097d143798fd',
		  name                : 'Ayushi Mishra',
		  email               : 'ayushi.mishra@cogoport.com',
		  mobile_country_code : '+91',
		},
		user_data         : null,
		organization_data : null,
		user_location     : null,
	  }, {
		id                 : '1b9de34d-b567-4529-9d32-59750929b3e7',
		call_id            : '1676293898.12325211',
		call_type          : 'incoming',
		user_number        : '6468324492',
		user_id            : null,
		agent_number       : '8976761462',
		agent_id           : 'a03ccee5-2bd3-4fec-9a0a-097d143798fd',
		provider_number    : '918069195810',
		provider_name      : 'servtel',
		organization_id    : null,
		call_date          : '2023-02-13',
		duration_of_call   : '0',
		// recording_url      : 'https://customer.servetel.in/file/recording?callId=1676293898.12325211&type=rec&token=005f49a5c53a12e9ecf54f8aac106c70',
		description        : 'noanswer',
		initiated_by       : 'agent',
		start_time_of_call : '2023-02-13 18:42:09',
		end_time_of_call   : '2023-02-13 18:42:09',
		call_status        : 'missed',
		live_call_status   : 'completed',
		created_at         : '2023-02-13T13:11:38.634Z',
		updated_at         : '2023-02-13T13:12:09.446Z',
		agent_data         : {
		  id                  : 'a03ccee5-2bd3-4fec-9a0a-097d143798fd',
		  name                : 'Ayushi Mishra',
		  email               : 'ayushi.mishra@cogoport.com',
		  mobile_country_code : '+91',
		},
		user_data         : null,
		organization_data : null,
		user_location     : null,
	  }];
	return (
		<>
			<div className={styles.container}>
				<Header activeVoiceCard={activeVoiceCard} />
			</div>
			<div className={styles.message_container}>
				{(list || []).map((eachList) => (eachList?.initiated_by === 'user'
					? <ReceiveDiv eachList={eachList} /> : <SentDiv eachList={eachList} />))}
			</div>
		</>
	);
}

export default VoiceCall;
