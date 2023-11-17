import { Modal, Pagination, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import AGENT_CONFIG_MAPPING from '../../../../../constants/agentConfigMapping';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';
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
	agents_status: {
		Component  : LeaveStatusView,
		hook       : useListAgentStatus,
		headerText : 'Agents Status',
	},
	switch_views: {
		Component  : SwitchView,
		headerText : 'Switch View',
	},
	shift_configuration: {
		Component  : ShiftConfiguration,
		headerText : 'Shift Configuration',
	},
};

const ALLOW_BACK_BUTTON_FOR = ['fire_base_configuration', 'shift_configuration'];

function ConfigModal({
	firestore = {},
	configurationsToBeShown = [],
	viewType = '',
	activeCard = '',
	setActiveCard = () => {},
	setViewType = () => {},
	initialViewType = '',
	isMobile = false,
}) {
	const [switchViewType, setSwitchViewType] = useState(viewType);
	const {
		Component = null,
		hook: hookToBeUsed = () => {},
		headerText = '',
	} = TAB_CONFIG_MAPPING[activeCard] || TAB_CONFIG_MAPPING.list_agents;

	const showRmAgentsDetails = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_rm_agent_details;

	const isModalActive = Object.keys(TAB_CONFIG_MAPPING).includes(activeCard);

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
		agentType  : getCommonAgentType({ viewType }),
		showRmAgentsDetails,
		activeCard : activeCard || 'default',
	}) || {};

	const {
		list = [],
		page_limit = 10,
		total_count = 0,
		page = 0,
	} = listAgentStatus;

	const handleClose = () => {
		setActiveCard('');
	};

	const handleBack = () => {
		setActiveCard('config_modal');
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
		shift_configuration: {
			handleClose,
			viewType,
		},
	};

	if (!activeCard) {
		return null;
	}

	return (
		<Modal
			size="md"
			show
			onClose={handleClose}
			placement={isMobile ? 'bottom' : 'top'}
			scroll={activeCard !== 'shift_configuration'}
			style={{ width: isMobile ? '100%' : '600px' }}
		>
			<Modal.Header
				className={styles.modal_header}
				title={ALLOW_BACK_BUTTON_FOR.includes(activeCard) ? (
					<>
						<IcMArrowBack className={styles.back_icon} onClick={handleBack} />
						<span className={styles.header_label}>
							{isModalActive
								? (headerText || 'Configuration')
								: startCase(activeCard)}
						</span>
					</>
				) : (
					<div>
						{isModalActive
							? (headerText || 'Configuration')
							: startCase(activeCard)}
					</div>
				)}
			/>

			<Modal.Body className={styles.modal_body}>
				{(isModalActive && Component)
					? (
						<Component
							key={activeCard}
							isMobile={isMobile}
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
