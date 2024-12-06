import React from 'react'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const {user} = useSelector(state => state.user);
  return (
    <div className="account_components">
      <h3>My Profile</h3>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          disabled
          value={user.userName}
          onChange={(e) => e.target.value}
        />
      </div>
      </div>
  )
}

export default MyProfile
