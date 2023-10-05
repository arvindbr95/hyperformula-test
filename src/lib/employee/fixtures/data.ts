// import { EmployeeRow } from "../types";
// import Papa from "papaparse";
// // import csvData from "./";

// const tableData: EmployeeRow[] = [];

// async function GetData() {
// 	Papa.parse("data/benchmark_data_1.csv", {
// 		// header: false,
// 		// skipEmptyLines: true,
// 		dynamicTyping: true,
// 		download: true,
// 		// step: (row) => {
// 		//     console.log("Row:", row.data);
// 		// }
// 		complete: (result) => {
// 			console.log("result", result);
// 			if (result.data && result.data.length > 0) {
// 				result.data.forEach((row: any) => {
// 					const newRow: EmployeeRow = row;
// 					tableData.push(newRow);
// 				});
// 			}
// 			console.log("tableData.length 2", tableData.length);
// 		},
// 	});
// 	// console.log("tableData.length", tableData.length);
// 	// return tableData.slice(0, 10);
// }

// async function fetchCsv() {
// 	const response = await fetch("data/benchmark_data_1.csv");
// 	const reader = response.body?.getReader();
// 	const result = await reader?.read();
// 	const decoder = new TextDecoder("utf-8");
// 	const csv = await decoder.decode(result?.value);
// 	console.log(csv.length);
// 	return csv;
// }

// export { GetData, tableData };
