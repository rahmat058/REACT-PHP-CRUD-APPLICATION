import React, { Component } from "react";
import { AppContext } from "../Context";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { ascSort, descSort } from "../helper";
class GetUsers extends Component {
  static contextType = AppContext;

  state = {
    isNameSorted: false,
  };

  componentDidMount() {
    this.context.get_users();
  }

  handleUpdate = (id) => {
    this.context.handleUpdate(id, this.name.value);
  };

  sortByName = (key) => {
    this.setState({
      isNameSorted: !this.state.isNameSorted,
    });

    if (this.state.isNameSorted) {
      const result = this.context.all_users.sort(ascSort(key));
      return result;
    } else {
      const result = this.context.all_users.sort(descSort(key));
      return result;
    }
  };

  render() {
    let allUsers;
    let mainData;

    allUsers = this.context.all_users.map(({ id, name, isEditing }) => {
      return isEditing === true ? (
        <tr key={id}>
          <td>
            <input
              className="form-control"
              type="text"
              ref={(item) => (this.id = item)}
              defaultValue={id}
              disabled
            />
          </td>
          <td>
            <input
              className="form-control"
              type="text"
              ref={(item) => (this.name = item)}
              defaultValue={name}
            />
          </td>
          <td className="d-flex">
            <button
              className="btn btn-success mr-2"
              onClick={() => this.handleUpdate(id)}
            >
              Save
            </button>
            <button
              onClick={() => this.context.cancelEdit(id)}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </td>
        </tr>
      ) : (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>
            <button
              className="btn btn-dark mr-2"
              onClick={() => this.context.editMode(id)}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });

    if (this.context.all_users.length > 0) {
      mainData = (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th
                className="d-flex cursor-pointer"
                onClick={() => this.sortByName("name")}
              >
                Name
                <span className="d-flex flex-column ml-2">
                  <FaAngleUp color="#4C7CFF" />
                  <FaAngleDown color="#4C7CFF" />
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{allUsers}</tbody>
        </table>
      );
    } else {
      mainData = (
        <div className="alert alert-light" role="alert">
          <h4 className="alert-heading">No User Found!</h4>
          <hr />
          <p>Please Insert Some Users.</p>
        </div>
      );
    }
    return <>{mainData}</>;
  }
}
export default GetUsers;
