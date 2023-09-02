import { Modal, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAuthRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useCreateRole from '../../../../../hooks/useCreateRoles';
import roleDescriptions from '../../../../../utils/descriptions';

import ChangeStatus from './ChangeStatus';
import NavContent from './NavContent';
import styles from './styles.module.css';

const FIRST_INDEX = 1;
const SECOND_INDEX = 2;
const TIMEOUT = 200;

const getFormValues = (navigationRefs, isActive) => new Promise((resolve) => {
	let allValuesFilled = true;
	const ALL_VALUES = {};
	Object.keys(navigationRefs).forEach((featureKey) => {
		const {
			handleSubmit: hS,
			onError,
			values: apiValues,
		} = navigationRefs[featureKey];
		let values = apiValues;
		if (hS) {
			hS(
				(dataValues) => { values = dataValues; },
				(err) => {
					onError(err);
					allValuesFilled = false;
				},
			)();
		}
		const valueKeys = Object.keys(values);
		let apiKey = null;
		valueKeys.forEach((key) => {
			const splittedKey = key.split('-');
			if (splittedKey.length === FIRST_INDEX) {
				apiKey = splittedKey?.[GLOBAL_CONSTANTS.zeroth_index];
			}
		});
		ALL_VALUES[apiKey] = { ...values, is_inactive: !isActive };
	});
	setTimeout(() => {
		resolve({ allValuesFilled, allValues: ALL_VALUES });
	}, TIMEOUT);
});

/**
 * Renders single navigation
 * @param {object} props
 * @param {object} [props.navigation={}]
 * @param {object} [props.roleData={}]
 * @param {string} [props.authRoleId={}]
 * @param {function} [props.getRole=() => {}]
 * @param {function} [props.getNavOptions=() => {}]
 * @returns  Navigation UI
 */

function Navigation(props) {
	const {
		navigation,
		roleData = {},
		authRoleId = '',
		getRole = () => {},
		getNavOptions = () => {},
		loading = false,
		isNested = false,
		activeNavs,
	} = props;
	const { t } = useTranslation(['accessManagement', 'common']);
	const [show, setShow] = useState(null);
	const [showStatus, setShowStatus] = useState(null);
	const [navigationRefs, setNavigationRefs] = useState({});
	const [selectedDepartments, setSelectedDepartments] = useState({ scopes: ['allowed'] });
	const { createRole, loading: creatingNavs } = useCreateRole();

	const descriptions = roleDescriptions(t);

	const navigationApis = getNavOptions(navigation.key);
	const [{ data = {}, loading: loadingPermissions = false }, trigger] = useAuthRequest({
		url    : 'list_role_permissions',
		method : 'get',
	}, { manual: true });

	const getNavigationPermissions = async () => {
		await trigger({
			params: {
				filters: {
					role_id    : authRoleId,
					navigation : navigation?.key,
					status     : true,
				},
				all_role_permissions_required: true,
			},
		});

		setShow(SECOND_INDEX);
	};

	const { list: rolePermissionsList = [] } = data;
	const isActive = (activeNavs || []).includes(navigation.key);

	const updatedRoleData = { ...roleData, permissions: rolePermissionsList };

	const afterSave = () => {
		getRole(authRoleId, false);
		setShow(false);
	};

	const handleSubmit = (vals) => {
		if (authRoleId) {
			createRole(authRoleId, vals, afterSave, updatedRoleData);
		}
	};

	const handleDepartmentToPermissions = () => {
		getNavigationPermissions();
	};

	const handleSave = async () => {
		const { allValuesFilled, allValues } = await getFormValues(
			navigationRefs,
			isActive,
		);
		if (!allValuesFilled) {
			Toast.error('Please fill all values');
		} else {
			handleSubmit({ [navigation.key]: allValues });
		}
	};

	const onDepartmentChange = (values) => {
		setSelectedDepartments({ ...selectedDepartments, ...values });
	};

	const containsApis = (navigation.possible_apis || []).length;

	const handlePrimaryAction = () => {
		if (isActive) {
			setShowStatus('inactive');
		} else if (!containsApis) {
			setShowStatus('active');
		} else if (roleData?.isImported) {
			setShow(SECOND_INDEX);
		} else {
			setShow(FIRST_INDEX);
		}
	};

	let buttonText = t('accessManagement:roles_and_permission_crm_dashboard_button_text_assign_now');
	let background = 'accent';
	if (isActive) {
		buttonText = t('accessManagement:roles_and_permission_crm_dashboard_button_text_un_assign_now');
		background = 'secondary';
	}

	let btnText = creatingNavs
		? t('accessManagement:roles_and_permission_crm_dashboard_btn_text_modal_second_screen_please_wait')
		: t('accessManagement:roles_and_permission_crm_dashboard_btn_text_modal_second_screen_save');
	if (show === FIRST_INDEX) {
		btnText = t('accessManagement:roles_and_permission_crm_dashboard_btn_text_modal_next');
	}

	if (roleData?.isImported) {
		buttonText = t('accessManagement:roles_and_permission_crm_dashboard_button_text_allow_navigation');
		background = 'primary';
	}

	return (
		<section className={`${styles.wrapper} ${isNested ? styles.nested : ''}`}>
			<div className={isNested ? styles.arrow_nested : ''} />
			<div className={styles.container}>
				<div className={styles.space_between}>
					<div className={styles.row}>
						<div>
							<p className={styles.name}>{navigation?.title}</p>
							<p className={styles.description}>{descriptions[navigation?.key] || ''}</p>
						</div>
					</div>
					<div className={styles.row}>
						<Button
							size="md"
							themeType={background}
							onClick={handlePrimaryAction}
							disabled={loading}
							className={styles.row_button}
						>
							{buttonText}
						</Button>
						{isActive && containsApis ? (
							<Button
								size="md"
								className={styles.edit}
								onClick={() => handleDepartmentToPermissions()}
								disabled={loading}
							>
								{t('accessManagement:roles_and_permission_crm_dashboard_button_edit')}
							</Button>
						) : null}
					</div>
				</div>
			</div>

			{show && (
				<Modal
					size="xl"
					show={show}
					onClose={() => setShow(false)}
					className={styles.modal_container}
				>
					<Modal.Header title={(
						<div>
							<h2>{navigation?.title}</h2>
							<span>{descriptions[navigation?.key] || ''}</span>
						</div>
					)}
					/>
					<Modal.Body>
						<NavContent
							navigationApis={{ ...navigationApis, isActive }}
							setNavigationRefs={(newValues) => {
								setNavigationRefs((prev) => ({ ...prev, ...newValues }));
							}}
							roleData={updatedRoleData}
							creatingNavs={creatingNavs}
							handleSave={handleSave}
							show={show}
							onDepartmentChange={onDepartmentChange}
							selectedDepartments={selectedDepartments}
						/>
					</Modal.Body>

					<Modal.Footer>
						<div className={styles.buttons_container}>
							<Button
								size="md"
								style={{ marginRight: 10 }}
								themeType="secondary"
								disabled={creatingNavs}
								onClick={() => {
									if (show === FIRST_INDEX || roleData.isImported) {
										setShow(null);
									} else {
										setShow(FIRST_INDEX);
									}
								}}
							>
								{show === FIRST_INDEX || roleData.isImported
									? t('accessManagement:roles_and_permission_crm_dashboard_btn_text_cancel')
									: t('accessManagement:roles_and_permission_crm_dashboard_btm_text_back')}
							</Button>
							<Button
								size="md"
								onClick={show === FIRST_INDEX ? () => handleDepartmentToPermissions() : handleSave}
								loading={loadingPermissions || creatingNavs}
								disabled={creatingNavs}
							>
								{btnText}
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}

			<ChangeStatus
				type={showStatus}
				show={!!showStatus}
				onClose={() => setShowStatus(null)}
				navigation={navigation.key}
				auth_role_id={authRoleId}
				getList={getRole}
			/>
		</section>
	);
}

export default Navigation;
