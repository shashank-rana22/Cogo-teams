import { Popover, Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import PopOverContent from '../../../../commons/PopoverContent';

import styles from './styles.module.css';

function topicListColumns({
	onClickEditTopic,
	onClickDeleteIcon,
	showPopOver,
	setShowPopOver,
	updateApiLoading,
	activeTopic,
}) {
	const onClickNoButton = () => {
		setShowPopOver(null);
	};

	const listColumns = [
		{
			Header   : 'TOPIC NAME',
			accessor : (items) => (
				<div className={styles.name}>
					{startCase(items?.name) || '--'}
				</div>
			),
		},
		{
			Header   : 'TOPIC DESCRIPTION',
			accessor : (items) => (
				<div className={styles.description}>
					{startCase(items?.description) || '--'}
				</div>
			),
		},
		{
			Header   : 'UPDATED BY',
			accessor : (items) => {
				const { author = {} } = items || {};
				return (
					<div className={styles.tags}>
						{startCase(author?.name) || '--'}
					</div>
				);
			},
		},
		{
			Header   : 'UPDATED AT',
			accessor : (items) => (
				<div className={styles.tags}>
					{format(items.updated_at, 'dd MMM yy') || '--'}
				</div>
			),
		},
		{
			Header   : 'ACTIONS',
			accessor : (item) => (
				<div className={styles.button_container}>
					{activeTopic === 'inactive' ? (
						<Button
							themeType="secondary"
							size="sm"
							style={{ marginRight: 8 }}
							onClick={() => onClickEditTopic(item)}
						>
							RESTORE

						</Button>
					) : (
						<>
							<Popover
								placement="top"
								interactive
								visible={showPopOver === item?.id}
								styles={{ marginRight: '20px' }}
								render={(
									<PopOverContent
										source="topic"
										onCLickYesButton={() => onClickDeleteIcon(item)}
										onClickNoButton={() => onClickNoButton()}
										loading={updateApiLoading}
									/>
								)}
							>

								<div className={styles.delete_button}>
									<IcMDelete
										height={20}
										width={20}
										onClick={
								() => { setShowPopOver(() => (showPopOver === item?.id ? null : item?.id)); }
}
									/>
								</div>

							</Popover>

							<Button
								themeType="secondary"
								size="sm"
								style={{ marginRight: 8 }}
								onClick={() => onClickEditTopic(item)}
							>
								EDIT

							</Button>
						</>
					)}
				</div>
			),
		},
	];
	return { listColumns };
}

export default topicListColumns;
