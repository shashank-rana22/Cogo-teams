import { Modal, Pagination, cl } from '@cogoport/components';
import { useState } from 'react';

import AGENT_CONFIG_MAPPING from '../../../../../constants/agentConfigMapping';
import useListAgentStatus from '../../../../../hooks/useListAgentStatus';
import useListChatAgents from '../../../../../hooks/useListChatAgents';
import useListCogoOneShift from '../../../../../hooks/useListCogoOneShifts';
import getCommonAgentType from '../../../../../utils/getCommonAgentType';

import AgentWiseLockScreen from './AgentWiseLockScreen';
import LeaveStatusView from './LeaveStatusView';
import RoleWiseLockScreen from './RoleWiseLockScreen';
import styles from './styles.module.css';
import SwitchView from './SwitchView';

const SHOW_PAGINATION_FOR = ['list_agents', 'agents_status'];

const TAB_CONFIG_MAPPING = {
	list_agents: {
		Component  : AgentWiseLockScreen,
		hook       : useListChatAgents,
		headerText : 'Agents List',
	},
	lock_configuration: {
		Component  : RoleWiseLockScreen,
		headerText : 'Lock Screen Configuration',
	},
	agents_status: {
		Component  : LeaveStatusView,
		hook       : useListAgentStatus,
		headerText : 'Agents Status',
	},
	switch_views: {
		Component  : SwitchView,
		headerText : 'Switch View',
	},
};

function ConfigModal({
	showAgentDetails = false,
	setShowAgentDetails = () => {},
	firestore = {},
	configurationsToBeShown = [],
	viewType = '',
	activeCard = '',
	setActiveCard = () => {},
	setViewType = () => {},
	initialViewType = '',
}) {
	const [switchViewType, setSwitchViewType] = useState(viewType);
	const {
		Component = null,
		hook: hookToBeUsed = () => {},
		headerText = '',
	} = TAB_CONFIG_MAPPING[activeCard] || TAB_CONFIG_MAPPING.list_agents;

	const {
		getListChatAgents = () => { },
		loading = false,
		listAgentStatus = {},
		setPagination = () => {},
		setSearch = () => {},
		paramsState = {},
		setAgentType = () => {},
	} = hookToBeUsed({
		agentType: getCommonAgentType({ viewType }),
	}) || {};

	const { shiftList = [] } = useListCogoOneShift({ activeCard });

	const {
		list = [],
		page_limit = 10,
		total_count = 0,
		page = 0,
	} = listAgentStatus;

	const handleClose = () => {
		setActiveCard('');
		setShowAgentDetails(false);
	};

	const COMPONENT_PROPS = {
		list_agents: {
			firestore,
			getListChatAgents,
			loading,
			list,
			setSearch,
			paramsState,
			setAgentType,
			setActiveCard,
		},
		lock_configuration: {
			firestore,
			setActiveCard,
		},
		agents_status: {
			firestore,
			isLoading: loading,
			listAgentStatus,
			setSearch,
			paramsState,
			getListChatAgents,
			setActiveCard,
			shiftList,
		},
		switch_views: {
			viewType,
			setSwitchViewType,
			setActiveCard,
			switchViewType,
			handleClose,
			setViewType,
		},
	};

	return (
		<Modal
			size="md"
			show={showAgentDetails}
			onClose={handleClose}
			placement="top"
		>
			<Modal.Header
				className={styles.modal_header}
				title={headerText || 'Configuration'}
			/>

			<Modal.Body className={styles.modal_body}>
				{(activeCard && Component)
					? (
						<Component
							key={activeCard}
							{...COMPONENT_PROPS[activeCard]}
						/>
					) : (
						<div className={styles.screen_container}>
							{AGENT_CONFIG_MAPPING.map((item) => {
								const { label = '', name = '', icon = {} } = item || {};

								const toShowConfig = (
									configurationsToBeShown.includes(name)
									|| (initialViewType === 'cogoone_admin' && name === 'switch_views')
								);

								if (!toShowConfig) {
									return null;
								}

								return (
									<div
										key={name}
										role="presentation"
										onClick={() => setActiveCard(name)}
										className={cl`
											${activeCard === name ? styles.active_card : ''} 
											${styles.card_section}`}
									>
										{icon}
										<div className={styles.card_label}>{label}</div>
									</div>
								);
							})}
						</div>
					)}
			</Modal.Body>

			{SHOW_PAGINATION_FOR.includes(activeCard) ? (
				<Modal.Footer className={styles.footer_styles}>
					{!loading ? (
						<Pagination
							className={styles.pagination}
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={setPagination}
						/>
					) : null}

				</Modal.Footer>
			) : null}
		</Modal>
	);
}

export default ConfigModal;
