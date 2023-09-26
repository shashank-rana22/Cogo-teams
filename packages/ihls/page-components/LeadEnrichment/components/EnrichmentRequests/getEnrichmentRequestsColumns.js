import { Button, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const getEnrichmentRequestsColumns = ({
	request = {},
	setRequest = () => {},
	onClose = () => {},
}) => {
	const onClickButton = (props) => {
		const { id, type } = props;
		setRequest((p) => ({
			...p,
			id,
			type,
		}));
	};
	return [
		{
			Header   : 'NAME',
			key      : 'name',
			id       : 'name',
			accessor : ({ name }) => (
				<div className={styles.table_cell}>
					{name || '___'}
				</div>
			),
		},
		{
			Header   : 'ENRICHMENT STATUS',
			key      : 'enrichment_status',
			id       : 'enrichment_status',
			accessor : ({ enrichment_status }) => (
				<div className={styles.table_cell}>
					{enrichment_status || '___'}
				</div>
			),
		},
		{
			Header   : 'ACCOUNTS',
			key      : 'total_accounts',
			id       : 'total_accounts',
			accessor : ({ total_accounts }) => (
				<div className={styles.table_cell}>
					{total_accounts || '___'}
				</div>
			),
		},
		{
			Header   : 'SOURCE',
			key      : 'source',
			id       : 'source',
			accessor : ({ source }) => (
				<div className={styles.table_cell}>
					{source || '___'}
				</div>
			),
		},
		{
			Header   : 'ASSIGN DATE',
			key      : 'assign_date',
			id       : 'assign_date',
			accessor : ({ created_at }) => (
				<section className={styles.table_cell}>
					{created_at ? format(created_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']) : '___'}
				</section>
			),
		},
		{
			Header   : 'ACTION',
			key      : 'action',
			id       : 'action',
			accessor : ({ enrichment_status, id }) => (
				<div className={styles.table_cell}>
					<Popover
						onClickOutside={() => onClose()}
						placement="bottom"
						caret={false}
						render={(
							<>
								<Button
									onClick={() => onClickButton({ id, type: 'view' })}
									themeType="primary"
									className={styles.popover_buttons}
								>
									View
								</Button>
								<Button
									className={styles.popover_buttons}
									size="md"
									themeType="primary"
									onClick={() => onClickButton({ id, type: 'edit' })}
								>
									Edit

								</Button>
								<Button
									className={styles.popover_buttons}
									size="md"
									themeType="primary"
									onClick={() => onClickButton({ id, type: 'users' })}
									disabled={enrichment_status !== 'success'}
								>
									Users
								</Button>
							</>
						)}
						visible={id === request.id && request.type === null}
					>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => { onClickButton({ id, type: null }); }}
						>
							Action
						</Button>
					</Popover>
				</div>
			),
		},
	];
};

export default getEnrichmentRequestsColumns;
