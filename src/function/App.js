import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {

  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const rowData = [
    { "Id": 1, "Name": "Faizan", "Email": "faizan@gmail.com", "Gender": "Male", "DOB": "03-03-1998", "Country": "India", "City": "Mumbai" },
    { "Id": 2, "Name": "Aditi", "Email": "aditi@gmail.com", "Gender": "Female", "DOB": "21-06-1994", "Country": "India", "City": "Mira" },
    { "Id": 3, "Name": "Kiran", "Email": "kiran@gmail.com", "Gender": "Male", "DOB": "13-12-1997", "Country": "US", "City": "ManHatton" },
  ];

  const columnDefs = [
    { headerName: "Id", field: "Id", width: 140, sortable: true, filter: true , editable: true, resizable: true },
    { headerName: "Name", field: "Name", width: 140, sortable: true, filter: true , editable: true, resizable: true },
    { headerName: "Email", field: "Email", width: 140, sortable: true, filter: true , editable: true, resizable: true },
    { headerName: "Gender", field: "Gender", callRenderer: 'genderComponent',cellRendererParams: 'onGenderChange', width: 140, sortable: true, filter: true , editable: true, resizable: true },
    { headerName: "DOB", field: "DOB", width: 140, sortable: true, filter: true , editable: true, resizable: true },
    { headerName: "Country", field: "Country", width: 140, sortable: true, filter: true , editable: true, resizable: true },
    { headerName: "City", field: "City", width: 140, sortable: true, filter: true , editable: true, resizable: true , resizable: true},
    { headerName: " ", field: "checkboxBtn", checkboxSelection: true, headerCheckboxSelection: true, pinned: "left", width: 50 }
  ];

  const handleGridReady = params => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.sizeColumnsToFit()
  };

  const deleteSelected = () =>{
    const selectedRows = gridApi.getSelectedRows()
    gridApi.applyTransaction({remove: selectedRows})
  }

  const showData = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.Name + ' ' + node.Country).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  const genderComponent= props => {
    const[gender, setGender] = props.value;

    const onGenderChange = (event) => {
        props.onGenderChange(event.target.value);
        setGender(event.target.value);
    }
    return(
        <div>
            <select value={gender} onChange={onGenderChange}>
                <option value="red"> red </option>
                <option value="black"> black </option>
                <option value="green"> green </option>
                <option value="yellow"> yellow </option>
                <option value="violet"> violet </option>
            </select>
        </div>
    )
}

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 1050 }}>
      <button onClick={() => gridApi.applyTransaction({ add: [{}] })}>Add Row</button>
      <button onClick={deleteSelected}>Delete Selected Rows</button>
      <button onClick={showData}>Show Rows</button>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        frameworkComponents={{genderComponent}}
        onGridReady={handleGridReady}
        rowSelection='multiple'
      />
    </div>
  );
};

export default App;