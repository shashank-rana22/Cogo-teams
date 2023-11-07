import { Popover } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMDoubleFilter } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import SidTypeFilters from './SidTypeFilters';
import styles from './styles.module.css';

function CategoryType(props) {
	const { searchParams, setSearchParams, idFilters = {}, isAdmin, setIdFilters = () => {} } = props;
	const {
		show = false, category = '',
		subcategory = '', raisedBy = '',
		raisedTo = '', service = '', trade = '',
		requestType = '',
	} = idFilters || {};

	const { t } = useTranslation(['myTickets']);

	const isAppliedFilter = category || subcategory || raisedBy || service || trade || requestType || raisedTo;

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
				asyncKey="default_types"
				value={searchParams.category}
				placeholder={t('myTickets:ticket_type_filter_placeholder_text')}
				microService="tickets"
				isClearable
				initialCall
			/>
			<Popover
				visible={show}
				placement="left"
				render={<SidTypeFilters {...props} />}
				interactive
				onClickOutside={() => setIdFilters((prev) => ({ ...prev, show: false }))}
				className={styles.styled_popover}
			>
				<div
					role="presentation"
					className={styles.filter_container}
					onClick={() => setIdFilters((prev) => ({ ...prev, show: true }))}
				>
					<IcMDoubleFilter width={20} height={20} />
				</div>
			</Popover>
			{isAppliedFilter ? (
				<div className={styles.applied_dot} />
			) : null}
		</div>
	);
}

export default CategoryType;
