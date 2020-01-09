import React, { Component } from "react";
import { Link } from "react-router-dom";
class Clients extends Component {
  state = {
    clients: [
      {
        id: "0",
        name: "Isaac",
        email: "Email",
        balance: "1000"
      }
    ]
  };
  render() {
    const { clients } = this.state;

    if (clients) {
      return (
        <div className="row">
          <div className="col-md-6">
            <h2>Clients</h2>
          </div>
          <div className="col-md-6"></div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}
export default Clients;
