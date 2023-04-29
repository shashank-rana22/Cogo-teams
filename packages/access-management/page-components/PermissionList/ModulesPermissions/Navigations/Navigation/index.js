import { Modal, Button, Toast } from '@cogoport/components';
import React, { useState } from 'react';

import useCreateRole from '../../../../../hooks/useCreateRoles';
import descriptions from '../../../../../utils/descriptions';

import ChangeStatus from './ChangeStatus';
import NavContent from './NavContent';
import styles from './styles.module.css';

const getFormValues = (navigationRefs, isActive) => new Promise((resolve) => {
	let allValuesFilled = true;
	const allValues = {};
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
			if (splittedKey.length === 1) {
				apiKey = splittedKey?.[0];
			}
		});
		allValues[apiKey] = { ...values, is_inactive: !isActive };
	});
	setTimeout(() => {
		resolve({ allValuesFilled, allValues });
	}, 200);
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
	} = props;
	const [show, setShow] = useState(null);
	const [showStatus, setShowStatus] = useState(null);
	const [navigationRefs, setNavigationRefs] = useState({});
	const [selectedDepartments, setSelectedDepartments] = useState({ scopes: ['allowed'] });
	const { createRole, loading: creatingNavs } = useCreateRole();

	const navigationApis = getNavOptions(navigation.key);

	const navPermissions = (roleData?.old_permissions || [])
		.find((nav) => nav.navigation === navigation.key);

	const isActive = navPermissions?.status === 'active';

	const afterSave = () => {
		getRole(authRoleId, false);
		setShow(false);
	};

	const handleSubmit = (vals) => {
		if (authRoleId) {
			createRole(authRoleId, vals, afterSave, roleData);
		}
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
			setShow(2);
		} else {
			setShow(1);
		}
	};

	let buttonText = 'Assign Now';
	let background = 'accent';
	if (isActive) {
		buttonText = 'Un-Assign Now';
		background = 'secondary';
	}

	let btnText = creatingNavs ? 'Saving, Please wait...' : 'Save';
	if (show === 1) {
		btnText = 'NEXT';
	}

	if (roleData?.isImported) {
		buttonText = 'Allow Navigation';
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
								onClick={() => setShow(2)}
								disabled={loading}

							>
								Edit
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
							roleData={roleData}
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
									if (show === 1 || roleData.isImported) {
										setShow(null);
									} else {
										setShow(1);
									}
								}}
							>
								{show === 1 || roleData.isImported ? 'Cancel' : 'BACK'}
							</Button>
							<Button
								size="md"
								onClick={show === 1 ? () => setShow(2) : handleSave}
								loading={creatingNavs}
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
