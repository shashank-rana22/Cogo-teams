import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMAppSearch, IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

import Templates from '../../../common/Templates';
import getControls from '../../../configurations/service-provider-controls';
import useGetAvailableServiceProviders from '../../../hooks/useGetAvailableServiceProviders';
import useSendUsersBulkCommunication from '../../../hooks/useSendUsersBulkCommunication';

import Form from './Form';
import OrgUsersList from './OrgUserList';
import styles from './styles.module.css';

function PortPairOrgFilters({
	setSendBulkTemplates = () => {},
	setActiveTab = () => {},
	selectedAutoAssign = {},
	setSelectedAutoAssign = () => {},
	setAutoAssignChats = () => {},
	sendBulkTemplates = false,
}) {
	const [listServiceProviders, setListServiceProviders] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState({});
	const [modalType, setModalType] = useState('');
	const [portDetails, setPortDetails] = useState({
		originDetails      : {},
		destinationDetails : {},
	});
	const [selectAll, setSelectAll] = useState(false);

	const { originDetails = {}, destinationDetails = {} } = portDetails;
	const divRef = useRef(null);
	const {
		control,
		handleSubmit,
		formState: { errors = {} },
		watch,
		reset,
	} = useForm({
		defaultValues: {
			service_type        : 'fcl_freight',
			origin_port_id      : originDetails?.id,
			destination_port_id : destinationDetails?.id,
		},
	});

	const formValues = watch();

	const selectedUsersList = isEmpty(selectedUsers) ? selectedAutoAssign : selectedUsers;

	const {
		service_type: serviceType,
		origin_port_id: originLocation,
		destination_port_id: destinationLocation,
	} = formValues || {};

	const {
		serviceProvidersloading = false,
		getServiceProviders = () => {},
	} = useGetAvailableServiceProviders({ setListServiceProviders });

	const closeModal = () => {
		setModalType('');
	};

	const { bulkCommunicationChat = () => {} } = useSendUsersBulkCommunication({
		callbackfunc: closeModal,
		setSelectedAutoAssign,
		setSelectedUsers,
		setModalType,
		setSendBulkTemplates,
		setAutoAssignChats,
	});

	const bulkCommunication = (args) => {
		const { template_name, variables } = args;
		bulkCommunicationChat({ selectedAutoAssign: selectedUsersList, variables, template_name });
	};

	const data = {
		sendCommunicationTemplate : bulkCommunication,
		communicationLoading      : false,
	};

	const onSubmit = (values) => {
		getServiceProviders({ values, portDetails });
	};

	const handleReset = ({ val }) => {
		reset({
			service_type        : val,
			origin_port_id      : '',
			destination_port_id : '',
		});
		setPortDetails((prevState) => ({
			...prevState,
			originDetails      : {},
			destinationDetails : {},
		}));
		setModalType('');
		setSelectedUsers({});
		setListServiceProviders([]);
	};

	const isPortData = destinationLocation || originLocation;
	const controls = getControls({
		serviceType,
		setPortDetails,
		handleReset,
		setModalType,
		setSelectedUsers,
		setListServiceProviders,
	});

	const handleClear = () => {
		setListServiceProviders([]);
		reset({
			service_type        : 'fcl_freight',
			origin_port_id      : '',
			destination_port_id : '',
		});
		setPortDetails((prevState) => ({
			...prevState,
			originDetails      : {},
			destinationDetails : {},
		}));
		setSelectAll(false);
		setSelectedUsers({});
	};

	const handleCancel = () => {
		setSendBulkTemplates(false);
		setSelectedAutoAssign({});
		setAutoAssignChats(true);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (divRef.current && !divRef.current.contains(event.target)) {
				setSendBulkTemplates(false);
				setSelectedAutoAssign({});
				setAutoAssignChats(true);
			}
		};

		if (sendBulkTemplates) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [sendBulkTemplates, setAutoAssignChats, setSelectedAutoAssign, setSendBulkTemplates]);

	return (
		<div className={styles.main_container} ref={divRef}>
			<div className={styles.header}>
				<div className={styles.title}>
					Users
				</div>
				<Button
					size="sm"
					themeType="tertiary"
					onClick={handleCancel}
					type="button"
				>
					<IcMCross width={15} height={15} />
				</Button>
			</div>

			<div className={styles.container}>
				{isEmpty(selectedAutoAssign) ? (
					<div className={styles.form_container}>
						<Form controls={controls} errors={errors} control={control} />
						<div className={styles.user_actions}>
							<Button
								loading={serviceProvidersloading}
								size="md"
								themeType="primary"
								onClick={handleSubmit(onSubmit)}
								type="button"
							>
								<IcMAppSearch width={20} height={20} />
							</Button>

							<div className={cl`${styles.clear_filters} ${isEmpty(errors) ? styles.action : ''}`}>
								<Button
									size="md"
									themeType="secondary"
									onClick={handleClear}
									type="button"
									disabled={!isPortData}
								>
									clear
								</Button>
							</div>
						</div>
					</div>
				) : null}

				<div className={styles.template_container}>
					<OrgUsersList
						setActiveTab={setActiveTab}
						listServiceProviders={listServiceProviders}
						setListServiceProviders={setListServiceProviders}
						setSelectedUsers={setSelectedUsers}
						selectedUsers={selectedUsers}
						setSendBulkTemplates={setSendBulkTemplates}
						setModalType={setModalType}
						modalType={modalType}
						selectedAutoAssign={selectedAutoAssign}
						setSelectedAutoAssign={setSelectedAutoAssign}
						setSelectAll={setSelectAll}
						selectAll={selectAll}
					/>

					{modalType ? (
						<div className={cl`${styles.template} 
						${isEmpty(selectedAutoAssign) ? styles.port_pair_template : ''}`}
						>
							<Templates
								data={data}
								selectedAutoAssign={selectedUsers}
								type={modalType}
							/>
						</div>
					) : null}
				</div>

			</div>
		</div>
	);
}

export default PortPairOrgFilters;
