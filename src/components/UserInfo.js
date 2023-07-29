class UserInfo {
  constructor({
    profNameSelector,
    profAboutSelector,
    profAvatarSelector,
    // userID,
  }) {
    this._profName = document.querySelector(profNameSelector);
    this._profAbout = document.querySelector(profAboutSelector);
    this._profAvatar = document.querySelector(profAvatarSelector);
    // this._userID = userID;
  }

  // Get profile info from page.
  getProfileInfo() {
    return {
      name: this._profName.textContent,
      about: this._profAbout.textContent,
    };
  }

  // Add profile info to page.
  setProfileInfo({ name, about }) {
    this._profName.textContent = name;
    this._profAbout.textContent = about;

    // console.log(name);
    // console.log(about);
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
    // console.log(imgLink);
  }
}
export default UserInfo;
