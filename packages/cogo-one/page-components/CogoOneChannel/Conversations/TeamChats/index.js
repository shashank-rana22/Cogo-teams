/* eslint-disable custom-eslint/variables-name-check */
import Footer from './Footer';
import CreatableHeader from './Headers/CreatableHeader';
import NormalHeader from './Headers/NormalHeader';
import Messages from './Messages';
import styles from './styles.module.css';

function TeamChats(props) {
	const { activeTeamCard = {}, suggestions = [], viewType = '' } = props || {};
	console.log('activeTeamCard:', activeTeamCard);
	const type = 'creatable';
	const HEADERS_MAPPING = {
		creatable : CreatableHeader,
		normal    : NormalHeader,
	};

	const ActiveHeader = HEADERS_MAPPING[type];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{/* <Header viewType={viewType} /> */}
				<ActiveHeader
					viewType={viewType}
				/>
			</div>
			<div className={styles.message_container}>
				<div className={styles.messages}>
					<Messages />
				</div>
				<div className={styles.footer}>
					<Footer
						suggestions={suggestions}
					/>
				</div>
			</div>
		</div>
	);
}

export default TeamChats;
