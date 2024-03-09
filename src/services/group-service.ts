import { GetGroupsResponse } from "../interfaces/get-groups-response";

export class GroupService {
  static host = "http://localhost:5173";

  static async getGroups() {
    const url = `${this.host}/groups.json`;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(url);

    if (!response.ok) return Promise.reject(new Error("Bad Response"));

    const data: GetGroupsResponse = {
      result: 1,
      data: await response.json(),
    };

    if (data.result === 0 || !data.data)
      return Promise.reject(new Error("Bad Result"));

    return data;
  }
}
