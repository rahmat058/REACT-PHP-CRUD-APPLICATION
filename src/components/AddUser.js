import React, { Component } from "react";
import { AppContext } from "../Context";

class AddUser extends Component {
  static contextType = AppContext;

  state = {
    user_name: "",
    user_gender: "",
  };

  insertUser = (event) => {
    this.context.insertUser(
      event,
      this.state.user_name,
      this.state.user_gender
    );
  };

  render() {
    return (
      <form onSubmit={this.insertUser}>
        <div className='form-row'>
          <div className='form-group col-sm-6'>
            <label className='font-weight-bold'>Name</label>
            <input
              type='text'
              name='user_name'
              className='form-control'
              placeholder='Name'
              onChange={(e) => this.setState({ user_name: e.target.value })}
            />
          </div>
          <div className='form-group col-sm-6 d-flex flex-column'>
            <label className='font-weight-bold'>Gender</label>
            <div className='flex-row'>
              <input
                type='radio'
                id='male'
                name='user_gender'
                value='male'
                onChange={(e) => this.setState({ user_gender: e.target.value })}
              />
              <label htmlFor='male' className='ml-2'>
                Male
              </label>
            </div>
            <br />
            <div className='flex-row'>
              <input
                type='radio'
                id='female'
                name='user_gender'
                value='female'
                onChange={(e) => this.setState({ user_gender: e.target.value })}
              />
              <label htmlFor='female' className='ml-2'>
                Female
              </label>
            </div>
            <br />
            <div className='flex-row'>
              <input
                type='radio'
                id='other'
                name='user_gender'
                value='other'
                onChange={(e) => this.setState({ user_gender: e.target.value })}
              />
              <label htmlFor='other' className='ml-2'>
                None
              </label>
            </div>
          </div>

          <div className='form-group col-sm-12 text-right'>
            <button type='submit' className='btn btn-primary'>
              Add user
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default AddUser;
