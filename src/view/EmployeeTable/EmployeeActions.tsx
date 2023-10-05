import * as React from "react";
import { EmployeesContext } from "../../lib/employee";

import "./EmployeeActions.scss";

export type EmployeeActionsProps = {};

export const EmployeeActions: React.FC<EmployeeActionsProps> = () => {
	const { setCalculationsFlag, setA1ValueTo20 } =
		React.useContext(EmployeesContext);

	const handleClickRunCalculations = () => {
		setCalculationsFlag(true);
	};
	const handleClickResetCalculations = () => {
		setCalculationsFlag(false);
	};

	return (
		<>
			<button className="button" onClick={handleClickRunCalculations}>
				Run calculations
			</button>
			<button
				className="button button-outline"
				onClick={handleClickResetCalculations}
			>
				Reset
			</button>
			<button className="button button-outline" onClick={setA1ValueTo20}>
				Set A1 to 20
			</button>
		</>
	);
};
