import { Button } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

export default function PopoverContent({
	scope, viewType, selectedAgentId, scopeData, onClose, onApply, size, showChooseAgent,
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
		setValue('viewType', (viewTypes[selectedScope] || [])[0]);
		if (selectedScope === 'self') {
			setValue('selected_agent_id', '');
		}
	}, [selectedScope, viewTypes, setValue]);

	const isScopesPresent = scopes.length > 0;
	const isViewTypesPresent = (viewTypes[selectedScope] || []).length > 0;

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
								className={`${styles.button_as_pill} ${selectedScope === val ? styles.active : ''}`}
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
								className={`${styles.button_as_pill} ${selectedViewType === val ? styles.active : ''}`}
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
						isClearable
						valueKey="user_id"
					/>
				</>
			) : null }
		</div>
	);
}
