import { Group } from "../interfaces/group";
import { User } from "../interfaces/user";
import { Filter } from "../types/filter";

export const filterGroups = (groups: Group[], filter: Filter) => {
  const { closed, color, user } = filter;

  return groups
    .filter((item) => {
      if (closed === undefined) return item;
      if (closed === item.closed) return item;
    })
    .filter((item) => {
      if (color === "все" || color === undefined) return item;
      if (color === item.avatar_color) return item;
    })
    .filter((item) => {
      if (user === "все" || user === undefined) return item;
      if (
        item.friends?.some(
          (current) => `${current.first_name}${current.last_name}` === user
        )
      ) {
        return item;
      }
    });
};

export function getUsers(groups: Group[]) {
  return Object.values(
    groups?.reduce<Record<string, User>>(
      (accumulator, item) => {
        if (item.friends) {
          item.friends.map((friend) => {
            accumulator[friend.first_name + friend.last_name] = friend;
          });
        }
        return accumulator;
      },
      {
        all: {
          first_name: "все",
          last_name: "",
        },
      }
    )
  );
}

export function getColors(groups: Group[]) {
  return Object.values(
    groups?.reduce<Record<string, string>>(
      (accumulator, item) => {
        if (item.avatar_color) {
          accumulator[item.avatar_color] = item.avatar_color;
        }
        return accumulator;
      },
      { все: "все" }
    )
  );
}
