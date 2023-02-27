// import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

/* eslint-disable */
import countries from '../../../../../../.data-store/constants/countries.json';
import WORK_SCOPES_OPTIONS from '../CreateAudienceForm/utils/workScopeMappings';

import styles from './styles.module.css';

function audienceListColumns({ onClickEdit, onClickDeleteIcon }) {

	const listColumns = [
		{
			Header   : 'NAME',
			accessor : (items) => (
				<div className={styles.question}>
					{startCase(items?.name) || '--'}
				</div>
			),
		},
		{
			Header   : 'FUNCTION',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.auth_function) || '--'}
				</div>
			),
		},
		{
			Header   : 'SUB FUNCTION',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.auth_sub_function) || '--'}
				</div>
			),
		},
		{
			Header   : 'COGO ENTITY',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.cogo_entity_name) || '--'}
				</div>
			),
		},
		{
			Header   : 'COUNTRY',
			accessor : (item) => {
				const selectedCountry = countries.find((country)=> country.id===item.country_id)
				return (
				<div className={styles.tags}>
					{selectedCountry?.name||'--'}
				</div>)
			},
		},
		{
			Header   : 'PERSONA',
			accessor : (item) => {
				const selectedPersona = WORK_SCOPES_OPTIONS.find((element)=> element?.value===item.persona)
				return (
				<div className={styles.tags}>
					{selectedPersona?.label||'--'}
				</div>)
			},
		},
		{
			Header   : 'PLATFORM',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.platform) || '--'}
				</div>
			),
		},
		{
			Header   : 'ACTIONS',
			accessor : (item) => (
				<div className={styles.button_container}>
					<div className={styles.delete_button}>
						<IcMDelete height={20} width={20} onClick={() => onClickDeleteIcon(item)} />
					</div>
					{/* <Button
						themeType="secondary"
						size="sm"
						style={{ marginRight: 8 }}
						onClick={() => onClickEdit(item)}
					>
						EDIT

					</Button> */}
				</div>
			),
		},
	];
	return { listColumns };
}

export default audienceListColumns;
