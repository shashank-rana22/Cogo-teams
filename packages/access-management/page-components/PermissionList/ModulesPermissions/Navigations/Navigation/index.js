import React, { useState } from 'react';
import { Modal } from '@cogoport/front/components';
import Btn from '@cogoport/front/components/Button';
import toast from '@cogoport/front/components/toast';
import { useSelector } from '@cogo/store';
import {
	Container,
	Name,
	Description,
	Row,
	Wrapper,
	SpaceBetween,
	Arrow,
} from './styles';

import useCreateRole from '../../../../../hooks/useCreateRole';
import descriptions from '../../../../../utils/descriptions';
import ChangeStatus from './ChangeStatus';
import NavContent from './NavContent';

const getFormValues = (navigationRefs, isActive) =>
	new Promise((resolve) => {
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
					(dataValues) => {
						values = dataValues;
					},
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

const Navigation = (props) => {
	const {
		navigation,
		roleData = {},
		authRoleId = '',
		getRole = () => {},
		getNavOptions = () => {},
		loading = false,
		isNested = false,
	} = props;
	const navigationApis = getNavOptions(navigation.key);
	const navPermissions = (roleData?.old_permissions || []).find(
		(nav) => nav.navigation === navigation.key,
	);
	const [show, setShow] = useState(null);
	const [showStatus, setShowStatus] = useState(null);
	const [selectedDepartments, setSelectedDepartments] = useState({
		scopes: ['allowed'],
	});
	const { createRole, loading: creatingNavs } = useCreateRole();
	const [navigationRefs, setNavigationRefs] = useState({});
	const isMobile = useSelector(({ general }) => general?.isMobile);

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
			toast.error('Please fill all values');
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
	let background = '#CDDBFF';
	let borderColor = '#CDDBFF';
	let color = '#356EFD';
	if (roleData?.isImported) {
		buttonText = 'Allow Navigation';
		background = '#CDF7D4';
		borderColor = '#CDF7D4';
		color = '#4F4F4F';
	}
	if (isActive) {
		buttonText = 'Un-Assign Now';
		background = '#cb6464';
		borderColor = '#cb6464';
		color = '#ffffff';
	}

	return (
		<Wrapper className={isNested ? 'nested' : ''}>
			<Arrow className={isNested ? 'nested' : ''} />
			<Container>
				<SpaceBetween>
					<Row className="margin">
						<div>
							<Name>{navigation?.title}</Name>
							<Description>{descriptions[navigation?.key] || ''}</Description>
						</div>
					</Row>
					<Row className="actions">
						<Btn
							className="small uppercase"
							onClick={handlePrimaryAction}
							style={{
								background,
								borderColor,
								color,
							}}
							disabled={loading}
						>
							{buttonText}
						</Btn>
						{isActive && containsApis ? (
							<Btn
								onClick={() => setShow(2)}
								style={{
									background: '#CDDBFF',
									borderRadius: 4,
									height: 'auto',
									padding: '4px 26px',
									borderColor: '#CDDBFF',
									color: '#356EFD',
									marginLeft: 16,
								}}
								disabled={loading}
							>
								Edit
							</Btn>
						) : null}
					</Row>
				</SpaceBetween>
			</Container>
			{/* <AnimatedContainer type={show ? 'enter' : 'exit'}> */}
			<Modal
				show={!!show}
				onClose={() => setShow(null)}
				width={!isMobile ? 850 : 'auto'}
				styles={show === 1 ? { dialog: { overflow: 'visible' } } : {}}
				fullscreen={isMobile}
			>
				<NavContent
					title={navigation?.title}
					description={descriptions[navigation?.key] || ''}
					navigationApis={{ ...navigationApis, isActive }}
					setNavigationRefs={(newValues) => {
						setNavigationRefs((prev) => ({ ...prev, ...newValues }));
					}}
					roleData={roleData}
					creatingNavs={creatingNavs}
					handleSave={handleSave}
					setShow={setShow}
					show={show}
					onDepartmentChange={onDepartmentChange}
					selectedDepartments={selectedDepartments}
				/>
			</Modal>
			{/* </AnimatedContainer> */}
			<ChangeStatus
				type={showStatus}
				show={!!showStatus}
				onClose={() => setShowStatus(null)}
				navigation={navigation.key}
				auth_role_id={authRoleId}
				getList={getRole}
			/>
		</Wrapper>
	);
};
export default Navigation;
