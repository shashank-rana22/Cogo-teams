import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

export default function PopoverContent({ scope, viewType, onClose, onApply, scopeData, size }) {
	const { scopes, viewTypes, defaultScope, defaultView } = scopeData;

	const defaultValues = { scope: scope || defaultScope };

	const validViewTypes = viewTypes[defaultValues.scope] || [];
	defaultValues.viewType = validViewTypes.includes(viewType) ? viewType : defaultView;

	const { watch, setValue, handleSubmit } = useForm({ defaultValues });

	const { scope: selectedScope, viewType: selectedViewType } = watch();

	const handleValChange = (key, val) => {
		setValue(key, val);
	};

	useEffect(() => {
		setValue('viewType', (viewTypes[selectedScope] || [])[0]);
	}, [selectedScope, viewTypes, setValue]);

	const isScopesPresent = scopes.length > 0;
	const isViewTypesPresent = (viewTypes[selectedScope] || []).length > 0;

	return (
		<div className={styles.popover_content}>
			<div className={styles.button_container}>
				<Button
					size={size}
					className={styles.action_buttons}
					onClick={onClose}
				>
					Cancel

				</Button>
				<Button
					size={size}
					className={styles.action_buttons}
					onClick={handleSubmit(onApply)}
				>
					Apply

				</Button>
			</div>

			<hr />

			{isScopesPresent ? (
				<>
					<p className={styles.field_label}>Select Scope</p>
					<div className={styles.pills_container}>
						{scopes.map((val) => (
							<Button
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
		</div>
	);
}
