import { useState } from "react";
import { Avatar, SimpleCell, Group, Header } from "@vkontakte/vkui";
import { Group as GroupType } from "../../interfaces/group";
import "@vkontakte/vkui/dist/vkui.css";
import "./style.css";

export function GroupItem({
  avatar_color,
  name,
  closed,
  members_count,
  friends,
}: Partial<GroupType>) {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);

  const handleClick = () => {
    setIsFriendsOpen((prev) => !prev);
  };

  const friendsElements = friends?.map((item, index) => (
    <SimpleCell key={index} before={<Avatar size={10} src={""} />}>
      {`${item.first_name} ${item.last_name}`}
    </SimpleCell>
  ));

  return (
    <Group
      header={
        <div className="header-container">
          {avatar_color && (
            <Avatar
              size={100}
              className="group-avatar"
              style={{ backgroundColor: avatar_color }}
            />
          )}
          <Header mode="primary">{name}</Header>
        </div>
      }
    >
      <SimpleCell before={`${closed ? "closed" : "open"} group`} />
      <SimpleCell>{members_count} followers</SimpleCell>
      {friends && (
        <SimpleCell onClick={handleClick}>{friends.length} friends</SimpleCell>
      )}
      {isFriendsOpen && friendsElements}
    </Group>
  );
}
