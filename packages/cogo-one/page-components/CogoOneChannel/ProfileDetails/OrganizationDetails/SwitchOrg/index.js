import { Popover, Select, Button, cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';
import useSwitchOrganization from '../../../../../hooks/useSwitchOrganization';

import styles from './styles.module.css';

function RenderLabel({ item = {} }) {
	const { business_name = '', serial_id, kyc_status = '' } = item || {};

	return (
		<div className={styles.label_wrapper}>
			<div className={styles.label}>
				{startCase(business_name)}
			</div>
			<div className={styles.sub_label}>
				{serial_id ? (
					<div className={styles.serial_id}>
						ID:
						{' '}
						{serial_id}
					</div>
				) : null}
				<div className={cl`${styles.tag} ${kyc_status === 'verified'
					? styles.verified
					: styles.not_verified}`}
				>
					{kyc_status !== 'verified' ? 'Not verified' : 'Verified'}
				</div>
			</div>
		</div>
	);
}

function PopoverContent({
	loading = false,
	switchOrganization = () => {},
	setSelectedOrg = () => {},
	selectedOrg = '',
	onClose = () => {},
	formattedData = {},
}) {
	const { organization_id = '', organizations = [] } = formattedData?.user_details || {};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Switch Organization</div>
			<div className={styles.select_container}>
				<Select
					value={selectedOrg}
					onChange={setSelectedOrg}
					size="md"
					options={organizations || []}
					labelKey="business_name"
					valueKey="organization_id"
					renderLabel={(item) => <RenderLabel item={item} />}
				/>
			</div>
			<div className={styles.footer_flex}>
				<Button
					size="sm"
					themeType="tertiary"
					disabled={loading}
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					size="sm"
					themeType="accent"
					className={styles.button_styles}
					loading={loading}
					onClick={switchOrganization}
					disabled={organization_id === selectedOrg}
				>
					Switch
				</Button>
			</div>
		</div>
	);
}

function SwitchOrg({
	firestore = {},
	formattedData = {},
	viewType = '',
}) {
	const agentId = useSelector((state) => state?.profile?.user?.id);

	const [showSwitchOrg, setShowSwitchOrg] = useState(false);

	const {
		loading,
		switchOrganization,
		setSelectedOrg = () => {},
		selectedOrg,
	} = useSwitchOrganization({ firestore, formattedData, setShowSwitchOrg });

	const onClose = () => {
		if (loading) {
			return;
		}
		setShowSwitchOrg(false);
	};

	const {
		support_agent_id = '',
		managers_ids = [],
	} = formattedData || {};

	const hasPermissionToEdit = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.has_permission_to_edit
	|| managers_ids?.includes(agentId)
	|| support_agent_id === agentId;

	if (!hasPermissionToEdit) {
		return null;
	}

	return (
		<div className={styles.popover_styles}>
			<Popover
				placement="bottom"
				onClickOutside={onClose}
				visible={showSwitchOrg}
				render={showSwitchOrg ? (
					<PopoverContent
						onClose={onClose}
						loading={loading}
						switchOrganization={switchOrganization}
						setSelectedOrg={setSelectedOrg}
						selectedOrg={selectedOrg}
						formattedData={formattedData}
					/>
				) : null}
			>
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => setShowSwitchOrg((prev) => !prev)}
					disabled={loading}
				>
					Switch Organization
				</Button>
			</Popover>

		</div>
	);
}
export default SwitchOrg;
