import React from "react";
import Axios from "./axios_instance.js";

import { toast } from "react-toastify";

toast.configure();
class Actions extends React.Component {
  state = {
    users: [],
    searchVal: ''
  };

  successMessage = (message) =>
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });

  // FETCH USERS FROM DATABASE
  fetchUsers = () => {
    Axios.get("/list.php")
      .then(({ data }) => {
        if (data.status === "success") {
          this.setState({
            users: data.data.rows.reverse(),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ON EDIT MODE
  editMode = (id) => {
    let users = this.state.users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });

    this.setState({
      users,
    });
  };

  //CANCEL EDIT MODE
  cancelEdit = (id) => {
    let users = this.state.users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    this.setState({
      users,
    });
  };

  // UPDATE USER
  handleUpdate = (id, user_name, user_email) => {
    Axios.post("http://localhost/php-react/update-user.php", {
      id: id,
      user_name: user_name,
      user_email: user_email,
    })
      .then(({ data }) => {
        if (data.success === 1) {
          let users = this.state.users.map((user) => {
            if (user.id === id) {
              user.user_name = user_name;
              user.user_email = user_email;
              user.isEditing = false;
              return user;
            }
            return user;
          });
          this.setState({
            users,
          });
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // INSERT USER
  insertUser = (event, user_name, user_gender) => {
    event.preventDefault();
    event.persist();
    Axios.post("/submit_form.php", {
      user_name: user_name,
      user_gender: user_gender,
    })
      .then(
        function ({ data }) {
          if (data.status === "success") {
            this.successMessage(data.messages[0]);
            event.target.reset();
          } else {
            alert(data.msg);
          }
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default Actions;
