import { Modal, Pagination, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import AGENT_CONFIG_MAPPING from '../../../../../constants/agentConfigMapping';
import useListAgentStatus from '../../../../../hooks/useListAgentStatus';
import useListChatAgents from '../../../../../hooks/useListChatAgents';
import getCommonAgentType from '../../../../../utils/getCommonAgentType';

import AgentWiseLockScreen from './AgentWiseLockScreen';
import FireBaseConfiguration from './FireBaseConfiguration';
import LeaveStatusView from './LeaveStatusView';
import ShiftConfiguration from './ShiftConfiguration';
import styles from './styles.module.css';
import SwitchView from './SwitchView';

const SHOW_PAGINATION_FOR = ['list_agents', 'agents_status'];

const THREE_CONTAINER = 3;

const TAB_CONFIG_MAPPING = {
	list_agents: {
		Component  : AgentWiseLockScreen,
		hook       : useListChatAgents,
		headerText : 'Agents List',
	},
	fire_base_configuration: {
		Component  : FireBaseConfiguration,
		headerText : 'Fire Base Configuration',
	},
	shift_configuration: {
		Component  : ShiftConfiguration,
		headerText : 'Shift Configuration',
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
		setIsInActive = () => {},
		isInActive = false,
	} = hookToBeUsed({
		agentType: getCommonAgentType({ viewType }),
	}) || {};

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

	const handleBack = () => {
		setActiveCard('');
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
			setIsInActive,
			isInActive,
		},
		fire_base_configuration: {
			firestore,
			setActiveCard,
			handleClose,
		},
		shift_configuration: {
			handleClose,
			viewType,
		},
		agents_status: {
			firestore,
			isLoading: loading,
			listAgentStatus,
			setSearch,
			paramsState,
			getListChatAgents,
			setActiveCard,
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
			scroll={activeCard !== 'shift_configuration'}
		>
			<Modal.Header
				className={styles.modal_header}
				title={(activeCard === 'fire_base_configuration' || activeCard === 'shift_configuration') ? (
					<>
						<IcMArrowBack className={styles.back_icon} onClick={handleBack} />
						<span className={styles.header_label}>{headerText || 'Configuration'}</span>
					</>
				) : (
					headerText || 'Configuration'
				)}
			/>

			<Modal.Body className={cl`${styles.modal_body}
							 ${activeCard === 'shift_configuration'
				? styles.shift_container : ''}`}
			>
				{(activeCard && Component)
					? (
						<Component
							key={activeCard}
							{...COMPONENT_PROPS[activeCard]}
						/>
					) : (
						<div
							className={cl`${styles.screen_container}
							 ${AGENT_CONFIG_MAPPING.length > THREE_CONTAINER
								? styles.wrap_container : ''}`}
						>
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
