import { memo } from "react";
import { Group } from "../../interfaces/group";
import { GroupItem } from "../group/group-item";

type ListProps = {
  groups?: Group[];
};

export const List = memo(({ groups }: ListProps) => {
  return (
    <>
      {groups &&
        groups.map((item) => (
          <GroupItem
            key={item.id}
            name={item.name}
            avatar_color={item.avatar_color}
            closed={item.closed}
            members_count={item.members_count}
            friends={item.friends}
          />
        ))}
    </>
  );
});
