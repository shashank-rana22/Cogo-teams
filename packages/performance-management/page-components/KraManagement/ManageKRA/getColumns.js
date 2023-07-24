import { Popover } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import PopOverContent from './PopoverContent';
import styles from './styles.module.css';

const getColumns = ({ handleEditKRA, showPopOver, setShowPopOver, deleteKRALoading, onClickDeleteKRA }) => [
	{
		Header   : 'KRA NAME',
		accessor : (item) => (
			<div>
				{startCase(item?.kra_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'KRA DESCRIPTION',
		accessor : (item) => (
			<div>
				{startCase(item?.kra_description) || '-'}
			</div>
		),
	},
	{
		Header   : 'OPERATION KEY',
		accessor : (item) => (
			<div>
				{startCase(item?.operation_key) || '-'}
			</div>
		),
	},
	{
		Header   : 'ACTIONS',
		accessor : (item) => (
			<div className={styles.button_wrapper}>
				<div className={styles.edit_wrapper}>
					<IcMEdit
						height={16}
						width={16}
						onClick={() => handleEditKRA(item?.id)}
					/>

				</div>

				<Popover
					placement="top"
					interactive
					visible={showPopOver === item?.id}
					styles={{ marginRight: '20px' }}
					render={(
						<PopOverContent
							loading={deleteKRALoading}
							onCLickYesButton={() => onClickDeleteKRA(item?.id)}
							onClickNoButton={() => setShowPopOver(null)}
						/>
					)}
				>

					<div className={styles.delete_button}>
						<IcMDelete
							height={20}
							width={20}
							onClick={() => {
								setShowPopOver(() => (showPopOver === item?.id ? null : item?.id));
							}}
						/>
					</div>
				</Popover>

			</div>

		),
	},
];

export default getColumns;
