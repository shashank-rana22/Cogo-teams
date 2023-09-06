import { cl } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

interface StepItem {
	title: string;
	key: string;
}

interface SubStepProps {
	num: string;
	description: string;
	stepCompleted?: boolean;
}

function SubStep({
	num = 0,
	description = '',
	stepCompleted = false,
}: SubStepProps) {
	return (
		<div
			className={cl`
				${styles.step}
				${stepCompleted ? styles.step_completed : ''}
				${cl.ns('stepper_step')}
				${stepCompleted ? cl.ns('stepper_step_completed') : ''}
			`}
			role="presentation"
		>
			<div
				className={cl`
					${styles.sub_step_wrapper}
					${cl.ns('stepper_step_wrapper')}
				`}
			>
				{stepCompleted ? (
					<IcMTick width={20} height={20} />
				) : num}

			</div>
			<div
				className={cl`
					${styles.text}
					${cl.ns('stepper_text')}`}
			>
				{description}
			</div>
		</div>
	);
}

interface StepProps {
	num: string;
	description: string;
	items : StepItem[];
	stepCompleted?: boolean;
	stepActive?: boolean;
	onClick?: () => void;
	click?: boolean;
}

function Step({
	num = 0,
	description = '',
	stepCompleted = false,
	items = [],
	stepActive = false,
	is_sub = false,
	subid = 0,
	onClick,
	click = false,
}: StepProps) {
	return (
		<div className={cl`
		${stepActive ? styles.step_active : ''}
	`}
		>
			<div
				className={cl`
				${styles.step}
				${click ? styles.clickable_step : ''}
	
				${stepCompleted ? styles.step_completed : ''}
				${cl.ns('stepper_step')}
				${stepCompleted ? cl.ns('stepper_step_completed') : ''}
			`}
				role="presentation"
				onClick={onClick}
			>
				<div
					className={cl`
					${styles.step_wrapper}
					${cl.ns('stepper_step_wrapper')}
				`}
				>
					{stepCompleted ? (
						<IcMTick width={20} height={20} />
					) : num}

				</div>
				<div
					className={cl`
					${styles.text}
					${cl.ns('stepper_text')}`}
				>
					{description}
				</div>

			</div>
			<div className={styles.subtask}>
				<div
					className={cl`
									${styles.step_connector}
									${styles.step_connector_inactive}
									${cl.ns('stepper_step_connector')}
									${cl.ns('stepper_step_connector_inactive')}
								`}
				/>
				<div>
					{
			items.length > 0 ? items.map((data, index) => (
				is_sub ? (
					<div key={data.title}>
						{' '}
						<SubStep num={index} description={data.title} stepCompleted={index < subid} />
						{' '}
					</div>
				)
					: (
						<div key={data.title}>
							{' '}
							<SubStep num={index} description={data.title} />
							{' '}
						</div>
					)
			)) : null
			}
				</div>
			</div>
		</div>
	);
}

interface StepperProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	active?: string; // should contain id
	setActive: (key: string) => void;
	items: StepItem[];
	shadowed?: boolean;
	// arrowed?: boolean;
	direction?: 'horizontal' | 'vertical';
	enableForwardClick?: boolean;
}

function Stepper({
	id = 0,
	className = '',
	style,
	active = 1,
	setActive,
	items = [],
	is_sub = false,
	subid = 0,
	shadowed = false,
	// arrowed = false,
	direction = 'horizontal',
	enableForwardClick = false,
}: StepperProps) {
	// const steps = items.length;

	return (
		<div
			id={id}
			className={cl`
				${className}
				${styles.container}
				${cl.ns('stepper_container')}
				${cl.preset('direction', direction)}
				${(shadowed && direction !== 'vertical') ? styles.shadowed : ''}
			`}
			style={style}
		>

			{items.map((item, i) => {
				const activeIndex = active;

				return (
					<div
						className={cl`
							${styles.step_map}
							${cl.ns('stepper_step_map')}
						`}
						key={item.key}
					>

						<Step
							num={(i + 1).toString()}
							description={item.title}
							items={item.subtask ? item.subtask : []}
							is_sub={is_sub}
							subid={subid}
							stepCompleted={i < activeIndex}
							stepActive={i === activeIndex}
							onClick={() => {
								if (i <= activeIndex || enableForwardClick) {
									setActive(item.key);
								}
							}}
							click={enableForwardClick}
						/>
						{/*	{(!(arrowed && direction !== 'vertical') && i + 1 < steps) && (
							<div
								className={cl`
									${styles.step_connector}
									${!(i < activeIndex) ? styles.step_connector_inactive : ''}
									${cl.ns('stepper_step_connector')}
									${!(i < activeIndex) ? cl.ns('stepper_step_connector_inactive') : ''}
								`}
							/>
						)}
						 {((arrowed && direction !== 'vertical') && i + 1 < steps)
							&& (
								<div>
									<IcMArrowRight
										className={cl`
										${styles.arrow}
										${i === activeIndex ? styles.arrow_active : ''}
										${i < activeIndex ? styles.arrow_passed : ''}
										${cl.ns('stepper_arrow')}
									`}
									/>
								</div>
							)} */}
					</div>
				);
			})}
		</div>
	);
}

export default Stepper;
