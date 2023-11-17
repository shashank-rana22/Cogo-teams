import { Button, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export function TooltipContent({ cardData = {}, categoryTypes = '' }) {
	const {
		service_provider = {},
		service_provider_poc = {},
	} = cardData || {};

	const {
		short_name = '',
		business_name = '',
	} = service_provider || {};

	const { name = '' } = service_provider_poc || {};

	return (
		<>
			<div className={styles.tooltip_data}>
				<span>Service Provider :</span>
				{short_name || business_name || '-'}
			</div>
			<div className={styles.tooltip_data}>
				<span>Service Provider Poc :</span>
				{name || '-'}
			</div>
			<div className={styles.tooltip_data}>
				<span>Category Types :</span>
				{categoryTypes || '-'}
			</div>
		</>
	);
}

export function SourcesTooltip({ sources = [] }) {
	return (
		<div>
			{((sources?.slice(1) || [])?.map(
				(itm) => (
					<Pill
						key={itm}
						size="sm"
						color="#F7FAEF"
					>
						{startCase(itm)}
					</Pill>
				),
			)
	)}
		</div>
	);
}

export function OptionsContainer({ setAssignData = () => {} }) {
	return (
		<Button
			themeType="secondary"
			onClick={(e) => {
				e.stopPropagation();

				setAssignData(
					(prev) => ({
						...prev,
						showModal   : true,
						showPopover : false,
					}),
				);
			}}
		>
			Assign
		</Button>
	);
}
