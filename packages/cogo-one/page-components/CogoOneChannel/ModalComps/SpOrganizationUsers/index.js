import { Modal, Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMAppSearch } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import Templates from '../../../../common/Templates';
import getControls from '../../../../configurations/service-provider-controls';
import useGetAvailableServiceProviders from '../../../../hooks/useGetAvailableServiceProviders';
import useSendUsersBulkCommunication from '../../../../hooks/useSendUsersBulkCommunication';

import Form from './Form';
import OrgUsersList from './OrgUserList';
import styles from './styles.module.css';

function SpOrganizationUsers({
	openSpContacts = false,
	setOpenSpContacts = () => {},
	setActiveTab = () => {},
}) {
	const [listServiceProviders, setListServiceProviders] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState({});
	const [modalType, setModalType] = useState('');
	const [portDetails, setPortDetails] = useState({
		originDetails      : {},
		destinationDetails : {},
	});

	const { originDetails = {}, destinationDetails = {} } = portDetails;

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
		callbackfunc          : closeModal,
		setSelectedAutoAssign : setSelectedUsers,
		setModalType,
		setOpenSpContacts,
	});

	const bulkCommunication = (args) => {
		const { template_name, variables } = args;
		bulkCommunicationChat({ selectedAutoAssign: selectedUsers, variables, template_name });
	};

	const data = {
		sendCommunicationTemplate : bulkCommunication,
		communicationLoading      : false,
	};
	const onSubmit = (values) => {
		getServiceProviders({ values, portDetails });
	};

	const isPortData = destinationLocation || originLocation;
	const controls = getControls({ serviceType, setPortDetails });

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
	};

	return (
		<Modal
			show={openSpContacts}
			onClose={() => setOpenSpContacts(false)}
			placement="center"
			scroll={false}
			className={modalType ? styles.styled_modal_template : styles.styled_modal}
		>
			<Modal.Header
				className={styles.header_styles}
				title="Organizaton Users"
			/>
			<Modal.Body className={styles.body_styles}>
				<div className={styles.container}>
					<div className={styles.selection_container}>
						<div className={styles.form_container}>
							<Form controls={controls} errors={errors} control={control} />
							<div className={styles.user_actions}>
								<Button
									loading={serviceProvidersloading}
									size="sm"
									themeType="primary"
									onClick={handleSubmit(onSubmit)}
									type="button"
								>
									<IcMAppSearch width={20} height={20} />
								</Button>

								<div className={cl`${styles.clear_filters} ${isEmpty(errors) ? styles.action : ''}`}>
									<Button
										size="sm"
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

						<OrgUsersList
							setActiveTab={setActiveTab}
							listServiceProviders={listServiceProviders}
							setListServiceProviders={setListServiceProviders}
							setSelectedUsers={setSelectedUsers}
							selectedUsers={selectedUsers}
							setOpenSpContacts={setOpenSpContacts}
							setModalType={setModalType}
						/>
					</div>

					{modalType && (
						<Templates
							data={data}
							selectedAutoAssign={selectedUsers}
							type={modalType}
						/>
					)}

				</div>
			</Modal.Body>
		</Modal>
	);
}
export default SpOrganizationUsers;
