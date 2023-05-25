export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileJob =  document.querySelector(configInfo.profileJobSelector);
    this.profileAvatar = document.querySelector(configInfo.profileAvatarSelector);
  }

  getUserInfo() {
    return {username: this._profileName.textContent, job: this._profileJob.textContent}
  }
  /*можно сделать 3 публичных метода со своей зоной онветственности*/
  setUserInfo({name, job, avatar}) {
    this.profileAvatar.src = avatar;
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
