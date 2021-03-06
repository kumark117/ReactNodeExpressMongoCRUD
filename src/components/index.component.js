import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {business: []};
      this.getALL = this.getALL.bind(this);
      this.tabRow = this.tabRow.bind(this);
  //    alert("Index constr")
    }
    componentDidMount(){
//      alert("Index componentDidMount");
      this.getALL();
    }

    getALL() {
      let that = this;
      axios.get('http://localhost:4000/biz')
        .then((response) => {
          that.setState({ business: response.data })
          }
        )
        .catch(function (error) {
          console.log(error);
        })
    }

    tabRow(){
      let that = this;
    //  alert("tabRow:: that.state = "+JSON.stringify(that.state));

      return this.state.business.map(function(object, i){
          return <TableRow obj={object} key={i} history={that.props.history} fnRefresh={that.getALL}/>;
      });
    }

    render() {
      //alert("Index: render")
      return (
        <div>
          <h3 align="center">Business List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Person</th>
                <th>Business</th>
                <th>GST Number</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }
