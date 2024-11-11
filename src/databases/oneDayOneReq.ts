class OneRequestOneDayDb {
  userData: Map<string, number>;

  constructor() {
    this.userData = new Map<string, number>();
    this.checkAndReset();
  }
  async initialize() {}

  async addUserRequest(userId: string) {
    if (!this.userData.has(userId)) {
      this.userData.set(userId, 0);
    }
  }

  async clearData() {
    this.userData.clear();
  }

  async hasReachedRequestLimit(userId: string) {
    const requestCount = this.userData.get(userId) || 0;
    return requestCount >= 3;
  }

  async saveRequestData(userId: string) {
    const requestCount = this.userData.get(userId) || 0;
    if (requestCount < 3) {
      this.userData.set(userId, requestCount + 1);
    }
  }

  checkAndReset() {
    setInterval(() => {
      this.clearData();
    }, 1 * 60 * 60 * 1000);
  }
}
const reqDB = new OneRequestOneDayDb();

export default reqDB;
