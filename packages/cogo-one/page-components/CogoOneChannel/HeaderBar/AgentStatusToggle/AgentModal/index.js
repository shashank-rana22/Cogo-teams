import { Modal, Pagination, cl } from '@cogoport/components';
import { IcMAgentManagement, IcMLock } from '@cogoport/icons-react';
import { useState } from 'react';

import useListChatAgents from '../../../../../hooks/useListChatAgents';

import AgentWiseLockScreen from './AgentWiseLockScreen';
import RoleWiseLockScreen from './RoleWiseLockScreen';
import styles from './styles.module.css';

const SCREEN_LOCK_MAPPING = [
	{
		label : 'Agent',
		name  : 'agent',
		icon  : <IcMAgentManagement width={40} height={40} />,
	},
	{
		label : 'Lock Screen',
		name  : 'lock_screen',
		icon  : <IcMLock width={40} height={40} />,
	},
];

const COMPONENT_MAPPING = {
	agent       : AgentWiseLockScreen,
	lock_screen : RoleWiseLockScreen,
};

function AgentModal({
	showAgentDetails = false,
	setShowAgentDetails = () => {},
	firestore = {},
}) {
	const [activeCard, setActiveCard] = useState('');

	const {
		getListChatAgents = () => { },
		loading = false,
		listAgentStatus = {},
		setPagination = () => {},
		setSearch = () => {},
		paramsState = {},
		setAgentType = () => {},
	} = useListChatAgents();

	const {
		list = [],
		page_limit = 10,
		total_count = 0,
		page = 0,
	} = listAgentStatus;

	const COMPONENT_PROPS = {
		agent: {
			firestore,
			getListChatAgents,
			loading,
			list,
			setSearch,
			paramsState,
			setAgentType,
			setActiveCard,
		},

		lock_screen: {
			firestore,
			setActiveCard,
		},
	};

	const Component = COMPONENT_MAPPING[activeCard] || null;

	return (
		<Modal
			size="md"
			show={showAgentDetails}
			onClose={() => setShowAgentDetails(false)}
			placement="center"
		>
			<Modal.Header title="Configuration" />
			<Modal.Body className={styles.modal_body}>
				{!activeCard ? (
					<div className={styles.screen_container}>
						{SCREEN_LOCK_MAPPING.map((item) => {
							const { label, name, icon } = item || {};

							return (
								<div
									key={name}
									role="presentation"
									onClick={() => setActiveCard(name)}
									className={cl`
									${activeCard === name ? styles.active_card : ''} ${styles.card_section}`}
								>
									{icon}
									<div className={styles.card_label}>{label}</div>
								</div>
							);
						})}
					</div>

				) : (
					<Component key={activeCard} {...COMPONENT_PROPS[activeCard]} />
				) }
				{/* <AgentWiseLockScreen
					firestore={firestore}
					getListChatAgents={getListChatAgents}
					loading={loading}
					list={list}
					setSearch={setSearch}
					paramsState={paramsState}
					setAgentType={setAgentType}
				/>

				<RoleWiseLockScreen /> */}
			</Modal.Body>
			<Modal.Footer className={styles.footer_styles}>
				{!loading && activeCard === 'agent' && (
					<Pagination
						className={styles.pagination}
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPagination}
					/>
				)}
			</Modal.Footer>
		</Modal>
	);
}

export default AgentModal;
