class UserInfo {
  constructor({
    profNameSelector,
    profDescSelector,
    profAvatarSelector,
    userID,
  }) {
    this._profName = document.querySelector(profNameSelector);
    this._profDesc = document.querySelector(profDescSelector);
    this._profAvatar = document.querySelector(profAvatarSelector);
    this._userID = userID;
  }

  // Get profile info from page.
  getProfileInfo() {
    return {
      name: this._profName.textContent,
      description: this._profDesc.textContent,
      // avatar: this._profAvatar.src,
      userID: this._userID,
    };
  }

  // Add profile info to page.
  setProfileInfo({ name, description, avatar, userID }) {
    this._profName.textContent = name;
    this._profDesc.textContent = description;
    this._profAvatar.src = avatar;
    this._userID = userID;

    console.log(userID);
  }

  getMyID() {
    return this._userID;
  }

  setMyID({ userID }) {
    this._userID = userID;
    console.log(userID);
  }

  getAvatar() {
    return this._profAvatar.src;
  }

  setAvatar(imgLink) {
    this._profAvatar.src = imgLink;
    console.log(imgLink);
  }
}
export default UserInfo;
