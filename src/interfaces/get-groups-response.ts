import { Group } from "./group";

export interface GetGroupsResponse {
  result: 1 | 0;
  data?: Group[];
}
