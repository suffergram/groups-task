import { AppRoot, Panel } from "@vkontakte/vkui";
import { useEffect, useMemo, useState } from "react";
import { Group } from "../../interfaces/group";
import { List } from "../list/list";
import { GroupService } from "../../services/group-service";
import { Controls } from "../controls/controls";
import { Filter } from "../../types/filter";
import { filterGroups, getColors, getUsers } from "../../utils/utils";
import "@vkontakte/vkui/dist/vkui.css";
import "./style.css";

export function App() {
  const [groups, setGroups] = useState<Group[] | undefined>();
  const [data, setData] = useState<Group[] | undefined>();
  const [filter, setFilter] = useState<Filter>({
    closed: undefined,
    color: undefined,
    user: undefined,
  });

  const users = useMemo(() => groups && getUsers(groups), [groups]);
  const colors = useMemo(() => groups && getColors(groups), [groups]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GroupService.getGroups();
        setGroups(data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    groups && setData(() => filterGroups(groups, filter));
  }, [groups, filter]);

  return (
    <>
      <AppRoot>
        <Panel>
          <Controls users={users} colors={colors} onChange={setFilter} />
          <List groups={data} />
        </Panel>
      </AppRoot>
    </>
  );
}
