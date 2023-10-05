import React, { useState } from "react";
import HyperFormula from "hyperformula";
import { EmployeesContext } from "./employee.context";
import {
	initializeHF,
	initializeNamedExpressions,
	initHFValues,
	setA1Value,
} from "./employee.hf";
import { EmployeeRow, Sheet2 } from "./types";
import Papa from "papaparse";

/** input data */
// import { GetData, tableData } from "./fixtures/data";

export type EmployeesProviderProps = React.PropsWithChildren<{}>;

const TOTAL_EXPRESSIONS = ["=SUM(Year_1)", "=SUM(Year_2)"];
const EMPLOYEE_SHEET_ID = "employeeSheet";
const sheet3id = "Sheet3";

export const EmployeesStateProvider = ({
	children,
}: EmployeesProviderProps) => {
	const hfReference = React.useRef<{
		hf: HyperFormula;
		sheetId: number;
		sheetName: string;
	}>();
	const [withCalculations, setWithCalculations] = useState<boolean>();
	const [valuesChanging, setValuesChanging] = useState<boolean>();
	const [employees, setEmployees] = useState<EmployeeRow[]>([]);
	const [totals, setTotals] = useState<React.ReactText[]>([]);
	const [hf, setHf] = useState<HyperFormula | null>();

	const setCalculationsFlag = (calculationsFlag: boolean) => {
		setWithCalculations(calculationsFlag);
		if (!calculationsFlag && hf) setA1Value(hf, 13);
	};

	const setA1ValueTo20 = () => {
		console.log("here");
		if (hf) {
			setValuesChanging(true);
			setA1Value(hf, 20);
			setValuesChanging(false);
		}
	};

	// React.useEffect(() => {
	// 	GetData();
	// }, []);

	/** INITIALIZE */
	React.useEffect(() => {
		const { hf, sheetId, sheetName, sheet3Name, sheetId3 } = initializeHF(
			EMPLOYEE_SHEET_ID,
			sheet3id
		);

		console.log(
			"sheetId, sheetName, sheet3Name, sheetId3",
			sheetId,
			sheetName,
			sheet3Name,
			sheetId3
		);
		setHf(hf);
		// console.log("tableData", tableData)
		hfReference.current = { hf, sheetId: sheetId as number, sheetName };

		// Fill the HyperFormula sheet with data.
		setValuesChanging(true);
		(async () => {
			let tableData: EmployeeRow[] = [];
			Papa.parse("data/benchmark_data_1.csv", {
				// header: false,
				// skipEmptyLines: true,
				dynamicTyping: true,
				download: true,
				// step: (row) => {
				//     console.log("Row:", row.data);
				// }
				complete: (result) => {
					console.log("result", result);
					if (result.data && result.data.length > 0) {
						result.data.forEach((row: any) => {
							const newRow: EmployeeRow = row;
							tableData.push(newRow);
						});
					}
					console.log("tableData.length 2", tableData.length);
					initHFValues(
						hf,
						sheetId as number,
						tableData.slice(0, 1000)
					);
					// initHFValues(hf, sheetId as number, tableData);
					setValuesChanging(false);
				},
			});

			let sheet3Data: Sheet2[] = [];
			Papa.parse("data/benchmark_data_2.csv", {
				// header: false,
				// skipEmptyLines: true,
				dynamicTyping: true,
				download: true,
				// step: (row) => {
				//     console.log("Row:", row.data);
				// }
				complete: (result) => {
					console.log("result", result);
					if (result.data && result.data.length > 0) {
						result.data.forEach((row: any) => {
							const newRow: Sheet2 = row;
							sheet3Data.push(newRow);
						});
					}
					console.log("tableData.length 2", sheet3Data.length);
					initHFValues(hf, sheetId3 as number, sheet3Data);
					// initHFValues(hf, sheetId as number, tableData);
					// setValuesSet(true);
				},
			});
		})();

		// Add named expressions
		// initializeNamedExpressions(hf, sheetName);
	}, []);

	React.useEffect(() => {
		if (valuesChanging) {
			return;
		}

		if (!hfReference.current) {
			return;
		}

		const { hf, sheetId } = hfReference.current;

		if (withCalculations) {
			const start = Date.now();
			const calculatedValues = hf.getSheetValues(sheetId) as number[][];
			const end = Date.now();
			console.log("done calculatedValues, took time: ", end - start);

			// format the display of numbers
			const formmatedValues = calculatedValues.map((row: number[]) => {
				// console.log("calculated row", row);
				return row.map((cell: any) => {
					switch (typeof cell) {
						case "number":
							return cell.toFixed(2);
						case "object":
							if (cell != null) {
								return cell.message;
							}
						default:
							return cell;
					}
					// if (!isNaN(cell)) {
					// 	// if (typeof cell == HyperFormula.DetailedCellError) {
					// 	// } else {
					// 	// }
					// 	return cell.toFixed(2);
					// }
					// return cell;
				});
			});

			setEmployees(formmatedValues as EmployeeRow[]);
			// setTotals(
			// 	TOTAL_EXPRESSIONS.map((expression) =>
			// 		(
			// 			hf.calculateFormula(expression, sheetId) as number
			// 		).toFixed(2)
			// 	)
			// );
		} else {
			setEmployees(hf.getSheetSerialized(sheetId) as EmployeeRow[]);
			// setTotals(TOTAL_EXPRESSIONS);
		}
	}, [hfReference, withCalculations, valuesChanging]);

	return (
		<EmployeesContext.Provider
			value={{
				employees,
				totals,
				setCalculationsFlag,
				setA1ValueTo20,
			}}
		>
			{children}
		</EmployeesContext.Provider>
	);
};
