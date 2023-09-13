import { Button, cl } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

export default function PopoverContent({
	scope, viewType, selectedAgentId, scopeData, onClose, onApply, size, showChooseAgent, userId,
}) {
	const { scopes, viewTypes } = scopeData;
	const defaultValues = {
		scope,
		...(viewType && { viewType }),
		...(showChooseAgent && { selected_agent_id: selectedAgentId }),
	};

	const { control, watch, setValue, handleSubmit } = useForm({ defaultValues });

	const { scope: selectedScope, viewType: selectedViewType } = watch();

	const actionButtons = [
		{
			label   : 'Cancel',
			onClick : onClose,
		},
		{
			label   : 'Apply',
			onClick : handleSubmit(onApply),
		},
	];

	const handleValChange = (key, val) => {
		setValue(key, val);
	};

	useEffect(() => {
		setValue('viewType', (viewType || (viewTypes?.[selectedScope] || [])[GLOBAL_CONSTANTS.zeroth_index]));
		if (selectedScope === 'self') {
			setValue('selected_agent_id', '');
		}
	}, [selectedScope, viewTypes, setValue, viewType]);

	const isScopesPresent = !isEmpty(scopes);
	const isViewTypesPresent = !isEmpty(viewTypes?.[selectedScope]);

	return (
		<div className={styles.popover_content}>
			<div className={styles.button_container}>
				{actionButtons.map((button) => (
					<Button
						key={button.label}
						size={size}
						className={styles.action_buttons}
						onClick={button.onClick}
					>
						{button.label}
					</Button>
				))}
			</div>

			<hr />

			{isScopesPresent ? (
				<>
					<p className={styles.field_label}>Select Scope</p>
					<div className={styles.pills_container}>
						{scopes.map((val) => (
							<Button
								key={val}
								className={cl`${styles.button_as_pill} ${selectedScope === val ? styles.active : ''}`}
								size={size}
								onClick={() => handleValChange('scope', val)}
								color={selectedScope === val ? 'green' : undefined}
							>
								{startCase(val)}
							</Button>
						))}
					</div>
				</>
			) : null }

			{isViewTypesPresent ? (
				<>
					<p className={styles.field_label}>Select View Type</p>
					<div className={styles.pills_container}>
						{viewTypes[selectedScope].map((val) => (
							<Button
								key={val}
								className={cl`${styles.button_as_pill} ${selectedViewType === val
									? styles.active
									: ''}`}
								size={size}
								onClick={() => handleValChange('viewType', val)}
								color={selectedViewType === val ? 'green' : undefined}
							>
								{startCase(val)}
							</Button>
						))}
					</div>
				</>
			) : null }

			{showChooseAgent && selectedScope !== 'self' ? (
				<>
					<p className={styles.field_label}>Choose Agent</p>
					<AsyncSelectController
						name="selected_agent_id"
						control={control}
						size={size}
						asyncKey="partner_users"
						initialCall
						params={{
							...(!['across_all', 'all'].includes(selectedScope) ? {
								filters: {
									reporting_manager_id: userId,
								},
							} : {}),
							status: 'active',
						}}
						isClearable
						valueKey="user_id"
					/>
				</>
			) : null }
		</div>
	);
}
