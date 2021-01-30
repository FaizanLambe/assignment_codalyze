import React, { Component } from 'react';
import { AgGridReact} from 'ag-grid-react';
import GenderRenderer from './Renderers/GenderRenderer';
import CountryRenderer from './Renderers/CountryRenderer';
import CityRenderer from './Renderers/CityRenderer';
import DeleteRenderer from './Renderers/DeleteRenderer';
import './App.css'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "Id", field: "Id", width: 140, checkboxSelection: true, sortable: true, filter: true, editable: true, resizable: true },
                { headerName: "Name", field: "Name", width: 140, sortable: true, filter: true, editable: true, resizable: true },
                { headerName: "Email", field: "Email", width: 200, sortable: true, filter: true, editable: true, resizable: true },
                { headerName: "Gender", field: "Gender", cellRenderer: 'genderRenderer', cellRendererParams: { onGenderChange: this.onGenderChange }, width: 140, sortable: true, filter: true, resizable: true },
                { headerName: "DOB", field: "DOB", width: 140, sortable: true, filter: true, editable: true, resizable: true },
                { headerName: "Country", field: "Country", cellRenderer: 'countryRenderer', cellRendererParams: { onCountryChange: this.onCountryChange }, width: 140, sortable: true, filter: true, resizable: true },
                { headerName: "City", field: "City", cellRenderer: 'cityRenderer', cellRendererParams: { onCityChange: this.onCityChange }, width: 140, sortable: true, filter: true, resizable: true},
                { headerName: " ", field: "Delete", cellRenderer: 'deleteRenderer' }
            ],
            rowData: [
                { "Id": 1, "Name": "Faizan", "Email": "faizan@gmail.com", "Gender": "", "DOB": "03-03-1998", "Country": "India", "City": "Mumbai" },
                { "Id": 2, "Name": "Aditi", "Email": "aditi@gmail.com", "Gender": "Female", "DOB": "21-06-1994", "Country": "India", "City": "Mira" },
                { "Id": 3, "Name": "Kiran", "Email": "kiran@gmail.com", "Gender": "Male", "DOB": "13-12-1997", "Country": "US", "City": "ManHatton" },
            ],
            suppressAggFuncInHeader: true,

            frameworkComponents: {
                genderRenderer: GenderRenderer,
                countryRenderer: CountryRenderer,
                cityRenderer:CityRenderer,
                deleteRenderer: DeleteRenderer
            }
        }
        this.onGenderChange = this.onGenderChange.bind(this)
        this.onCountryChange = this.onCountryChange.bind(this)
        this.onCityChange = this.onCityChange.bind(this)
    }

    onGenderChange = (gender) => {
        this.setState(()=>({Gender: this.state.rowData.push(gender)}));
        console.log("Gender Change", gender)
    }

    onCountryChange = (country) => {
        console.log("Country Change", country)
    }

    onCityChange = (city) => {
        console.log("City Change", city)
    }

    componentDidMount() {
        const json = localStorage.getItem('dat')
        const items = JSON.parse(json)
        this.setState(() => ({ items }))
      }
      componentDidUpdate(prevProps, prevStates){
        const json = JSON.stringify(this.state.rowData)
        localStorage.setItem('dat', json)
      }

    deleteSelected = () => {
        const selectedData = this.gridApi.getSelectedRows()
        this.gridApi.applyTransaction({ remove: selectedData })
    }

    deleteNonSelected = () => {
        let row_data = [];
        this.gridApi.forEachNode(node => row_data.push(node.data));

        const selectedData = this.gridApi.getSelectedRows()
        if (selectedData.length !== 0) {
            selectedData.map(item => {
                row_data.map((obj, index) => {
                    if(item.Name === obj.Name) {
                        row_data.splice(index, 1);
                        console.log('row_data', row_data);
                    }
                    return 0;
                });
                return 0;
            });
        }
        this.gridApi.applyTransaction({ remove: row_data })
    }

    submitData = () => {
        
        localStorage.setItem('dat',JSON.stringify(this.state.rowData))
        var c=JSON.parse(localStorage.getItem('dat'));
        console.log(c);
        alert("Data submitted");

    }

    addData = () => {

        const inp = this.gridApi.applyTransaction({ add: [{"Id": '' , "Name": "", "Email": "", "Gender": "", "DOB": "", "Country": "", "City": ""}] })
        
    }

    render() {
        return (
            <div className="gg">
                <div className="ag-theme-alpine" style={{ height: 400, width: 1245 }}>
                    <button className="operationBtn" onClick={this.addData}>Add Row</button>
                    <button className="operationBtn" onClick={this.deleteSelected}>Delete Selected Rows</button>
                    <button className="operationBtn" onClick={this.deleteNonSelected}>Delete Non Selected Rows</button>
                    <button className="operationBtn" onClick={this.submitData}>Submit</button>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        frameworkComponents={this.state.frameworkComponents}
                        onGridReady={params => this.gridApi = params.api}
                        rowSelection='multiple'
                    />
                </div>
                <b>Submitted Data</b>
                <p></p>
            </div>
        )
    }
}

export default App;