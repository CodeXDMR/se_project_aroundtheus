class UserInfo {
  constructor({ profNameSelector, profAboutSelector, profAvatarSelector }) {
    this._profAvatar = document.querySelector(profAvatarSelector);
    this._profName = document.querySelector(profNameSelector);
    this._profAbout = document.querySelector(profAboutSelector);
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
  }

  getAvatar() {
    return this._profAvatar.src;
  }

  setAvatar(imgLink) {
    this._profAvatar.src = imgLink;
  }

  openModal() {}
}
export default UserInfo;
