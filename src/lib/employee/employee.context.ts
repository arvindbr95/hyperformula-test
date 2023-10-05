import { createContext } from "react";
import { EmployeeRow } from "./types";

export type EmployeesContextProps = {
	employees: EmployeeRow[];
	totals: React.ReactText[];
	setCalculationsFlag: (calculationsFlag: boolean) => void;
	setA1ValueTo20: () => void;
};

export const EmployeesContext = createContext<EmployeesContextProps>({
	employees: [],
	totals: [],
	setCalculationsFlag: () => null,
	setA1ValueTo20: () => null,
});
