class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(jobSelector);
  }

  // Get profile info from page.
  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._profileDescription.textContent,
    };
  }

  // Add profile info to page.
  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._profileDescription.textContent = description;
  }
}

export default UserInfo;
