import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function CategoryType(props) {
	const { searchParams, setSearchParams, isAdmin } = props;
	const { t } = useTranslation(['myTickets']);

	return (
		<div className={styles.category_container}>
			{isAdmin && (
				<AsyncSelect
					name="user_id"
					asyncKey="partner_users"
					valueKey="user_id"
					initialCall
					value={searchParams.agent}
					placeholder={t('myTickets:agent_filter_placeholder_text')}
					isClearable
					onChange={(val) => setSearchParams((prev) => ({
						...prev,
						agent: val,
					}))}
				/>
			)}
			<AsyncSelect
				name="ticket_type"
				onChange={(val) => setSearchParams((prev) => ({
					...prev,
					category: val,
				}))}
				params={{ Audience: 'cogoport_user' }}
				asyncKey="default_types"
				value={searchParams.category}
				placeholder={t('myTickets:ticket_type_filter_placeholder_text')}
				microService="tickets"
				isClearable
				initialCall
			/>
		</div>
	);
}

export default CategoryType;
